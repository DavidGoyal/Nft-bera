"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useAccount } from "wagmi";
import AnimationsMenu from "./AnimationMenu";
import MiddleComponent from "./MiddleComponent";
import { getNFTs } from "@/utils/get-nfts";

const defaultNftIDS = [81, 82, 83, 84, 85];
const REFRESH_INTERVAL = 120000; // 2 minutes

function MainSide() {
  const { isConnecting, address, isConnected, isDisconnected } = useAccount();
  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState<number[]>([]);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastFetchTimeRef = useRef<number>(0);
  const lastAddressRef = useRef<string | undefined>(undefined);
  const hasPreloadedRef = useRef(false);

  // Load from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("nft-data");
    if (storedData) {
      try {
        const {
          nfts: storedNfts,
          address: storedAddress,
          timestamp,
        } = JSON.parse(storedData);
        if (
          storedAddress === address &&
          Date.now() - timestamp < 5 * 60 * 1000
        ) {
          setNfts(storedNfts);
          lastFetchTimeRef.current = timestamp;
          hasPreloadedRef.current = true;
          console.log("Loaded NFTs from localStorage:", storedNfts);
          preloadModels(storedNfts); // Loading handled in preloadModels
        } else {
          setLoading(true); // Keep loading true if data is stale
        }
      } catch (e) {
        console.error("Error parsing stored NFT data:", e);
        // Don't set loading false here, keep it true until successful preload
      }
    } else {
      setLoading(true); // No data, keep loading true
    }
  }, [address]);

  // Save to localStorage
  useEffect(() => {
    if (nfts.length > 0 && nfts !== defaultNftIDS && address) {
      localStorage.setItem(
        "nft-data",
        JSON.stringify({
          nfts,
          address,
          timestamp: Date.now(),
        })
      );
    }
  }, [nfts, address]);

  async function preloadModels(nftIds: number[]) {
    if (hasPreloadedRef.current) {
      console.log("Skipping preload, models already loaded for this session");
      setLoading(false);
      return;
    }

    console.log("Preloading models for NFTs:", nftIds);
    const isIOS = /iPad|iPhone/.test(navigator.userAgent);
    setLoading(true);

    try {
      let successfulCaches = 0;
      const totalModels = nftIds.length;

      await Promise.all(
        nftIds.map(async (nftId) => {
          const modelUrl = `https://kingdomly-creator-bucket.s3.us-east-2.amazonaws.com/cubhub-glbs/glb-updated/glb/${nftId}.glb`;

          try {
            if (!isIOS) {
              const cache = await caches.open("model-cache");
              const response = await fetch(modelUrl, {
                method: "GET",
                cache: "reload",
                headers: { Accept: "model/gltf-binary" },
              });

              if (response.ok) {
                await cache.put(modelUrl, response.clone());
                console.log(`Model ${nftId} cached successfully`);
                successfulCaches++;
              } else {
                throw new Error(`Failed to fetch model ${nftId}`);
              }
            } else {
              const response = await fetch(modelUrl, {
                method: "HEAD",
                cache: "no-store",
              });

              if (response.ok) {
                console.log(`Model ${nftId} verified on iOS`);
                successfulCaches++;
              } else {
                throw new Error(`Failed to verify model ${nftId} on iOS`);
              }
            }
          } catch (error) {
            console.error(`Error caching model ${nftId}:`, error);
            throw error;
          }
        })
      );

      if (successfulCaches === totalModels) {
        hasPreloadedRef.current = true;
        console.log("All models cached successfully");
        setLoading(false); // Only set false when ALL models are cached
      } else {
        console.error(
          `Failed to cache all models: ${successfulCaches}/${totalModels} succeeded`
        );
        // Loading stays true
      }
    } catch (error) {
      console.error("Error in preloadModels:", error);
      hasPreloadedRef.current = false;
      // Loading stays true if there's an error
    }
  }

  const fetchNFTs = useCallback(async () => {
    if (!address) return;

    const now = Date.now();
    if (
      now - lastFetchTimeRef.current < 10000 &&
      lastAddressRef.current === address
    ) {
      console.log("Skipping fetch, too recent");
      return;
    }

    console.log("Fetching NFTs for address:", address);
    setLoading(true);

    try {
      const data = await getNFTs({ walletAddress: address });
      console.log("Fetched NFTs:", data);

      if (data.length > 0 && JSON.stringify(data) !== JSON.stringify(nfts)) {
        setNfts(data);
        await preloadModels(data); // Loading will only be false if all models cache
      } else {
        // If no change in NFTs and we already have them, check if preloaded
        if (hasPreloadedRef.current) {
          setLoading(false);
        }
        // Otherwise, stay loading true until preload completes
      }

      lastFetchTimeRef.current = now;
      lastAddressRef.current = address;
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      // Don't set loading false here, keep it true until successful preload
    }
  }, [address, nfts]);

  useEffect(() => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }

    if (isConnected && address) {
      fetchNFTs();
      refreshIntervalRef.current = setInterval(() => {
        console.log("Refreshing NFT data...");
        fetchNFTs();
      }, REFRESH_INTERVAL);
    } else if (!isConnecting && !isConnected && !address && isDisconnected) {
      if (JSON.stringify(nfts) !== JSON.stringify(defaultNftIDS)) {
        setNfts(defaultNftIDS);
        preloadModels(defaultNftIDS); // Loading only false if all models cache
      } else if (hasPreloadedRef.current) {
        setLoading(false); // Only if already preloaded
      }
      // Otherwise, stay loading true until default models are cached
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    };
  }, [isConnecting, address, isConnected, isDisconnected, fetchNFTs, nfts]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isConnected && address) {
        console.log("Tab visible, checking NFT data");
        fetchNFTs();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isConnected, address, fetchNFTs]);

  return (
    <>
      <div className="hidden lg:flex lg:col-span-2 h-full flex-col items-start justify-end p-8 gap-14">
        {nfts.length > 0 && <AnimationsMenu />}
      </div>
      <MiddleComponent nfts={nfts} loading={loading} />
    </>
  );
}

export default MainSide;

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
  const hasPreloadedRef = useRef(false); // Track if models were preloaded

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
          hasPreloadedRef.current = true; // Assume preloaded if recent
          console.log("Loaded NFTs from localStorage:", storedNfts);
          // Preload models if not already preloaded
          preloadModels(storedNfts).catch(() => setLoading(false)); // Fallback to false if preload fails
        }
      } catch (e) {
        console.error("Error parsing stored NFT data:", e);
        setLoading(false); // Fallback in case of parsing error
      }
    } else {
      setLoading(true); // Ensure loading starts as true if no data
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
      setLoading(false); // Set loading false since no work is needed
      return;
    }

    console.log("Preloading models for NFTs:", nftIds);
    const isIOS = /iPad|iPhone/.test(navigator.userAgent);

    try {
      await Promise.all(
        nftIds.map(async (nftId) => {
          const modelUrl = `https://kingdomly-creator-bucket.s3.us-east-2.amazonaws.com/cubhub-glbs/glb-updated/glb/${nftId}.glb`;
          const cache = await caches.open("model-cache");
          if (!isIOS) {
            const response = await fetch(modelUrl, {
              method: "GET",
              cache: "reload",
              headers: { Accept: "model/gltf-binary" },
            });
            if (response.ok) {
              await cache.put(modelUrl, response.clone());
              console.log(`Model ${nftId} cached`);
            } else {
              throw new Error(`Failed to fetch model ${nftId}`);
            }
          } else {
            const response = await fetch(modelUrl, { method: "HEAD" }); // Minimal preload for iOS
            if (response.ok) {
              console.log(`Model ${nftId} cached`);
            } else {
              throw new Error(`Failed to fetch model ${nftId}`);
            }
          }
        })
      );
      hasPreloadedRef.current = true; // Mark as preloaded
      console.log("All models cached successfully");
      setLoading(false); // Only set to false after all models are cached
    } catch (error) {
      console.error("Error in preloadModels:", error);
      setLoading(false); // Optionally keep true if you want to retry, or false to proceed
    }
  }

  // Fetch NFTs with debounce logic
  const fetchNFTs = useCallback(async () => {
    if (!address) return;

    const now = Date.now();
    if (
      now - lastFetchTimeRef.current < 10000 && // 10s debounce
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
        await preloadModels(data); // Loading will be set to false inside preloadModels
      } else {
        setLoading(false); // No change in NFTs, so no preload needed
      }

      lastFetchTimeRef.current = now;
      lastAddressRef.current = address;
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      setLoading(false); // Fallback in case of fetch error
    }
  }, [address, nfts]);

  // Setup and refresh logic
  useEffect(() => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }

    if (isConnected && address) {
      fetchNFTs(); // Initial fetch
      refreshIntervalRef.current = setInterval(() => {
        console.log("Refreshing NFT data...");
        fetchNFTs();
      }, REFRESH_INTERVAL);
    } else if (!isConnecting && !isConnected && !address && isDisconnected) {
      if (JSON.stringify(nfts) !== JSON.stringify(defaultNftIDS)) {
        setNfts(defaultNftIDS);
        preloadModels(defaultNftIDS); // Loading will be set to false inside preloadModels
      } else {
        setLoading(false); // No preload needed if already default
      }
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    };
  }, [isConnecting, address, isConnected, isDisconnected, fetchNFTs, nfts]);

  // Visibility change handler
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

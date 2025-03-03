"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useAccount } from "wagmi";
import AnimationsMenu from "./AnimationMenu";
import MiddleComponent from "./MiddleComponent";
import { getNFTs } from "@/utils/get-nfts";
const defaultNftIDS = [91, 92, 93, 94, 95];

// Time in milliseconds to refresh NFT data
const REFRESH_INTERVAL = 60000; // 1 minute

function MainSide() {
  const { isConnecting, address, isConnected, isDisconnected } = useAccount();
  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState<number[]>([]);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastFetchTimeRef = useRef<number>(0);
  const lastAddressRef = useRef<string | undefined>(undefined);

  // Store NFTs in localStorage for persistence
  useEffect(() => {
    // Try to load NFTs from localStorage on initial mount
    const storedData = localStorage.getItem("nft-data");
    if (storedData) {
      try {
        const {
          nfts: storedNfts,
          address: storedAddress,
          timestamp,
        } = JSON.parse(storedData);
        // Only use stored data if it's for the current address and less than 5 minutes old
        if (
          storedAddress === address &&
          Date.now() - timestamp < 5 * 60 * 1000
        ) {
          setNfts(storedNfts);
          lastFetchTimeRef.current = timestamp;
          console.log("Loaded NFTs from localStorage:", storedNfts);
        }
      } catch (e) {
        console.error("Error parsing stored NFT data:", e);
      }
    }
  }, [address]);

  // Save NFTs to localStorage whenever they change
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
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    console.log("Device is iOS:", isIOS);
    console.log("User Agent:", navigator.userAgent);

    try {
      // For iOS, we'll use a simpler preloading approach
      await Promise.all(
        nftIds.map(async (nftId) => {
          const modelUrl = `https://kingdomly-creator-bucket.s3.us-east-2.amazonaws.com/cubhub-glbs/glb-updated/glb/${nftId}.glb`;

          try {
            // Simple preload with fetch - no caching for iOS
            if (!isIOS) {
              try {
                const cache = await caches.open("model-cache");
                const response = await fetch(modelUrl, {
                  method: "GET",
                  cache: "reload",
                  headers: {
                    Accept: "model/gltf-binary",
                  },
                });

                if (response.ok) {
                  await cache.put(modelUrl, response.clone());
                  console.log(`Model ${nftId} cached successfully`);
                } else {
                  console.warn(`Failed to cache model ${nftId}`);
                }
              } catch (cacheError) {
                console.warn(`Cache API error for model ${nftId}:`, cacheError);
                // Fallback to regular fetch if Cache API fails
                await fetch(modelUrl, { method: "HEAD" });
              }
            }
          } catch (error) {
            console.warn(`Error preloading model ${nftId}:`, error);
          }
        })
      );
    } catch (error) {
      console.error("Error in preloadModels:", error);
    }
  }

  // Function to fetch NFTs
  const fetchNFTs = useCallback(async () => {
    if (!address) return;

    // Don't fetch if we've fetched recently (within 10 seconds)
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

      if (data.length > 0) {
        setNfts(data);
        await preloadModels(data);
      } else {
        console.warn("No NFTs found for address:", address);
      }

      lastFetchTimeRef.current = now;
      lastAddressRef.current = address;
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    } finally {
      setLoading(false);
    }
  }, [address]);

  // Set up periodic refresh
  useEffect(() => {
    // Clear any existing interval
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }

    // If connected, set up refresh interval
    if (isConnected && address) {
      fetchNFTs(); // Fetch immediately

      // Set up interval for periodic refresh
      refreshIntervalRef.current = setInterval(() => {
        console.log("Refreshing NFT data...");
        fetchNFTs();
      }, REFRESH_INTERVAL);
    } else if (!isConnecting && !isConnected && !address && isDisconnected) {
      // Use default NFTs when disconnected
      setNfts(defaultNftIDS);
      preloadModels(defaultNftIDS).finally(() => {
        setLoading(false);
      });
    }

    // Cleanup interval on unmount
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    };
  }, [isConnecting, address, isConnected, isDisconnected, fetchNFTs]);

  // Add event listener for visibility change to refresh when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isConnected && address) {
        console.log("Tab became visible, refreshing NFT data");
        fetchNFTs();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
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

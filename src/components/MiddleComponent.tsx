"use client";

import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import { useAccount } from "wagmi";
import { getNFTs } from "@/utils/get-nfts";

const defaultNftIDS = [81, 82, 83, 84, 85];

function MiddleComponent() {
  const { isConnecting, address, isConnected, isDisconnected } = useAccount();
  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState<number[]>(defaultNftIDS);

  async function preloadAndCacheModels(nftIds: number[]) {
    await Promise.all(
      nftIds.map(async (nftId) => {
        const modelUrl = `https://kingdomly-creator-bucket.s3.us-east-2.amazonaws.com/cubhub-glbs/glb-updated/glb/${nftId}.glb`;

        // First check if it's in cache
        const cache = await caches.open("model-cache");
        const cachedResponse = await cache.match(modelUrl);

        if (!cachedResponse) {
          try {
            const response = await fetch(modelUrl, {
              method: "GET",
              cache: "force-cache", // This tells the browser to prefer cached version
            });

            if (response.ok) {
              await cache.put(modelUrl, response.clone());
              console.log(`Model ${nftId} cached successfully`);
            } else {
              console.warn(`Failed to cache model ${nftId}`);
            }
          } catch (error) {
            console.warn(`Error caching model ${nftId}:`, error);
          }
        } else {
          console.log(`Model ${nftId} already in cache`);
        }
      })
    );
  }

  useEffect(() => {
    setLoading(true);
    if (!isConnecting && address) {
      getNFTs({ walletAddress: address })
        .then(async (data) => {
          setNfts(data);
          await preloadAndCacheModels(data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (!isConnecting && !isConnected && !address && isDisconnected) {
      preloadAndCacheModels(defaultNftIDS).finally(() => {
        setLoading(false);
        setNfts(defaultNftIDS);
      });
    }
  }, [isConnecting, address, isConnected, isDisconnected]);

  return (
    <div className="col-span-12 lg:col-span-8 h-full flex flex-col p-8 overflow-y-auto">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <Slider nfts={nfts} />
      )}
    </div>
  );
}

export default MiddleComponent;

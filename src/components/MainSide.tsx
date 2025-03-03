"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import AnimationsMenu from "./AnimationMenu";
import MiddleComponent from "./MiddleComponent";
import { getNFTs } from "@/utils/get-nfts";
const defaultNftIDS = [81, 82, 83, 84, 85];

function MainSide() {
  const { isConnecting, address, isConnected, isDisconnected } = useAccount();
  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState<number[]>([]);

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
            if (isIOS) {
              const response = await fetch(modelUrl, {
                method: "HEAD",
                cache: "no-store",
              });

              if (response.ok) {
                console.log(`Model ${nftId} preloaded successfully`);
              } else {
                console.warn(`Failed to preload model ${nftId}`);
              }
            }
            // Use Cache API for non-iOS platforms
            else {
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

  useEffect(() => {
    setLoading(true);
    if (!isConnecting && address) {
      getNFTs({ walletAddress: address })
        .then(async (data) => {
          setNfts(data);
          await preloadModels(data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (!isConnecting && !isConnected && !address && isDisconnected) {
      preloadModels(defaultNftIDS).finally(() => {
        setLoading(false);
        setNfts(defaultNftIDS);
      });
    }
  }, [isConnecting, address, isConnected, isDisconnected]);

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

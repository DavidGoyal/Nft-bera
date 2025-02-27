"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import AnimationsMenu from "./AnimationMenu";
import MiddleComponent from "./MiddleComponent";
import { getNFTs } from "@/utils/get-nfts";
const defaultNftIDS = [85, 86, 87, 88, 89];

function MainSide() {
  const { isConnecting, address, isConnected, isDisconnected } = useAccount();
  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState<number[]>([]);

  async function preloadAndCacheModels(nftIds: number[]) {
    // Add new models to cache
    await Promise.all(
      nftIds.map(async (nftId) => {
        const modelUrl = `https://kingdomly-creator-bucket.s3.us-east-2.amazonaws.com/cubhub-glbs/glb-updated/glb/${nftId}.glb`;

        try {
          // Force a new fetch every time
          const response = await fetch(modelUrl, {
            method: "GET",
            cache: "reload", // Forces a new request
          });

          if (response.ok) {
            const cache = await caches.open("model-cache");
            await cache.put(modelUrl, response.clone());
            console.log(`Model ${nftId} cached successfully`);
          } else {
            console.warn(`Failed to cache model ${nftId}`);
          }
        } catch (error) {
          console.warn(`Error caching model ${nftId}:`, error);
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
    <>
      <div className="hidden lg:flex lg:col-span-2 h-full flex-col items-start justify-end p-8 gap-14">
        {nfts.length > 0 && <AnimationsMenu />}
      </div>

      <MiddleComponent nfts={nfts} loading={loading} />
    </>
  );
}

export default MainSide;

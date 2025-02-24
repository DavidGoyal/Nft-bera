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

  useEffect(() => {
    setLoading(true);
    if (!isConnecting && address) {
      getNFTs({ walletAddress: address })
        .then(async (data) => {
          if (data.length > 0) {
            setNfts(data);
            // Pre-fetch 3D models
            await Promise.all(
              data.map(async (nftId) => {
                const modelUrl = `https://kingdomly-creator-bucket.s3.us-east-2.amazonaws.com/cubhub-glbs/glb-updated/glb/${nftId}.glb`;
                const response = await fetch(modelUrl);
                if (response.ok) {
                  console.log(`Model ${nftId} prefetched successfully`);
                } else {
                  console.warn(`Failed to prefetch model ${nftId}`);
                }
              })
            );
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (!isConnecting && !isConnected && !address && isDisconnected) {
      nfts.map(async (nftId) => {
        const modelUrl = `https://kingdomly-creator-bucket.s3.us-east-2.amazonaws.com/cubhub-glbs/glb-updated/glb/${nftId}.glb`;
        const response = await fetch(modelUrl);
        if (response.ok) {
          console.log(`Model ${nftId} prefetched successfully`);
        } else {
          console.warn(`Failed to prefetch model ${nftId}`);
        }
      });
      setLoading(false);
      setNfts(defaultNftIDS);
    }
  }, [isConnecting, address, isConnected, isDisconnected]);

  return (
    <div className="col-span-12 lg:col-span-8 h-full flex flex-col p-8">
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

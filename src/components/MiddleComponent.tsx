"use client";

import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import { useAccount } from "wagmi";
import { getNFTs } from "@/utils/get-nfts";
const defaultNftIDS = [81, 82, 83, 84, 85];

function MiddleComponent() {
  const { isConnecting, address } = useAccount();
  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState<number[]>(defaultNftIDS);

  useEffect(() => {
    if (!isConnecting && address) {
      getNFTs({ walletAddress: address })
        .then((data) => {
          if (data.length > 0) {
            setNfts(data);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isConnecting, address]);

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

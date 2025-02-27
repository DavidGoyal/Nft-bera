"use client";

import Slider from "./Slider";

function MiddleComponent({
  nfts,
  loading,
}: {
  nfts: number[];
  loading: boolean;
}) {
  return (
    <div className="col-span-12 lg:col-span-8 h-full flex flex-col p-8 overflow-y-auto">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : nfts.length > 0 ? (
        <Slider nfts={nfts} />
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-2xl text-cyan-400 font-bold">No NFTs found</p>
        </div>
      )}
    </div>
  );
}

export default MiddleComponent;

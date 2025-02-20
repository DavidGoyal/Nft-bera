"use client";

import { useToast } from "@/hooks/use-toast";
import React from "react";

export default function BringToVr({ w }: { w?: string }) {
  //   const onClick = () => {
  //     const currentIndex = localStorage.getItem("currentIndex") || 105;

  //     router.push(`/nft/${currentIndex}`);
  //   };
  const { toast } = useToast();

  return (
    <button
      className={`bg-black border-2 hidden border-cyan-400 rounded-md lg:rounded-xl md:flex items-center justify-center text-cyan-400 font-bold text-md px-6 py-2`}
      id="bring-to-ar"
      style={{
        width: w ?? "70%",
      }}
      onClick={() => {
        toast({
          title: "AR not supported on desktop or this device",
        });
      }}
    >
      BRING TO AR
    </button>
  );
}

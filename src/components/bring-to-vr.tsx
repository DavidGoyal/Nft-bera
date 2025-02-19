"use client";

import React from "react";

export default function BringToVr({ w, p }: { w?: string; p?: string }) {
  //   const onClick = () => {
  //     const currentIndex = localStorage.getItem("currentIndex") || 105;

  //     router.push(`/nft/${currentIndex}`);
  //   };
  return (
    <button
      className={`bg-black border-2 hidden border-cyan-400 rounded-md xl:rounded-xl md:flex items-center justify-center text-cyan-400 font-bold text-md`}
      id="bring-to-ar"
      style={{
        width: w ?? "70%",
        paddingLeft: p ?? "0.5rem",
        paddingRight: p ?? "0.5rem",
        paddingTop: p ? "0.5rem" : "0.5rem",
        paddingBottom: p ? "0.5rem" : "0.5rem",
      }}
      onClick={() => {
        alert("Ar not supported on desktop");
      }}
    >
      BRING TO AR
    </button>
  );
}

"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import RightMid from "./RightMid";
import { Skeleton } from "./ui/skeleton";

function RightSide() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="hidden lg:flex lg:col-span-2 h-full flex-col items-end justify-start gap-[25%] p-8">
      {!mounted ? (
        <Skeleton className="w-[120px] h-[60px] rounded-full bg-gray-200" />
      ) : (
        <ConnectButton />
      )}
      <ProfileMenu />
      <RightMid />
    </div>
  );
}

export default RightSide;

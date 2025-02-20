"use client";
import Image from "next/image";
import React, { useState } from "react";

const RightMid = () => {
  // Define the state to track the active icon
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  const handleClick = (iconName: string) => {
    setActiveIcon(iconName);
  };

  return (
    <div className="flex flex-col items-center gap-6 h-12 w-12 bg-transparent justify-center">
      {/* House Icon */}
      <Image
        src="/sideRight/Home.svg"
        alt="House"
        onClick={() => handleClick("house")}
        className={`cursor-pointer translate-y-3 ${
          activeIcon === "house" ? "fill-blue" : " fill-white"
        }`}
        width={40}
        height={40}
      />

      {/* User Icon */}
      <Image
        src="/sideRight/PROFILE BLUE 1.png"
        alt="User"
        onClick={() => handleClick("user")}
        className={`cursor-pointer ${
          activeIcon === "user" ? "fill-blue" : "fill-white"
        }`}
        width={28}
        height={28}
      />

      {/* Game Controller Icon */}
      <Image
        src="/sideRight/GAMES_WHITE 1.png"
        alt="Game Controller"
        onClick={() => handleClick("controller")}
        className={`cursor-pointer ${
          activeIcon === "controller" ? "fill-blue" : "fill-white"
        }`}
        width={28}
        height={28}
      />

      {/* Dollar Icon
			<Image
				src="/sideRight/STORE WHITE 1.png"
				alt="Dollar"
				onClick={() => handleClick("dollar")}
				className={`cursor-pointer ${
					activeIcon === "dollar" ? "filter-blue" : "filter-white"
				}`}
				width={28}
				height={28}
			/> */}
    </div>
  );
};

export default RightMid;

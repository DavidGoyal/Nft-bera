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
    <div className="flex flex-col items-center space-y-6 h-12 w-12 bg-transparent justify-center">
      {/* Paw Print Icon */}
      <Image
        src="/sideRight/CUBAR BLUE 2.png"
        alt="Paw"
        onClick={() => handleClick("paw")}
        className={`cursor-pointer ${
          activeIcon === "paw" ? "filter-blue" : "filter-white"
        }`}
        width={28}
        height={28}
      />

      {/* House Icon */}
      <Image
        src="/sideRight/HOME WHITE 1.png"
        alt="House"
        onClick={() => handleClick("house")}
        className={`cursor-pointer ${
          activeIcon === "house" ? "filter-blue" : "filter-white"
        }`}
        width={28}
        height={28}
      />

      {/* User Icon */}
      <Image
        src="/sideRight/PROFILE BLUE 1.png"
        alt="User"
        onClick={() => handleClick("user")}
        className={`cursor-pointer ${
          activeIcon === "user" ? "filter-blue" : "filter-white"
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
          activeIcon === "controller" ? "filter-blue" : "filter-white"
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

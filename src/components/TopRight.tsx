"use client"; // Add this line at the very top of your file

import Image from "next/image";
import React, { useState } from "react";

const VerticalCapsule = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center w-40 h-96 bg-black rounded-full border border-cyan-500 p-4 space-y-4">
      {/* Image and Icon Section */}
      <div className="relative w-full flex flex-col items-center">
        <div
          className="relative rounded-full border-2 border-white cursor-pointer"
          onClick={toggleMenu}
        >
          <Image
            src="/glbimage1.png"
            alt="Profile"
            className="w-24 h-24 object-cover rounded-full"
            width={96}
            height={96}
          />
        </div>

        {/* Menu Items (Reverse Icon and Settings Icon) */}
        {isMenuOpen && (
          <div className="absolute top-28 flex flex-col items-center bg-black border-2 border-cyan-500 rounded-lg p-2">
            <button className="mb-2 text-cyan-500">
              <i className="fas fa-sync-alt text-white"></i>{" "}
              {/* Reverse Icon */}
            </button>
            <button className="text-cyan-500">
              <i className="fas fa-cog text-white"></i> {/* Settings Icon */}
            </button>
          </div>
        )}
      </div>

      {/* Additional Content (Text or Button) */}
      <div className="text-cyan-500 font-bold text-lg">Bear Menu</div>
    </div>
  );
};

export default VerticalCapsule;

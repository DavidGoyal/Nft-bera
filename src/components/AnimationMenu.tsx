"use client";
import React, { useEffect, useState } from "react";
import SideRectangle from "./sideRect";

const AnimationsMenu = () => {
  // const [selected, setSelected] = useState<string | null>(null);

  // const handleClick = (text: string) => {
  //   setSelected(text);
  // };

  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        setClicked(false);
      }, 3000);
    }
  }, [clicked]);

  return !clicked ? (
    <button
      className="bg-black rounded-md lg:rounded-xl flex items-center border-2 border-cyan-400 justify-center text-cyan-400 font-bold text-md px-6 py-2"
      onClick={() => setClicked(true)}
    >
      Animations
    </button>
  ) : (
    <SideRectangle text="COMING SOON" />
  );
  // <div className="flex flex-col items-center w-36 bg-black rounded-2xl border border-cyan-500">
  {
    /* Animation Options */
  }
  {
    /* {["IDLE", "WALK", "RUN", "FLIP", "DANCE", "ANIMATIONS"].map(
				(text, index) => (
					<button
						key={index}
						className={`text-cyan-500 text-sm font-bold hover:${
							selected === text ? "" : "scale-100"
						} transition-transform p-2 w-full text-center ${
							selected === text ? "border-2 border-cyan-500 rounded-2xl" : ""
						}`}
						onClick={() => handleClick(text)}
					>
						{text}
					</button>
				)
			)} */
  }
  // </div>
  //   );
};

export default AnimationsMenu;

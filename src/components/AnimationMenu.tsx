"use client";
import React, { useState } from "react";

const AnimationsMenu = () => {
	const [selected, setSelected] = useState<string | null>(null);

	const handleClick = (text: string) => {
		setSelected(text);
	};

	return (
		<div className="flex flex-col items-center w-36 bg-black rounded-2xl border border-cyan-500">
			{/* Animation Options */}
			{["IDLE", "WALK", "RUN", "FLIP", "DANCE", "ANIMATIONS"].map(
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
			)}
		</div>
	);
};

export default AnimationsMenu;

import Image from "next/image";
import React from "react";

const PawCounter = () => {
	return (
		<div className="relative flex flex-col items-center justify-between gap-4 p-4 py-8 w-16 rounded-full border-2 border-cyan-400 bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
			<div className="flex flex-col items-center justify-center w-full rounded-full gap-2">
				<Image
					src="/CHUB_LOGO_BLUE 1.png"
					alt="Bear Icon"
					className="w-7 h-7"
					width={28}
					height={28}
				/>
				<p className="text-white text-xs font-bold">11546</p>
			</div>

			<div className="flex flex-col items-center gap-2">
				<div className="w-9 h-9 border-2 border-yellow-400 rounded-full"></div>
				<p className="text-white text-xs font-bold">420</p>
			</div>
		</div>
	);
};

export default PawCounter;

"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function BringToVr() {
	const router = useRouter();

	const onClick = () => {
		const currentIndex = localStorage.getItem("currentIndex") || 105;

		router.push(`/nft/${currentIndex}`);
	};
	return (
		<button
			className="w-36 h-10 flex justify-center items-center bg-black border border-cyan-400 rounded-lg cursor-pointer text-cyan-400 text-sm font-bold"
			onClick={onClick}
		>
			BRING TO AR
		</button>
	);
}

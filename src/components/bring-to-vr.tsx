"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function BringToVr({ w, p }: { w?: string; p?: string }) {
	const router = useRouter();

	const onClick = () => {
		const currentIndex = localStorage.getItem("currentIndex") || 105;

		router.push(`/nft/${currentIndex}`);
	};
	return (
		<button
			className={`bg-black border-2 border-cyan-400 rounded-md xl:rounded-xl flex items-center justify-center text-cyan-400 font-bold text-md`}
			style={{
				width: w ?? "70%",
				paddingLeft: p ?? "0.5rem",
				paddingRight: p ?? "0.5rem",
				paddingTop: p ? "0.5rem" : "0.5rem",
				paddingBottom: p ? "0.5rem" : "0.5rem",
			}}
			onClick={onClick}
		>
			BRING TO AR
		</button>
	);
}

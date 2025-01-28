import React from "react";

const SideRectangle = ({
	text,
	w,
	p,
}: {
	text: string;
	w?: string;
	p?: string;
}) => {
	return (
		<div
			className={`bg-black border-2 border-cyan-400 rounded-md lg:rounded-xl flex items-center justify-center`}
			style={{
				width: w ?? "70%",
				paddingLeft: p ?? "0.5rem",
				paddingRight: p ?? "0.5rem",
				paddingTop: p ? "0.5rem" : "0.5rem",
				paddingBottom: p ? "0.5rem" : "0.5rem",
			}}
		>
			<p className="text-cyan-400 font-bold text-md">{text}</p>
		</div>
	);
};

export default SideRectangle;

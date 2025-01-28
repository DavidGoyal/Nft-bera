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
				paddingLeft: p ?? "2",
				paddingRight: p ?? "2",
				paddingTop: p ? "0.5rem" : "2",
				paddingBottom: p ? "0.5rem" : "2",
			}}
		>
			<p className="text-cyan-400 font-bold text-md">{text}</p>
		</div>
	);
};

export default SideRectangle;

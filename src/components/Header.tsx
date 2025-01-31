"use client";

import Image from "next/image";
import { useState } from "react";
import BringToVr from "./bring-to-vr";
import SideRectangle from "./sideRect";

const Header = () => {
	const [clicked, setClicked] = useState(false);

	return (
		<>
			<div className="w-full flex justify-between items-center absolute top-0 left-0 p-8">
				<h1 className="hidden xl:block text-4xl text-white">
					CHARACTERS <span className="text-[#00b2ff]">/ HOME</span>
				</h1>

				<div className="flex xl:hidden gap-4 items-center">
					<div className="h-12 rounded-full overflow-hidden border-2 border-cyan-500">
						<Image
							src="https://s3-alpha-sig.figma.com/img/fe73/a06b/ffdb9cfcff4406c2a19564f8239b3f12?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WF9RsEJZKghyyDe5R-YXokgrm7i1UbE~lOj-MIjW7PCn0fe64ebyKU1PkBC11vgMXbIAYrnlrQWwIrH~9SIy16LRzfKPkmi5l-Jsyot1e0y5NPkeg-42BpfEQ~TxDaHfWNyjZTd8sgEkrDicTUa6nXQK0ZvoRYrDahcFfBssS29UXkfllR8w25sC-1LD2GILAMTWQK2slm8jbDqTggAWPzExGVf4-oXQNUh7KYjK1fdbVCWAhkOQvlUICcokLOudNT~9OGMavHb3hGb9V0F6kbeDmuIkzFSXXYHusgT6v8agYUw3p2TxJ7HL2OD-Whaia3otiZjECicAQH9mHTw0Xw__" // Replace with actual image path
							alt="Profile"
							className="w-full h-full object-cover"
							width={28}
							height={28}
						/>
					</div>

					<div className="relative flex items-center justify-between gap-4 h-12 p-2 rounded-md border-2 border-cyan-400 bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
						<div className="flex items-center justify-center rounded-full gap-2">
							<Image
								src="/CHUB_LOGO_BLUE 1.png"
								alt="Bear Icon"
								className="w-7 h-7"
								width={28}
								height={28}
							/>
							<p className="text-white text-xs font-bold">11546</p>
						</div>

						<div className="flex items-center gap-2">
							<div className="w-7 h-7 border-2 border-yellow-400 rounded-full"></div>
							<p className="text-white text-xs font-bold">420</p>
						</div>
					</div>
				</div>

				<button
					className="block xl:hidden z-20"
					onClick={() => setClicked(!clicked)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="lucide lucide-menu !fill-[#00B2FF] !text-[#00B2FF]"
					>
						<line x1="4" x2="20" y1="12" y2="12" />
						<line x1="4" x2="20" y1="6" y2="6" />
						<line x1="4" x2="20" y1="18" y2="18" />
					</svg>
				</button>
			</div>

			{clicked && (
				<div className="flex xl:hidden fixed top-20 inset-0 bg-black bg-opacity-60 flex-col gap-4 justify-center items-center z-40">
					<SideRectangle text="LOG IN" w={"30%"} />
					<BringToVr w={"30%"} />
				</div>
			)}
		</>
	);
};

export default Header;

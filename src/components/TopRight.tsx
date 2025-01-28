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
						src="/https://s3-alpha-sig.figma.com/img/fe73/a06b/ffdb9cfcff4406c2a19564f8239b3f12?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WF9RsEJZKghyyDe5R-YXokgrm7i1UbE~lOj-MIjW7PCn0fe64ebyKU1PkBC11vgMXbIAYrnlrQWwIrH~9SIy16LRzfKPkmi5l-Jsyot1e0y5NPkeg-42BpfEQ~TxDaHfWNyjZTd8sgEkrDicTUa6nXQK0ZvoRYrDahcFfBssS29UXkfllR8w25sC-1LD2GILAMTWQK2slm8jbDqTggAWPzExGVf4-oXQNUh7KYjK1fdbVCWAhkOQvlUICcokLOudNT~9OGMavHb3hGb9V0F6kbeDmuIkzFSXXYHusgT6v8agYUw3p2TxJ7HL2OD-Whaia3otiZjECicAQH9mHTw0Xw__"
						alt="Bear Icon"
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

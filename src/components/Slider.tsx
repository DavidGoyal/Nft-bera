"use client";

import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import SideRectangle from "./sideRect";
import dynamic from "next/dynamic";

const NFT = dynamic(() => import("./3D/nft"), { ssr: false });

const Slider = () => {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [customize, setCustomize] = useState<boolean>(false);

	const handlePrev = () => {
		const index = (currentIndex - 1 + 5) % 5;
		setCurrentIndex((currentIndex - 1 + 5) % 5);
		localStorage.setItem("currentIndex", (index + 105).toString());
	};

	const handleNext = () => {
		const index = (currentIndex + 1) % 5;
		setCurrentIndex((currentIndex + 1) % 5);
		localStorage.setItem("currentIndex", (index + 105).toString());
	};

	const updateMainImage = (index: number) => {
		setCurrentIndex(index);
		localStorage.setItem("currentIndex", (index + 105).toString());
	};

	useEffect(() => {
		if (currentIndex === 0) {
			localStorage.setItem("currentIndex", "105");
		}
	}, [currentIndex]);

	return (
		<div className="relative flex flex-col items-center h-full w-full xl:justify-center">
			<div className="hidden xl:h-[8%]"></div>
			<div className="grid grid-cols-12 h-full xl:h-[70%] w-full pt-14 xl:pt-0">
				<div className="hidden xl:flex xl:col-span-3 h-full flex-col justify-end gap-4 items-end">
					{!customize ? (
						<button
							className={`bg-black border-2 border-cyan-400 rounded-md xl:rounded-xl flex items-center justify-center text-cyan-400 font-bold text-md`}
							style={{
								width: "70%",
								paddingLeft: "1.5rem",
								paddingRight: "1.5rem",
								paddingTop: "0.5rem",
								paddingBottom: "0.5rem",
							}}
							onClick={() => setCustomize(true)}
						>
							Customize
						</button>
					) : (
						<>
							<SideRectangle text="HEAD" />
							<SideRectangle text="FACE" />
							<SideRectangle text="BODY" />
						</>
					)}
				</div>

				<div className="col-span-12 xl:col-span-6 h-full relative flex flex-col items-center justify-between xl:justify-end gap-12 xl:gap-12">
					<div
						className="hidden xl:block absolute w-[450px] h-[450px] rounded-full top-[35%] transform -translate-y-1/2"
						style={{
							background: "linear-gradient(to bottom, #FFFFFF, #A412FF)",
							zIndex: 3,
						}}
					></div>
					<button
						onClick={handlePrev}
						className="absolute xl:left-0 !z-15 top-1/4 transform -translate-x-32 xl:-translate-x-12 -translate-y-1/2 flex items-center justify-center w-12 h-12"
						style={{ zIndex: 100 }}
					>
						<Image
							src="/Polygon 7.png"
							alt="Left Arrow"
							className="w-full h-full object-contain z-15"
							width={48}
							height={48}
						/>
					</button>
					<div className="w-full z-10 flex justify-center items-center !h-[50%] xl:!h-full">
						<Suspense
							fallback={
								<div className="!h-[100%] w-full text-white flex items-center justify-center" />
							}
						>
							<NFT index={currentIndex} />
						</Suspense>
					</div>
					<button
						onClick={handleNext}
						className="absolute xl:right-0 !z-15 top-1/4 transform translate-x-32 xl:translate-x-12 -translate-y-1/2 flex items-center justify-center w-12 h-12"
						style={{ zIndex: 100 }}
					>
						<Image
							src="/Polygon 2.png"
							alt="Right Arrow"
							className="w-full h-full object-contain z-15"
							width={48}
							height={48}
						/>
					</button>
					<div className="flex flex-wrap xl:hidden w-full justify-center items-center gap-6">
						{!customize ? (
							<button
								className={`bg-black border-2 border-cyan-400 rounded-md xl:rounded-xl flex items-center justify-center text-cyan-400 font-bold text-md`}
								style={{
									width: "40%",
									paddingLeft: "1.5rem",
									paddingRight: "1.5rem",
									paddingTop: "0.5rem",
									paddingBottom: "0.5rem",
								}}
								onClick={() => setCustomize(true)}
							>
								Customize
							</button>
						) : (
							<>
								<SideRectangle text="SHOES" w={"40%"} p={"1.5rem"} />
								<SideRectangle text="ACCESSORIES" w={"40%"} p={"1.5rem"} />
								<SideRectangle text="BACKGROUND" w={"40%"} p={"1.5rem"} />
								<SideRectangle text="SHOES" w={"40%"} p={"1.5rem"} />
							</>
						)}
					</div>

					<div className="flex xl:hidden w-full justify-center items-center gap-10 mb-10">
						<p className="text-[#00B2FF] text-lg font-semibold p-1">Games</p>
						<Image
							src="https://s3-alpha-sig.figma.com/img/372f/71c7/5cfeb76b59a50d4349535955da5d9b43?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TF-Vvxcm~qa-CERobMfWs2GIlOI~Q4m6W~W7N7-QW7gxL8sy5H-pxj6cKMi9euYkF8LNkMApNWdW2-u5BbczqdcaQIhLrPbHrX7JSkQNmIW2876b7iUlf40x-xeYnwRk~hRGGb9YKHgwXUWfwblw5dsIS3c9Q-K4xWSbqUESX-4r9KF5ZdV9vBtrj4CMT844KK0wbH2yOH3q-tvfGzDZzzWZXRM-3XsX-eMoJ-iAGwBwfQBQR7NryKmFhhO2X8VUUkskIHUBGqdC4rA6CxE4aMf~gi2ai-cySz7yKmnL1HId7xEiPUvOtiA~OYA3~WsFTif9ovjgG~l90XG-RIUO-Q__"
							alt="Paw"
							className={`cursor-pointer`}
							width={52}
							height={52}
						/>
						<p className="text-[#00B2FF] text-lg underline font-semibold p-1">
							Profile
						</p>
					</div>
				</div>

				<div className="hidden xl:flex xl:col-span-3 h-full flex-col items-start justify-end gap-4">
					{customize && (
						<>
							<SideRectangle text="SHOES" />
							<SideRectangle text="ACCESSORIES" />
							<SideRectangle text="BACKGROUND" />
						</>
					)}
				</div>
			</div>

			<div className="hidden xl:flex justify-center items-end gap-12 w-full h-[10%] mt-10">
				{Array.from({ length: 5 }).map((_, index) => (
					<button
						key={index}
						className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
							index === currentIndex ? "border-blue-500" : "border-transparent"
						}`}
						onClick={() => updateMainImage(index)}
					>
						<img
							src={`https://kingdomly-creator-bucket.s3.us-east-2.amazonaws.com/cubhub-images/images-updated/${
								index + 105
							}.png`}
							alt={`Thumbnail ${index + 1}`}
							className="w-full h-full object-cover"
							width={48}
							height={48}
						/>
					</button>
				))}
			</div>
		</div>
	);
};

export default Slider;

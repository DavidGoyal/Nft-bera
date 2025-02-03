"use client";

import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import SideRectangle from "./sideRect";
import dynamic from "next/dynamic";

const NFT = dynamic(() => import("./3D/nft"), { ssr: false });

const Slider = () => {
	const [currentIndex, setCurrentIndex] = useState<number>(0);

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
		<div className="relative flex flex-col items-center h-screen max-h-[100vh] w-full lg:justify-center">
			<div className="hidden lg:h-[8vh]"></div>
			<div className="grid grid-cols-12 h-full lg:h-[70vh] w-full pt-14 lg:pt-0">
				<div className="hidden lg:flex lg:col-span-3 h-full flex-col justify-end gap-4 items-end">
					<SideRectangle text="HEAD" />
					<SideRectangle text="FACE" />
					<SideRectangle text="BODY" />
				</div>

				<div className="col-span-12 lg:col-span-6 h-full relative flex flex-col items-center justify-end gap-12">
					<div
						className="hidden xl:block absolute w-[450px] h-[450px] rounded-full top-[35%] transform -translate-y-1/2"
						style={{
							background: "linear-gradient(to bottom, #FFFFFF, #A412FF)",
							zIndex: 3,
						}}
					></div>
					<button
						onClick={handlePrev}
						className="absolute lg:left-0 !z-15 top-1/4 transform -translate-x-32 lg:-translate-x-12 -translate-y-1/2 flex items-center justify-center w-12 h-12"
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
					<Suspense
						fallback={
							<div className="!h-[48vh] text-white flex items-center justify-center">
								<div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-blue-500"></div>
							</div>
						}
					>
						<NFT index={currentIndex} />
					</Suspense>
					<button
						onClick={handleNext}
						className="absolute lg:right-0 !z-15 top-1/4 transform translate-x-32 lg:translate-x-12 -translate-y-1/2 flex items-center justify-center w-12 h-12"
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
					<div className="flex flex-wrap lg:hidden w-full justify-center items-center gap-6">
						<SideRectangle text="SHOES" w={"40%"} p={"1.5rem"} />
						<SideRectangle text="ACCESSORIES" w={"40%"} p={"1.5rem"} />
						<SideRectangle text="BACKGROUND" w={"40%"} p={"1.5rem"} />
						<SideRectangle text="SHOES" w={"40%"} p={"1.5rem"} />
					</div>

					<div className="flex lg:hidden w-full justify-center items-center gap-10">
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

				<div className="hidden lg:flex lg:col-span-3 h-full flex-col items-start justify-end gap-4">
					<SideRectangle text="SHOES" />
					<SideRectangle text="ACCESSORIES" />
					<SideRectangle text="BACKGROUND" />
				</div>
			</div>

			<div className="hidden lg:flex justify-center items-end gap-12 w-full h-[10vh] mt-10">
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

"use client";

import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import SideRectangle from "./sideRect";
import BringToVr from "./bring-to-vr";
import dynamic from "next/dynamic";

const NFT = dynamic(() => import("./3D/new-nft"), { ssr: false });

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(51);
  const [customize, setCustomize] = useState<boolean>(false);
  const [nftId, setNftId] = useState<string>("");
  const [displayType, setDisplayType] = useState<"3d" | "2d">("3d");

  const maxImages = 1533;
  const visibleThumbnails = 7;
  let startIndex = Math.max(
    51,
    currentIndex - Math.floor(visibleThumbnails / 2)
  );
  if (startIndex + visibleThumbnails > maxImages) {
    startIndex = maxImages - visibleThumbnails;
  }

  const handlePrev = () => {
    if (currentIndex > 51) {
      setCurrentIndex((prev) => prev - 1);
      localStorage.setItem("currentIndex", (currentIndex - 1).toString());
    }
  };

  const handleNext = () => {
    if (currentIndex < maxImages - 1) {
      setCurrentIndex((prev) => prev + 1);
      localStorage.setItem("currentIndex", (currentIndex + 1).toString());
    }
  };

  const updateMainImage = (index: number) => {
    setCurrentIndex(index);
    localStorage.setItem("currentIndex", index.toString());
  };

  const searchNFT = (id: string) => {
    const numId = Number(id);
    if (numId < 1 || numId > maxImages - 1) {
      alert("Invalid NFT ID");
      return;
    }
    setCurrentIndex(numId);
    localStorage.setItem("currentIndex", numId.toString());
  };

  useEffect(() => {
    if (customize) {
      setTimeout(() => {
        setCustomize(false);
      }, 3000);
    }
  }, [customize]);

  useEffect(() => {
    if (currentIndex === 1) {
      localStorage.setItem("currentIndex", "1");
    }
  }, [currentIndex]);

  return (
    <div className="relative flex flex-col items-center h-full w-full lg:justify-between">
      <div className="grid grid-cols-12 h-full lg:h-[70%] w-full pt-14 lg:pt-0 mt-14">
        <div className="hidden lg:flex lg:col-span-3 h-full flex-col justify-end gap-4 items-end">
          {!customize ? (
            <button
              className="bg-black border-2 border-cyan-400 rounded-md lg:rounded-xl flex items-center justify-center text-cyan-400 font-bold text-md px-6 py-2"
              onClick={() => setCustomize(true)}
            >
              Customize
            </button>
          ) : (
            <>
              <SideRectangle text="COMING SOON" />
            </>
          )}
        </div>

        <div className="col-span-12 lg:col-span-6 h-full relative flex flex-col items-center justify-between lg:justify-end gap-12 lg:gap-12">
          {displayType === "3d" && (
            <div
              className="hidden lg:block absolute lg:w-[360px] lg:h-[360px] xl:w-[460px] xl:h-[460px] rounded-full top-[35%] transform -translate-y-1/2"
              style={{
                background: "linear-gradient(to bottom, #FFFFFF, #A412FF)",
                zIndex: 3,
              }}
            ></div>
          )}
          <button
            onClick={handlePrev}
            className="absolute lg:left-0 top-1/4 transform -translate-x-32 lg:-translate-x-12 -translate-y-1/2 flex items-center justify-center w-12 h-12"
            style={{ zIndex: 100 }}
          >
            <Image
              src="/Polygon 7.png"
              alt="Left Arrow"
              className="w-full h-full object-contain"
              width={48}
              height={48}
            />
          </button>
          <div className="w-full z-10 flex justify-center items-center !h-[35vh] lg:!h-full relative">
            <Suspense
              fallback={
                <div className="!h-[100%] w-full text-white flex items-center justify-center" />
              }
            >
              {displayType === "3d" && <NFT index={currentIndex} />}
              {displayType === "2d" && (
                <img
                  src={`https://kingdomly-creator-bucket.s3.us-east-2.amazonaws.com/cubhub-images/images-updated/${currentIndex}.png`}
                  alt={`Thumbnail ${currentIndex}`}
                  className="w-auto h-auto max-h-[95%] xl:h-[95%] object-cover bg-transparent rounded-full lg:-translate-y-10"
                />
              )}
            </Suspense>
            <div className="absolute bottom-0 h-fit w-fit left-[-10px] lg:top-0 lg:right-0 flex justify-center items-center bg-slate-300 rounded-md text-black">
              <button
                onClick={() => setDisplayType("2d")}
                className={`${
                  displayType === "2d" ? "bg-slate-400" : ""
                } p-3 rounded-md`}
              >
                2D
              </button>
              <button
                onClick={() => setDisplayType("3d")}
                className={`${
                  displayType === "3d" ? "bg-slate-400" : ""
                } p-3 rounded-md`}
              >
                3D
              </button>
            </div>
          </div>
          <button
            onClick={handleNext}
            className="absolute lg:right-0 top-1/4 transform translate-x-32 lg:translate-x-12 -translate-y-1/2 flex items-center justify-center w-12 h-12"
            style={{ zIndex: 100 }}
          >
            <Image
              src="/Polygon 2.png"
              alt="Right Arrow"
              className="w-full h-full object-contain"
              width={48}
              height={48}
            />
          </button>
          <BringToVr w="40%" />
          <div className="flex flex-col lg:hidden w-full justify-center items-center gap-6">
            <div className="flex gap-2 items-center justify-center">
              <input
                type="text"
                className="border-2 w-[40%] border-cyan-400 rounded-md lg:rounded-xl flex items-center justify-center text-cyan-400 font-bold text-md text-center p-2 bg-transparent placeholder:text-cyan-400 placeholder:font-bold placeholder:text-md placeholder:text-center"
                placeholder="Enter ID"
                value={nftId}
                onChange={(e) => setNftId(e.target.value)}
              />
              <button
                className="bg-black border-2 border-cyan-400 rounded-md lg:rounded-xl flex items-center justify-center text-cyan-400 font-bold text-md p-2"
                onClick={() => searchNFT(nftId)}
              >
                Search
              </button>
            </div>
            {!customize ? (
              <>
                <button
                  className="bg-black border-2 border-cyan-400 rounded-md lg:rounded-xl flex items-center justify-center text-cyan-400 font-bold text-md px-6 py-2"
                  onClick={() => setCustomize(true)}
                >
                  Customize
                </button>
              </>
            ) : (
              <>
                <SideRectangle text="COMING SOON" w={"40%"} p={"1.5rem"} />
              </>
            )}
          </div>

          <div className="flex lg:hidden w-full justify-center items-center gap-10 mb-10">
            <p className="text-[#00B2FF] text-lg font-semibold p-1">Games</p>
            <Image
              src="/paw-logo.webp"
              alt="Paw"
              className="cursor-pointer"
              width={52}
              height={52}
            />
            <p className="text-[#00B2FF] text-lg underline font-semibold p-1">
              Profile
            </p>
          </div>
        </div>

        <div className="hidden lg:flex lg:col-span-3 h-full flex-col items-start justify-end gap-4">
          {
            <div className="w-full flex gap-2 md:flex-col flex-row lg:flex-row items-center justify-center">
              <input
                type="text"
                className="w-full border-2 border-cyan-400 rounded-md lg:rounded-xl flex items-center justify-center text-cyan-400 text-center font-bold text-md p-2 bg-transparent placeholder:text-cyan-400 placeholder:font-bold placeholder:text-md placeholder:text-center"
                placeholder="Enter NFT ID"
                value={nftId}
                onChange={(e) => setNftId(e.target.value)}
              />
              <button
                className="bg-black border-2 border-cyan-400 rounded-md lg:rounded-xl flex items-center justify-center text-cyan-400 font-bold text-md p-2"
                onClick={() => searchNFT(nftId)}
              >
                Search
              </button>
            </div>
          }
        </div>
      </div>

      {/* Image Slider with 6 images at a time */}
      <div className="hidden lg:flex justify-center items-end gap-12 w-full h-[10%] mt-10">
        {Array.from({ length: visibleThumbnails }).map((_, index) => {
          const imgIndex = startIndex + index;
          return imgIndex <= maxImages ? (
            <button
              key={imgIndex}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                imgIndex === currentIndex
                  ? "border-blue-500 border-[4px]"
                  : "border-transparent"
              }`}
              onClick={() => updateMainImage(imgIndex)}
            >
              <img
                src={`https://kingdomly-creator-bucket.s3.us-east-2.amazonaws.com/cubhub-images/images-updated/${imgIndex}.png`}
                alt={`Thumbnail ${imgIndex}`}
                className="w-full h-full object-cover"
                width={56}
                height={56}
              />
            </button>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Slider;

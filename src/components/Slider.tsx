"use client";

import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import SideRectangle from "./sideRect";
import BringToVr from "./bring-to-vr";
import dynamic from "next/dynamic";
import { FaLocationArrow } from "react-icons/fa";
import DownloadButton from "./ui/download-button";

// Use dynamic import with no SSR for the 3D component
const NFT = dynamic(() => import("./3D/new-nft"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
    </div>
  ),
});

const Slider = ({ nfts }: { nfts: number[] }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [customize, setCustomize] = useState<boolean>(false);
  const [displayType, setDisplayType] = useState<"3d" | "2d">("2d");
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [modelLoadError, setModelLoadError] = useState<boolean>(false);

  useEffect(() => {
    // Check if the device is iOS
    const iosCheck = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iosCheck);

    // Default to 2D view on iOS to avoid potential issues
    if (iosCheck) {
      setDisplayType("2d");
    }
  }, []);

  const maxImages = nfts.length;
  const visibleThumbnails = isIOS
    ? Math.min(maxImages, 3)
    : Math.min(maxImages, 5);
  let startIndex = Math.max(
    0,
    currentIndex - Math.floor(visibleThumbnails / 2)
  );
  if (startIndex + visibleThumbnails > maxImages) {
    startIndex = maxImages - visibleThumbnails;
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setModelLoadError(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < nfts.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setModelLoadError(false);
    }
  };

  const updateMainImage = (index: number) => {
    setCurrentIndex(index);
    setModelLoadError(false);
  };

  useEffect(() => {
    if (customize) {
      setTimeout(() => {
        setCustomize(false);
      }, 3000);
    }
  }, [customize]);

  const handleDisplayTypeChange = (type: "2d" | "3d") => {
    // Reset error state when switching display types
    setModelLoadError(false);
    setDisplayType(type);
  };

  return (
    <div className="relative flex flex-col items-center h-full w-full lg:justify-between">
      <div className="grid grid-cols-12 h-full lg:h-[90%] w-full pt-20 lg:pt-14">
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

        <div className="col-span-12 lg:col-span-6 h-full relative flex flex-col items-center justify-start gap-[15%] lg:justify-between lg:gap-12">
          {displayType === "3d" && (
            <div
              className="hidden lg:block absolute lg:w-[360px] lg:h-[360px] xl:w-[440px] xl:h-[440px] rounded-full top-[35%] transform -translate-y-[48%]"
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
            <FaLocationArrow className="w-full h-full fill-slate-800 -rotate-[135deg]" />
          </button>
          <div className="w-full z-10 flex justify-center items-center !h-[35vh] lg:!h-full relative">
            <Suspense
              fallback={
                <div className="!h-[100%] w-full text-white flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                </div>
              }
            >
              {displayType === "3d" && !modelLoadError && (
                <NFT
                  index={nfts[currentIndex]}
                  key={`3d-${nfts[currentIndex]}`}
                />
              )}
              {(displayType === "2d" || modelLoadError) && (
                <img
                  src={`https://kingdomly-creator-bucket.s3.us-east-2.amazonaws.com/cubhub-images/images-updated/${nfts[currentIndex]}.png`}
                  alt={`Thumbnail ${currentIndex}`}
                  className="w-auto h-auto max-h-[95%] object-cover bg-transparent rounded-full transform lg:-translate-y-[12%]"
                  onError={(e) => {
                    console.error("Image failed to load");
                    (e.target as HTMLImageElement).src = "/glbimage1.png"; // Add a fallback image
                  }}
                />
              )}
            </Suspense>
            {(displayType === "2d" || modelLoadError) && (
              <DownloadButton
                url={`https://kingdomly-creator-bucket.s3.us-east-2.amazonaws.com/cubhub-images/images-updated/${nfts[currentIndex]}.png`}
              />
            )}
            <div className="absolute bottom-0 h-14 w-32 left-[-10px] lg:top-0 lg:right-0 flex justify-center items-center bg-transparent text-cyan-800 font-bold border-cyan-400 border-2">
              <button
                onClick={() => handleDisplayTypeChange("2d")}
                className={`${
                  displayType === "2d"
                    ? "text-cyan-400 border-b-4 border-blue-700"
                    : ""
                } h-full w-12 text-center`}
              >
                2D
              </button>
              <button
                onClick={() => handleDisplayTypeChange("3d")}
                disabled={isIOS && modelLoadError}
                className={`${
                  displayType === "3d"
                    ? "text-cyan-400 border-b-4 border-blue-700"
                    : ""
                } h-full w-12 text-center ${
                  isIOS && modelLoadError ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                3D
              </button>
            </div>
            {modelLoadError && (
              <div className="absolute bottom-16 bg-black bg-opacity-70 text-red-400 p-2 rounded text-sm">
                3D model failed to load. Using 2D image instead.
              </div>
            )}
          </div>
          <button
            onClick={handleNext}
            className="absolute lg:right-0 top-1/4 transform translate-x-32 lg:translate-x-12 -translate-y-1/2 flex items-center justify-center w-12 h-12"
            style={{ zIndex: 100 }}
          >
            <FaLocationArrow className="w-full h-full fill-slate-800 rotate-45" />
          </button>
          <div className="flex flex-col lg:hidden w-full justify-center items-center gap-6">
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

          <div className="flex lg:hidden w-full justify-center items-center gap-10 mb-14">
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
          <BringToVr w="80%" />
        </div>
      </div>

      {/* Image Slider with 5 images at a time */}
      <div className="hidden lg:flex justify-center items-end gap-12 w-full h-[10%] mt-16">
        {Array.from({ length: 5 }).map((_, index) => {
          const imgIndex = nfts[startIndex + index];
          const url = `https://kingdomly-creator-bucket.s3.us-east-2.amazonaws.com/cubhub-images/images-updated/${imgIndex}.png`;
          return startIndex + index < maxImages ? (
            <button
              key={index}
              className={`w-26 h-28 rounded-lg overflow-hidden border-[1px] ${
                startIndex + index === currentIndex
                  ? "border-blue-500 border-[4px]"
                  : "border-transparent"
              }`}
              onClick={() => updateMainImage(startIndex + index)}
            >
              <img
                src={url}
                alt={`Thumbnail ${imgIndex}`}
                className="w-full h-full scale-[3] object-bottom translate-y-12 translate-x-1"
                onError={(e) => {
                  console.error(`Thumbnail ${imgIndex} failed to load`);
                  (e.target as HTMLImageElement).src = "/fallback-image.png"; // Add a fallback image
                }}
              />
            </button>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Slider;

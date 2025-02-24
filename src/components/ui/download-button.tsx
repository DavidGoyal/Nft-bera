import React from "react";
import { FaRegImage } from "react-icons/fa";

const DownloadButton = ({ url }: { url: string }) => {
  const handleDownload = () => {
    const imageUrl = url; // Replace with your image URL
    const link = document.createElement("a");
    link.href = imageUrl;
    link.target = "_blank";
    link.download = "downloaded-cub.jpg"; // Set the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="absolute top-0 right-0 text-cyan-400 opacity-[1.2] size-8"
    >
      <FaRegImage className="w-full h-full" />
    </button>
  );
};

export default DownloadButton;

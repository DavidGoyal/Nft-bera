"use client";

import { useEffect, useRef, useState } from "react";
import "@google/model-viewer";

const ThreeScene = ({ index }: { index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelViewerRef = useRef<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const currentRef = containerRef.current;

    setIsLoading(true);

    // Remove previous model-viewer if exists
    if (modelViewerRef.current && currentRef.contains(modelViewerRef.current)) {
      currentRef.removeChild(modelViewerRef.current);
    }

    // Create model-viewer element
    const modelViewer = document.createElement("model-viewer") as HTMLElement;
    modelViewer.setAttribute(
      "src",
      `https://kingdomly-creator-bucket.s3.us-east-2.amazonaws.com/cubhub-glbs/glb-updated/glb/${index}.glb`
    );
    modelViewer.setAttribute("alt", "3D Model");
    modelViewer.setAttribute("camera-controls", "true");
    modelViewer.setAttribute("ar", "");
    modelViewer.setAttribute("ar-modes", "webxr scene-viewer quick-look");

    modelViewer.setAttribute("disable-zoom", "false"); // Allow zooming
    modelViewer.setAttribute("gesture-detector", ""); // Enable gestures
    modelViewer.setAttribute("interaction-prompt", "auto"); // Show interaction hint

    // Additional attributes for better experience
    modelViewer.setAttribute("scale", "0.3 0.3 0.3");
    modelViewer.setAttribute("environment-image", "neutral");
    modelViewer.setAttribute("shadow-intensity", "1");
    modelViewer.setAttribute("shadow-softness", "1");
    modelViewer.setAttribute("exposure", "1");
    modelViewer.setAttribute("loading", "eager");
    modelViewer.setAttribute("allow", "xr-spatial-tracking");

    // Styling and positioning
    modelViewer.style.width = "100%";
    modelViewer.style.height = "100%";
    modelViewer.style.touchAction = "none"; // Let model-viewer handle gestures
    modelViewer.style.background = "transparent";

    modelViewer.addEventListener("load", () => {
      setIsLoading(false);
    });

    // Save reference and append to DOM
    modelViewerRef.current = modelViewer;
    currentRef.appendChild(modelViewer);

    // Cleanup
    return () => {
      if (modelViewerRef.current && currentRef) {
        currentRef.removeChild(modelViewerRef.current);
      }
    };
  }, [index]);

  return (
    <div
      className="h-full w-full relative"
      ref={containerRef}
      style={{ touchAction: "none" }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default ThreeScene;

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

    // Check if model-viewer already exists
    if (!modelViewerRef.current) {
      const modelViewer = document.createElement("model-viewer") as HTMLElement;

      // Common attributes (set only once)
      modelViewer.setAttribute("camera-controls", "true");
      modelViewer.setAttribute("ar", "");
      modelViewer.setAttribute("ar-modes", "webxr scene-viewer quick-look");
      modelViewer.setAttribute("ar-scale", "auto");
      modelViewer.setAttribute("disable-zoom", "false");
      modelViewer.setAttribute("gesture-detector", "");
      modelViewer.setAttribute("interaction-prompt", "auto");
      modelViewer.setAttribute("scale", "0.6 0.6 0.6");
      modelViewer.setAttribute("environment-image", "neutral");
      modelViewer.setAttribute("shadow-intensity", "1");
      modelViewer.setAttribute("shadow-softness", "1");
      modelViewer.setAttribute("exposure", "1");
      modelViewer.setAttribute("loading", "eager");
      modelViewer.setAttribute("allow", "xr-spatial-tracking");
      modelViewer.setAttribute("ar-button", "#bring-to-ar");

      modelViewer.style.width = "100%";
      modelViewer.style.height = "100%";
      modelViewer.style.touchAction = "none";
      modelViewer.style.background = "transparent";

      modelViewerRef.current = modelViewer;
      currentRef.appendChild(modelViewer);

      modelViewer.addEventListener("load", () => setIsLoading(false));
    } else {
      // Only update the src for performance improvement
      modelViewerRef.current.setAttribute(
        "src",
        `https://kingdomly-creator-bucket.s3.us-east-2.amazonaws.com/cubhub-glbs/glb-updated/glb/${index}.glb`
      );
    }
  }, [index]);

  return (
    <div
      className="h-full w-full relative"
      ref={containerRef}
      style={{ touchAction: "none" }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default ThreeScene;

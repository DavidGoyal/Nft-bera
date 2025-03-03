"use client";

import { useEffect, useRef, useState } from "react";
import "@google/model-viewer";

const ThreeScene = ({ index }: { index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelViewerRef = useRef<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const currentRef = containerRef.current;

    setIsLoading(true);
    setError(null);

    // Remove previous model-viewer if exists
    if (modelViewerRef.current && currentRef.contains(modelViewerRef.current)) {
      currentRef.removeChild(modelViewerRef.current);
    }

    // Create model-viewer element
    const modelViewer = document.createElement("model-viewer") as HTMLElement;

    // Basic attributes first
    modelViewer.setAttribute(
      "src",
      `https://kingdomly-creator-bucket.s3.us-east-2.amazonaws.com/cubhub-glbs/glb-updated/glb/${index}.glb`
    );
    modelViewer.setAttribute("alt", "3D Model");
    modelViewer.setAttribute("camera-controls", "true");

    // iOS-specific optimizations
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      // Simplified configuration for iOS
      modelViewer.setAttribute("quick-look-browsers", "safari chrome");
      // Disable features that might cause issues on iOS
      modelViewer.setAttribute("ar", "true");
      modelViewer.setAttribute("ar-modes", "quick-look");
      modelViewer.setAttribute("ar-scale", "auto");
      modelViewer.setAttribute("environment-image", "neutral");
      modelViewer.setAttribute("shadow-intensity", "0");
      modelViewer.setAttribute("touch-action", "pan-y");
      modelViewer.setAttribute("disable-pan", "true");
    } else {
      // Full features for other browsers
      modelViewer.setAttribute("ar", "");
      modelViewer.setAttribute("ar-modes", "webxr scene-viewer quick-look");
      modelViewer.setAttribute("ar-scale", "auto");
      modelViewer.setAttribute("environment-image", "neutral");
      modelViewer.setAttribute("shadow-intensity", "1");
      modelViewer.setAttribute("shadow-softness", "1");
    }

    // Common attributes for all platforms
    modelViewer.setAttribute("disable-zoom", "false");
    modelViewer.setAttribute("interaction-prompt", "auto");
    modelViewer.setAttribute("scale", "0.1 0.1 0.1");
    modelViewer.setAttribute("exposure", "1");
    modelViewer.setAttribute("loading", "eager"); // Changed from auto to eager

    // Styling and positioning
    modelViewer.style.width = "100%";
    modelViewer.style.height = "100%";
    modelViewer.style.touchAction = "none";
    modelViewer.style.background = "transparent";

    modelViewer.addEventListener("error", (event) => {
      console.error("Error loading model:", event);
      setError("Failed to load 3D model");
      setIsLoading(false);
    });

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      if (!modelViewer.hasAttribute("loaded")) {
        setError("Model loading timed out");
      }
    }, 15000);

    modelViewer.addEventListener("load", () => {
      clearTimeout(loadingTimeout);
      setIsLoading(false);
      modelViewer.setAttribute("loaded", "true");
    });

    // Save reference and append to DOM
    modelViewerRef.current = modelViewer;
    currentRef.appendChild(modelViewer);

    // Cleanup
    return () => {
      clearTimeout(loadingTimeout);
      if (modelViewerRef.current && currentRef) {
        try {
          currentRef.removeChild(modelViewerRef.current);
        } catch (e) {
          console.warn("Error removing model viewer:", e);
        }
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
        <div
          className="absolute inset-0 flex items-center justify-center"
          slot="progress-bar"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-red-500 bg-black bg-opacity-50 p-4 rounded-md">
            {error}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeScene;

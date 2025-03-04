"use client";

import "@google/model-viewer";
import { useEffect, useRef, useState } from "react";

const MAX_CONCURRENT_LOADS = 2;

const ThreeScene = ({ index }: { index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelViewerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const mountedRef = useRef(true);
  const loadStartTime = useRef<number>(0);
  const activeLoads = useRef(new Set<number>());

  // Intersection Observer effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => {
      observer.unobserve(container);
    };
  }, []);

  // Model loading effect
  useEffect(() => {
    const container = containerRef.current;
    const currentActiveLoads = activeLoads.current; // Capture ref value
    if (
      !container ||
      !isVisible ||
      currentActiveLoads.size >= MAX_CONCURRENT_LOADS
    )
      return;

    mountedRef.current = true;

    if (modelViewerRef.current) {
      container.removeChild(modelViewerRef.current);
      modelViewerRef.current = null;
    }

    setIsModelLoaded(false);
    setLoadError(null);
    loadStartTime.current = Date.now();
    currentActiveLoads.add(index);

    const modelViewer = document.createElement("model-viewer");
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth < 768;

    modelViewer.setAttribute(
      "src",
      `https://kingdomly-creator-bucket.s3.us-east-2.amazonaws.com/cubhub-glbs/glb-updated/glb/${index}.glb`
    );
    modelViewer.setAttribute("alt", `3D Model ${index}`);
    modelViewer.setAttribute("camera-controls", "");
    modelViewer.setAttribute("interaction-prompt", "none");

    if (isIOS) {
      modelViewer.setAttribute("ar", "");
      modelViewer.setAttribute("ar-modes", "quick-look");
      modelViewer.setAttribute("loading", "lazy");
      modelViewer.setAttribute("shadow-intensity", "0");
      if (isSmallScreen) {
        modelViewer.setAttribute("poster", `/glbimage1.png`);
      }
    } else {
      modelViewer.setAttribute("ar", "");
      modelViewer.setAttribute("ar-modes", "webxr quick-look");
      modelViewer.setAttribute("loading", "lazy");
      modelViewer.setAttribute("shadow-intensity", "0.5");
    }

    modelViewer.style.width = "100%";
    modelViewer.style.height = "100%";

    const loadingTimeout = setTimeout(() => {
      if (!modelViewer.hasAttribute("loaded")) {
        console.warn(`Model ${index} loading timed out`);
        setLoadError("Loading timed out");
        setIsModelLoaded(true);
        currentActiveLoads.delete(index);
      }
    }, 10000);

    const loadHandler = () => {
      const minLoadTime = 500;
      const elapsed = Date.now() - loadStartTime.current;
      const remaining = Math.max(0, minLoadTime - elapsed);

      setTimeout(() => {
        if (mountedRef.current) {
          clearTimeout(loadingTimeout);
          modelViewer.setAttribute("loaded", "true");
          setIsModelLoaded(true);
          currentActiveLoads.delete(index);
        }
      }, remaining);
    };

    const errorHandler = () => {
      setLoadError("Failed to load model");
      setIsModelLoaded(true);
      currentActiveLoads.delete(index);
    };

    modelViewer.addEventListener("load", loadHandler, { once: true });
    modelViewer.addEventListener("error", errorHandler, { once: true });

    modelViewerRef.current = modelViewer;
    container.appendChild(modelViewer);

    return () => {
      mountedRef.current = false;
      clearTimeout(loadingTimeout);
      modelViewer.removeEventListener("load", loadHandler);
      modelViewer.removeEventListener("error", errorHandler);

      setTimeout(() => {
        if (
          !mountedRef.current &&
          modelViewerRef.current &&
          container.contains(modelViewerRef.current)
        ) {
          try {
            container.removeChild(modelViewerRef.current);
            modelViewerRef.current = null;
            setIsModelLoaded(false);
            setLoadError(null);
            currentActiveLoads.delete(index);
          } catch (e) {
            console.warn(`Error cleaning up model ${index}:`, e);
          }
        }
      }, 100);
    };
  }, [index, isVisible]); // Dependencies remain correct

  return (
    <div className="h-full w-full relative" ref={containerRef}>
      {(!isVisible || !isModelLoaded) && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">
              {loadError && `Error: ${loadError}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeScene;

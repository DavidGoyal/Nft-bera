"use client";

import Header from "./components/Header";
import { useEffect, useRef } from "react";
import "@google/model-viewer";

const ThreeScene = ({ index }: { index: number }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const modelViewerRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;
		const currentRef = containerRef.current;

		// Remove previous model-viewer if exists
		if (modelViewerRef.current) {
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
		modelViewer.setAttribute("ar-scale", "auto");

		modelViewer.setAttribute("disable-zoom", "false"); // Allow zooming
		modelViewer.setAttribute("gesture-detector", ""); // Enable gestures
		modelViewer.setAttribute("interaction-prompt", "auto"); // Show interaction hint

		// Additional attributes for better experience
		modelViewer.setAttribute("scale", "0.6 0.6 0.6");
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
		modelViewer.style.position = "absolute";
		modelViewer.style.background = "transparent";

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
			className="h-screen w-screen max-h-[100vh] overflow-y-hidden bg-gradient-to-b from-black via-[#010044] to-black relative"
			ref={containerRef}
			style={{ touchAction: "none" }}
		>
			<Header />
		</div>
	);
};

export default ThreeScene;

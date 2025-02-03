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
		modelViewer.setAttribute("camera-controls", "");
		modelViewer.setAttribute("shadow-intensity", "1");
		modelViewer.setAttribute("ar", "");
		modelViewer.setAttribute("ar-modes", "webxr scene-viewer quick-look");
		modelViewer.setAttribute("scale", "2 2 2"); // Increase size
		modelViewer.setAttribute("environment-image", "neutral");
		modelViewer.setAttribute("interaction-policy", "allow-when-focused");
		modelViewer.setAttribute("interaction-prompt", "when-focused");
		modelViewer.setAttribute("interaction-prompt-threshold", "medium");
		modelViewer.setAttribute("loading", "eager");
		modelViewer.setAttribute("shadow-softness", "1");

		// Styling and positioning
		modelViewer.style.width = "100vw";
		modelViewer.style.height = "100vh";
		modelViewer.style.background = "transparent";

		// Save reference and append to DOM
		modelViewerRef.current = modelViewer;
		currentRef.appendChild(modelViewer);

		// Cleanup
		return () => {
			if (modelViewerRef.current) {
				currentRef.removeChild(modelViewerRef.current);
			}
		};
	}, [index]);

	return (
		<div
			className="min-h-screen overflow-x-hidden w-screen bg-gradient-to-b from-black via-[#010044] to-black grid grid-cols-12 relative"
			ref={containerRef}
		>
			<Header />
		</div>
	);
};

export default ThreeScene;

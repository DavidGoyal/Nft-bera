"use client";

import { ModelViewerElement } from "@google/model-viewer";
import React from "react";

export default function Home() {
	const model = new ModelViewerElement();
	model.src =
		"https://kingdomly-creator-bucket.s3.us-east-2.amazonaws.com/cubhub-glbs/glb-updated/glb/105.glb";

	return React.createElement("model-viewer", {
		src: model.src,
		alt: "A 3D model of a cube",
		ar: true,
		"ar-modes": "webxr scene-viewer quick-look",
		"camera-controls": true,
		"environment-image": "neutral",
		"interaction-policy": "allow-when-focused",
		"interaction-prompt": "when-focused",
		"interaction-prompt-threshold": "medium",
		loading: "eager",
		"shadow-intensity": "1",
		"shadow-softness": "1",
		"camera-target": "[0, 0, 0]",
		"camera-fov": "50",
	});
}

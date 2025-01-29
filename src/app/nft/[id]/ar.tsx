"use client";

import Header from "./components/Header";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const ThreeScene = ({ index }: { index: number }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 500px)");
		setIsMobile(mediaQuery.matches);

		const handleMediaQueryChange = (event: MediaQueryListEvent) => {
			setIsMobile(event.matches);
		};

		mediaQuery.addEventListener("change", handleMediaQueryChange);
		return () =>
			mediaQuery.removeEventListener("change", handleMediaQueryChange);
	}, []);

	useEffect(() => {
		if (!containerRef.current) return;
		const currentRef = containerRef.current;

		// Scene setup
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(window.devicePixelRatio);
		currentRef.appendChild(renderer.domElement);

		// Camera positioning (Initial position)
		camera.position.set(0, 1, 5);

		// Lighting
		const ambientLight = new THREE.AmbientLight(0xffffff, 1);
		scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight.position.set(5, 5, 5).normalize();
		scene.add(directionalLight);

		// Orbit Controls
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;
		controls.rotateSpeed = 1;
		controls.zoomSpeed = 1.2;
		controls.enablePan = false; // Disables dragging movement
		controls.target.set(0, 0, 0); // Always look at the model's position
		controls.update();

		// GLTF Model Loader
		const loader = new GLTFLoader();
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
		loader.setDRACOLoader(dracoLoader);

		loader.load(
			`https://kingdomly-creator-bucket.s3.us-east-2.amazonaws.com/cubhub-glbs/glb-updated/glb/${index}.glb`,
			(gltf) => {
				const model = gltf.scene;

				// Set model's position explicitly to prevent movement
				model.position.set(0, -2, 0);
				model.rotation.set(0, 0, 0); // Reset rotation if needed

				// Scale based on device
				const scaleFactor = isMobile ? 0.3 : 0.4;
				model.scale.set(scaleFactor, scaleFactor, scaleFactor);

				scene.add(model);
			},
			(xhr) =>
				console.log(`Loading progress: ${(xhr.loaded / xhr.total) * 100}%`),
			(error) => console.error("Error loading 3D model:", error)
		);

		// Animation loop
		const renderScene = () => {
			controls.update();
			renderer.render(scene, camera);
			requestAnimationFrame(renderScene);
		};
		renderScene();

		// Resize handling
		const handleResize = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height);
		};
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			currentRef.removeChild(renderer.domElement);
			renderer.dispose();
		};
	}, [index, isMobile]);

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

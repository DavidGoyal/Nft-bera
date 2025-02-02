"use client";

import Header from "./components/Header";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ARButton } from "three/examples/jsm/Addons.js";

const ThreeScene = ({ index }: { index: number }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
	const sceneRef = useRef<THREE.Scene | null>(null);
	const modelRef = useRef<THREE.Group | null>(null);
	const frameIdRef = useRef<number | null>(null);
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
		sceneRef.current = scene;

		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		camera.position.set(0, 1, 5);

		// Optimized renderer
		const renderer = new THREE.WebGLRenderer({
			antialias: isMobile ? false : true, // Disable antialiasing on mobile
			alpha: true,
			powerPreference: "high-performance",
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio
		rendererRef.current = renderer;
		currentRef.appendChild(renderer.domElement);

		const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 5.5);
		hemiLight.position.set(0, 20, 0);
		scene.add(hemiLight);

		// Lighting
		const ambientLight = new THREE.AmbientLight(0xffffff, 1);
		scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight.position.set(5, 5, 5).normalize();
		scene.add(directionalLight);

		// Orbit Controls - keeping original settings
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;
		controls.rotateSpeed = 1;
		controls.zoomSpeed = 1.2;
		controls.enablePan = false;
		controls.target.set(0, 0, 0);
		controls.update();

		// Optimized model loading
		const loadModel = async () => {
			const loader = new GLTFLoader();
			const dracoLoader = new DRACOLoader();
			dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
			loader.setDRACOLoader(dracoLoader);

			try {
				const gltf = await loader.loadAsync(
					`https://kingdomly-creator-bucket.s3.us-east-2.amazonaws.com/cubhub-glbs/glb-updated/glb/${index}.glb`
				);

				if (modelRef.current) {
					scene.remove(modelRef.current);
				}

				const model = gltf.scene;
				modelRef.current = model;

				// Keep original position and rotation
				model.position.set(0, -2, 0);
				model.rotation.set(0, 0, 0);

				const scaleFactor = isMobile ? 0.3 : 0.4;
				model.scale.set(scaleFactor, scaleFactor, scaleFactor);

				// Optimize geometries and materials
				model.traverse((child) => {
					if ((child as THREE.Mesh).isMesh) {
						const mesh = child as THREE.Mesh;
						if (mesh.geometry) {
							mesh.geometry.computeBoundingSphere();
						}
					}
				});

				scene.add(model);
			} catch (error) {
				console.error("Error loading 3D model:", error);
			}
		};

		loadModel();

		// Optimized animation loop with frame limiting
		let lastTime = 0;
		const targetFPS = 60;
		const frameInterval = 1000 / targetFPS;

		const renderScene = (currentTime: number) => {
			frameIdRef.current = requestAnimationFrame(renderScene);

			const deltaTime = currentTime - lastTime;
			if (deltaTime < frameInterval) return;

			lastTime = currentTime - (deltaTime % frameInterval);

			controls.update();
			renderer.render(scene, camera);
		};

		frameIdRef.current = requestAnimationFrame(renderScene);

		// Debounced resize handler
		const handleResize = debounce(() => {
			const width = window.innerWidth;
			const height = window.innerHeight;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height);
		}, 250);

		window.addEventListener("resize", handleResize);

		renderer.xr.enabled = true;
		renderer.xr.addEventListener("sessionstart", () => {
			controls.enabled = true;
			modelRef.current?.position.set(0, 0, 0);
			modelRef.current?.scale.set(0.1, 0.1, 0.1);
			modelRef.current?.rotation.set(0, 0, 0);
			renderer.render(scene, camera);
		});
		renderer.xr.addEventListener("sessionend", () => {
			controls.enabled = true;
			modelRef.current?.position.set(0, -2, 0);
			modelRef.current?.scale.set(0.3, 0.3, 0.3);
			modelRef.current?.rotation.set(0, 0, 0);
			renderer.render(scene, camera);
		});

		// Create AR button with proper session initialization
		const arButton = ARButton.createButton(renderer, {
			domOverlay: { root: currentRef },
			requiredFeatures: ["hit-test", "dom-overlay"],
		});
		currentRef.appendChild(arButton);

		// Update animation loop for XR

		// Cleanup
		return () => {
			window.removeEventListener("resize", handleResize);
			if (frameIdRef.current) {
				cancelAnimationFrame(frameIdRef.current);
			}

			if (modelRef.current) {
				modelRef.current.traverse((child) => {
					if ((child as THREE.Mesh).isMesh) {
						const mesh = child as THREE.Mesh;
						mesh.geometry.dispose();
						if (Array.isArray(mesh.material)) {
							mesh.material.forEach((material) => material.dispose());
						} else {
							mesh.material.dispose();
						}
					}
				});
			}

			renderer.dispose();
			currentRef.removeChild(renderer.domElement);
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

// Debounce utility function
const debounce = (func: () => void, wait: number) => {
	let timeout: NodeJS.Timeout;
	return function executedFunction() {
		const later = () => {
			clearTimeout(timeout);
			func();
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

export default ThreeScene;

"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const ThreeScene: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(
				75,
				window.innerWidth / window.innerHeight,
				0.1,
				1000
			);
			const renderer = new THREE.WebGLRenderer({ antialias: true });
			renderer.setSize(window.innerWidth, window.innerHeight);
			containerRef.current?.appendChild(renderer.domElement);
			camera.position.set(0, 1, 5);

			// Add light
			const light = new THREE.AmbientLight(0xffffff, 1); // Soft white light
			scene.add(light);

			const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
			directionalLight.position.set(5, 5, 5).normalize();
			scene.add(directionalLight);

			// Load GLTF model with DRACO loader
			const loader = new GLTFLoader();
			const dracoLoader = new DRACOLoader();
			dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/"); // Use Google's hosted decoder
			loader.setDRACOLoader(dracoLoader);

			loader.load(
				"/panda1.glb", // Replace with the correct model path
				(gltf) => {
					const model = gltf.scene;
					model.scale.set(0.2, 0.2, 0.2); // Adjust scale if needed
					model.position.set(0, 0, 0);
					scene.add(model);

					// Animation loop
					const renderScene = () => {
						model.rotation.y += 0.01; // Rotate model for effect
						renderer.render(scene, camera);
						requestAnimationFrame(renderScene);
					};
					renderScene();
				},
				(xhr) => {
					console.log(`Loading progress: ${(xhr.loaded / xhr.total) * 100}%`);
				},
				(error) => {
					console.error("Error loading 3D model:", error);
				}
			);

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
			};
		}
	}, []);

	return <div ref={containerRef} />;
};

export default ThreeScene;

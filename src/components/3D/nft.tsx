"use client";

import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
const models = [
	"/panda1.glb",
	"/panda2.glb",
	"/panda3.glb",
	"/panda4.glb",
	"/panda5.glb",
];

const NFT = ({ index }: { index: number }) => {
	// Use `useGLTF`, which supports DRACO automatically
	const { scene } = useGLTF(models[index] ?? "/panda1.glb", true);

	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 500px)");

		setIsMobile(mediaQuery.matches);

		const handleMediaQueryChange = (event: MediaQueryListEvent) => {
			setIsMobile(event.matches);
		};

		mediaQuery.addEventListener("change", handleMediaQueryChange);

		return () => {
			mediaQuery.removeEventListener("change", handleMediaQueryChange);
		};
	}, []);

	return (
		<Canvas
			frameloop="demand"
			shadows
			camera={{ position: [20, 3, 5], fov: 25 }}
			gl={{ preserveDrawingBuffer: true }}
			className="w-full h-full z-10"
		>
			<OrbitControls
				enableZoom={false}
				maxPolarAngle={Math.PI / 2}
				minPolarAngle={Math.PI / 2}
			/>
			<Suspense fallback={<div>Loading...</div>}>
				<mesh>
					<hemisphereLight intensity={5} groundColor="black" />
					<primitive
						object={scene}
						scale={isMobile ? 0.72 : 0.75}
						position={[0, -4.2, 0]}
						rotation={[-0.04, -5, 0.03]}
					/>
				</mesh>
			</Suspense>
			<Preload all />
		</Canvas>
	);
};

// Preload all GLTF models to optimize loading
models.forEach((model) => useGLTF.preload(model));

export default NFT;

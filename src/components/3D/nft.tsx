"use client";

import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";

const models = [
	"/panda1.glb",
	"/panda2.glb",
	"/panda3.glb",
	"/panda4.glb",
	"/panda5.glb",
];

export const NFT = ({ index }: { index: number }) => {
	const myModel = useGLTF(models[index]);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 500px)");

		setIsMobile(mediaQuery.matches);

		//@ts-expect-error - type is unknown
		const handleMediaQueryChange = (event) => {
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
			<mesh>
				<hemisphereLight intensity={4} groundColor="black" />
				<pointLight intensity={10} />
				<spotLight
					position={[-20, 50, 10]}
					angle={0.12}
					penumbra={1}
					intensity={1}
					castShadow
					shadow-mapSize={1024}
				/>
				<primitive
					object={myModel.scene}
					scale={isMobile ? 0.72 : 0.75}
					position={[0, -4.2, 0]}
					rotation={[-0.04, -5, 0.03]}
				/>
			</mesh>
			<Preload all />
		</Canvas>
	);
};

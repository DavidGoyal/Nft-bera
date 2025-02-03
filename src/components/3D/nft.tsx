"use client";

import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState, useCallback, memo } from "react";
import { Mesh } from "three";

// Memoized model component with display name
const Model = memo(({ url, isMobile }: { url: string; isMobile: boolean }) => {
	const { scene } = useGLTF(url, true);

	useEffect(() => {
		scene.traverse((child) => {
			if ((child as Mesh).isMesh) {
				const mesh = child as Mesh;
				mesh.geometry.computeBoundingSphere();
				mesh.frustumCulled = false;
			}
		});
	}, [scene]);

	useEffect(() => {
		return () => {
			useGLTF.clear(url);
		};
	}, [url]);

	return (
		<primitive
			object={scene}
			scale={isMobile ? 0.6 : 0.75}
			position={[0, -4.0, 0]}
			rotation={[-0.04, -5, 0.03]}
		/>
	);
});
Model.displayName = "Model";

// Loading fallback component with display name
const LoadingFallback = memo(() => (
	<mesh>
		<circleGeometry args={[1]} />
		<meshStandardMaterial color="gray" />
	</mesh>
));
LoadingFallback.displayName = "LoadingFallback";

const NFT = ({ index }: { index: number }) => {
	const models = [105, 106, 107, 108, 109].map(
		(id) =>
			`https://kingdomly-creator-bucket.s3.us-east-2.amazonaws.com/cubhub-glbs/glb-updated/glb/${id}.glb`
	);

	const [isMobile, setIsMobile] = useState(false);

	const handleMediaQueryChange = useCallback((event: MediaQueryListEvent) => {
		setIsMobile(event.matches);
	}, []);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 500px)");
		setIsMobile(mediaQuery.matches);
		mediaQuery.addEventListener("change", handleMediaQueryChange);

		models.forEach((url) => useGLTF.preload(url));

		return () => {
			mediaQuery.removeEventListener("change", handleMediaQueryChange);
			models.forEach((url) => useGLTF.clear(url));
		};
	}, [handleMediaQueryChange, models]);

	return (
		<Canvas
			frameloop="demand"
			shadows={false}
			dpr={[1, Math.min(2, window.devicePixelRatio)]}
			camera={{ position: [20, 3, 5], fov: 25 }}
			gl={{
				preserveDrawingBuffer: true,
				antialias: !isMobile,
				powerPreference: "high-performance",
			}}
			performance={{ min: 0.5 }}
			className="w-full z-10 flex justify-center items-center"
		>
			<OrbitControls
				enableZoom={false}
				maxPolarAngle={Math.PI / 2}
				minPolarAngle={Math.PI / 2}
				enableDamping={true}
				dampingFactor={0.05}
				rotateSpeed={0.8}
			/>
			<Suspense fallback={<LoadingFallback />}>
				<mesh>
					<hemisphereLight intensity={5} groundColor="black" />
					<Model url={models[index]} isMobile={isMobile} />
				</mesh>
			</Suspense>
			<Preload all />
		</Canvas>
	);
};

// Clear GLTF cache on component unmount
// Add display name to the main component as well
NFT.displayName = "NFT";

export default memo(NFT);

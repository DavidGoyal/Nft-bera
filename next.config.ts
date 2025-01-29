import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "s3-alpha-sig.figma.com",
			},
			{
				protocol: "https",
				hostname: "kingdomly-creator-bucket.s3.us-east-2.amazonaws.com",
			},
		],
	},
};

export default nextConfig;

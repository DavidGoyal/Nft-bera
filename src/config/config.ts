"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "viem";
import { berachain } from "wagmi/chains";
import { createStorage } from "wagmi";

// Create a custom storage that uses localStorage
const storage = createStorage({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
});

export const config = getDefaultConfig({
  appName: "Cubhub",
  projectId: "6b160afd8d190502aae8559c94e7d799",
  chains: [berachain],
  ssr: true, // If your dApp uses server side rendering (SSR)
  transports: {
    [berachain.id]: http(),
  },
  // Improve connection persistence
  storage,
  // Increase connection timeout
  pollingInterval: 8000, // 8 seconds
});

"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "viem";
import { berachain } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Cubhub",
  projectId: "6b160afd8d190502aae8559c94e7d799",
  chains: [berachain],
  ssr: true, // If your dApp uses server side rendering (SSR)
  transports: {
    [berachain.id]: http(),
  },
});

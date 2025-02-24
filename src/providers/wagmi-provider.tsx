"use client";

import { darkTheme, RainbowKitProvider, Theme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { WagmiProvider } from "wagmi";
import merge from "lodash.merge";

import { config } from "@/config/config";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const myTheme = merge(darkTheme({ borderRadius: "medium" }), {
    colors: {
      accentColor: "transparent",
      accentColorForeground: "#22d3ee",
    },
  } as Theme);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" theme={myTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

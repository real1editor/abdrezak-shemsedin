"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Credential } from "@/data/masterPortfolio";
import type { PortfolioMeta, PortfolioView } from "@/data/site";
import type { PortfolioData } from "@/types/portfolio";

interface PortfolioContextValue {
  data: PortfolioData;
  credentials: Credential[];
  meta: PortfolioMeta;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({
  value,
  children,
}: {
  value: PortfolioView;
  children: ReactNode;
}) {
  return (
    <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
  );
}

export function usePortfolio(): PortfolioContextValue {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used inside <PortfolioProvider>.");
  }
  return context;
}

export function usePortfolioData(): PortfolioData {
  return usePortfolio().data;
}

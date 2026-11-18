import type { Metadata } from "next";
import PortfolioView from "@/components/portfolio-view";
import { getDomainMetadata, getDomainView } from "@/data/site";

export const metadata: Metadata = getDomainMetadata("ece");

export default function EcePage() {
  return <PortfolioView view={getDomainView("ece")} />;
}

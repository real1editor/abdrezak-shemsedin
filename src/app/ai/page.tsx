import type { Metadata } from "next";
import PortfolioView from "@/components/portfolio-view";
import { getDomainMetadata, getDomainView } from "@/data/site";

export const metadata: Metadata = getDomainMetadata("ai");

export default function AiPage() {
  return <PortfolioView view={getDomainView("ai")} />;
}

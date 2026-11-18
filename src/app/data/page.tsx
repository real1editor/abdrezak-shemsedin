import type { Metadata } from "next";
import PortfolioView from "@/components/portfolio-view";
import { getDomainMetadata, getDomainView } from "@/data/site";

export const metadata: Metadata = getDomainMetadata("data");

export default function DataPage() {
  return <PortfolioView view={getDomainView("data")} />;
}

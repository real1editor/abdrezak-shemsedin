import type { Metadata } from "next";
import PortfolioView from "@/components/portfolio-view";
import { getDomainMetadata, getDomainView } from "@/data/site";

export const metadata: Metadata = getDomainMetadata("ml-dl");

export default function MlDlPage() {
  return <PortfolioView view={getDomainView("ml-dl")} />;
}

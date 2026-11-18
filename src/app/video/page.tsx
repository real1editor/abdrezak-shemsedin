import type { Metadata } from "next";
import PortfolioView from "@/components/portfolio-view";
import { getDomainMetadata, getDomainView } from "@/data/site";

export const metadata: Metadata = getDomainMetadata("video");

export default function VideoPage() {
  return <PortfolioView view={getDomainView("video")} />;
}

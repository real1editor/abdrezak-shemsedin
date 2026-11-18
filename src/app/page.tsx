import PortfolioView from "@/components/portfolio-view";
import { getMasterView } from "@/data/site";

export default function Home() {
  return <PortfolioView view={getMasterView()} />;
}

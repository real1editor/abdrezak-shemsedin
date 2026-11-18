import type { Metadata } from "next";
import ResumeView from "@/components/resume-view";
import { getDomainResumeMetadata, getDomainView } from "@/data/site";

export const metadata: Metadata = getDomainResumeMetadata("ml-dl");

export default function MlDlResumePage() {
  return <ResumeView view={getDomainView("ml-dl")} />;
}

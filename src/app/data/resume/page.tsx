import type { Metadata } from "next";
import ResumeView from "@/components/resume-view";
import { getDomainResumeMetadata, getDomainView } from "@/data/site";

export const metadata: Metadata = getDomainResumeMetadata("data");

export default function DataResumePage() {
  return <ResumeView view={getDomainView("data")} />;
}

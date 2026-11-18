import type { Metadata } from "next";
import ResumeView from "@/components/resume-view";
import { getDomainResumeMetadata, getDomainView } from "@/data/site";

export const metadata: Metadata = getDomainResumeMetadata("ai");

export default function AiResumePage() {
  return <ResumeView view={getDomainView("ai")} />;
}

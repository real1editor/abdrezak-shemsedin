import type { Metadata } from "next";
import ResumeView from "@/components/resume-view";
import { getDomainResumeMetadata, getDomainView } from "@/data/site";

export const metadata: Metadata = getDomainResumeMetadata("ece");

export default function EceResumePage() {
  return <ResumeView view={getDomainView("ece")} />;
}

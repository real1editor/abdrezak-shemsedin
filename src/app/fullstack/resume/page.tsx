import type { Metadata } from "next";
import ResumeView from "@/components/resume-view";
import { getDomainResumeMetadata, getDomainView } from "@/data/site";

export const metadata: Metadata = getDomainResumeMetadata("fullstack");

export default function FullStackResumePage() {
  return <ResumeView view={getDomainView("fullstack")} />;
}

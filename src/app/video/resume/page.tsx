import type { Metadata } from "next";
import ResumeView from "@/components/resume-view";
import { getDomainResumeMetadata, getDomainView } from "@/data/site";

export const metadata: Metadata = getDomainResumeMetadata("video");

export default function VideoResumePage() {
  return <ResumeView view={getDomainView("video")} />;
}

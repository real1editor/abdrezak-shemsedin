import type { Metadata } from "next";
import ResumeView from "@/components/resume-view";
import { getMasterView } from "@/data/site";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Print-ready resume for Abdrezak Shemsedin — full-stack, AI systems, ECE, machine learning, data, and creative engineering.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return <ResumeView view={getMasterView()} />;
}

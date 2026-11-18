"use client";

import { usePortfolioData } from "@/components/portfolio-context";
import { FadeIn, SectionHeading, TooltipBadge } from "./shared";

export default function Tools() {
  const data = usePortfolioData();

  return (
    <section id="tools" aria-labelledby="tools-heading" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <SectionHeading
            eyebrow="Workflow"
            title="Too"
            highlight="ls"
            description="My everyday workflow — version control, deployment, editing, and API tooling. Hover any badge for context."
          />
          <div className="mt-10 grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-8">
            {data.tools.map((tool) => (
              <TooltipBadge key={tool.name} skill={tool} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

"use client";

import { usePortfolioData } from "@/components/portfolio-context";
import { FadeIn, SectionHeading } from "./shared";

export default function About() {
  const data = usePortfolioData();

  return (
    <section id="about" aria-labelledby="about-heading" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <FadeIn>
          <SectionHeading eyebrow="Profile" title="About " highlight="Me" />
          <div className="mt-6 max-w-3xl space-y-3">
            {data.about.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-zinc-400">
                {paragraph}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

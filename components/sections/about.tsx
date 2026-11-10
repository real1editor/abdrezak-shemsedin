"use client";

import { portfolioData } from "@/data/projects";
import { FadeIn, SectionHeading } from "./shared";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <FadeIn>
          <SectionHeading eyebrow="Profile" title="About " highlight="Me" />
          <div className="mt-6 max-w-3xl space-y-3">
            {portfolioData.about.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-zinc-400">
                {p}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

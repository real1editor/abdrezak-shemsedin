"use client";

import { usePortfolioData } from "@/components/portfolio-context";
import { FadeIn, SectionHeading } from "./shared";

export default function Experience() {
  const data = usePortfolioData();

  return (
    <section id="experience" aria-labelledby="exp-heading" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <SectionHeading eyebrow="Journey" title="Expe" highlight="rience" />
          <div className="relative mt-10 ml-4 border-l border-emerald-400/25 pl-8">
            {data.experience.map((item) => (
              <article key={item.title} className="relative pb-12 last:pb-0">
                <div className="absolute -left-[41px] top-1.5 h-3 w-3 rounded-full border border-emerald-400/50 bg-zinc-900" />
                <time className="text-xs font-medium text-emerald-300">{item.period}</time>
                <h3 className="mt-1 text-base font-semibold text-zinc-100">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.company}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
              </article>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

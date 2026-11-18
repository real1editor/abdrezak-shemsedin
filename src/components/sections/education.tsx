"use client";

import { usePortfolioData } from "@/components/portfolio-context";
import { FadeIn, SectionHeading } from "./shared";

export default function Education() {
  const data = usePortfolioData();

  return (
    <section id="education" aria-labelledby="edu-heading" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <SectionHeading eyebrow="Education" title="Edu" highlight="cation" />
          <div className="relative mt-10 ml-4 border-l border-emerald-400/25 pl-8">
            {data.education.map((item) => (
              <article key={item.title} className="relative pb-12 last:pb-0">
                <div
                  className={`absolute -left-[41px] top-1.5 h-3 w-3 rounded-full border ${
                    item.status === "current"
                      ? "border-emerald-400 bg-emerald-400"
                      : "border-line bg-zinc-900"
                  }`}
                />
                {item.status === "current" && (
                  <div className="absolute -left-[45px] top-0 h-5 w-5 animate-[pulseDot_2.2s_ease-in-out_infinite] rounded-full bg-emerald-400/25" />
                )}
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-base font-semibold text-zinc-100">{item.title}</h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                      item.status === "current"
                        ? "border border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
                        : "border border-line bg-soft text-zinc-500"
                    }`}
                  >
                    {item.status === "current" ? "Current" : item.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-zinc-400">{item.degree}</p>
                <p className="mt-1 text-xs text-zinc-500">{item.period}</p>
                {item.description && (
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">{item.description}</p>
                )}
              </article>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

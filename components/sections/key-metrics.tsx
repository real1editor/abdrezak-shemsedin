"use client";

import { portfolioData } from "@/data/projects";
import { FadeIn } from "./shared";

export default function KeyMetrics() {
  return (
    <section aria-label="Key highlights" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {portfolioData.metrics.map((m, i) => (
            <FadeIn key={m.label} delay={i * 0.06}>
              <div className="card flex flex-col items-center px-4 py-5 text-center">
                <span className="text-2xl font-bold text-zinc-100 sm:text-3xl">{m.value}</span>
                <span className="mt-1 text-xs font-medium text-zinc-400 sm:text-sm">{m.label}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

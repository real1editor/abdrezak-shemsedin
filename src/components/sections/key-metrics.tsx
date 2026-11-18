"use client";

import { usePortfolioData } from "@/components/portfolio-context";
import { FadeIn } from "./shared";

export default function KeyMetrics() {
  const data = usePortfolioData();

  return (
    <section aria-label="Key highlights" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {data.metrics.map((metric, index) => (
            <FadeIn key={metric.label} delay={index * 0.06}>
              <div className="card flex flex-col items-center px-4 py-5 text-center">
                <span className="text-2xl font-bold text-zinc-100 sm:text-3xl">{metric.value}</span>
                <span className="mt-1 text-xs font-medium text-zinc-400 sm:text-sm">{metric.label}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

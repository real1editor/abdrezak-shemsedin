"use client";

import { HelpCircle, ChevronDown } from "lucide-react";
import { usePortfolioData } from "@/components/portfolio-context";
import { FadeIn, SectionHeading } from "./shared";

export default function FAQ() {
  const data = usePortfolioData();

  return (
    <section id="faq" aria-labelledby="faq-heading" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <SectionHeading eyebrow="FAQ" title="Quick " highlight="Answers" />
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {data.faq.map((item, idx) => (
              <details
                key={idx}
                className="card group p-0 transition-colors [&[open]]:border-emerald-400/30"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-sm font-medium text-zinc-100 outline-none [&::-webkit-details-marker]:hidden [&::marker]:hidden">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                    {item.question}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 group-open:rotate-180 group-open:text-emerald-300" aria-hidden="true" />
                </summary>
                <div className="border-t border-line px-6 pb-5 pt-4">
                  <p className="text-sm leading-relaxed text-zinc-400">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

"use client";

import { usePortfolioData } from "@/components/portfolio-context";
import { FadeIn, SectionHeading } from "./shared";

export default function Languages() {
  const data = usePortfolioData();

  return (
    <section id="languages" aria-labelledby="lang-heading" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <SectionHeading
            eyebrow="Multilingual"
            title="Lang"
            highlight="uages"
            description="Five languages across two language families — native fluency in Amharic and Siltigna, professional English, plus Arabic and Gurage."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.languages.map((lang, i) => (
              <FadeIn key={lang.name} delay={i * 0.06}>
                <div className="card group h-full p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-100">{lang.name}</h3>
                      <p className="text-xs text-zinc-500">
                        {lang.native} &bull; {lang.tag}
                      </p>
                    </div>
                    <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                      {lang.level}
                    </span>
                  </div>
                  <div className="mt-5 space-y-3">
                    {[
                      { label: "Reading", value: lang.reading },
                      { label: "Writing", value: lang.writing },
                      { label: "Listening", value: lang.listening },
                      { label: "Speaking", value: lang.speaking },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-400">{label}</span>
                          <span className="text-zinc-500">{value}%</span>
                        </div>
                        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-soft">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 transition-[width] duration-700"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

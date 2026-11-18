"use client";

import { ExternalLink } from "lucide-react";
import { usePortfolioData } from "@/components/portfolio-context";
import { FadeIn, SectionHeading } from "./shared";

export default function SeoPages() {
  const data = usePortfolioData();

  if (data.seoPages.length === 0) return null;

  return (
    <section id="seo-pages" aria-labelledby="seo-heading" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <SectionHeading
            eyebrow="Find me"
            title="Search "
            highlight="Pages"
            description="These focused pages target high-intent searches related to Ethiopian developers, full-stack work, and web development in Ethiopia."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {data.seoPages.map((page, i) => (
              <FadeIn key={page.title} delay={i * 0.08}>
                <div className="card group h-full p-6">
                  <a
                    href={page.href}
                    className="inline-flex items-center gap-2 text-base font-semibold text-zinc-100 transition-colors group-hover:text-emerald-300"
                  >
                    {page.title}
                    <ExternalLink className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-emerald-300" aria-hidden="true" />
                  </a>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{page.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ArrowUpRight, FolderKanban, ShieldCheck } from "lucide-react";
import type { DomainCard } from "@/data/site";
import { FadeIn, SectionHeading } from "./shared";

export default function Domains({ domains }: { domains: DomainCard[] }) {
  return (
    <section id="domains" aria-labelledby="domains-heading" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <SectionHeading
            eyebrow="Six Domains"
            title="Specialized "
            highlight="Portfolios"
            description="Each domain is a complete, standalone portfolio for clients who only need that practice. The master record above stays complete; these are the focused front doors."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map((domain, index) => (
              <FadeIn key={domain.slug} delay={index * 0.06}>
                <Link
                  href={`/${domain.slug}`}
                  className="card group flex h-full flex-col p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                      {String(index + 1).padStart(2, "0")} / {domain.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-300" aria-hidden="true" />
                  </div>

                  <h3 className="mt-4 text-lg font-semibold leading-snug text-zinc-100 transition-colors group-hover:text-emerald-200">
                    {domain.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-emerald-300/80">{domain.tagline}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                    {domain.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 text-[11px] text-zinc-500">
                    <span className="inline-flex items-center gap-1.5">
                      <FolderKanban className="h-3.5 w-3.5 text-zinc-600" aria-hidden="true" />
                      {domain.projectCount}{" "}
                      {domain.projectCount === 1 ? "project" : "projects"}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-zinc-600" aria-hidden="true" />
                      {domain.credentialCount} credentials
                    </span>
                  </div>

                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                    Open {domain.label} portfolio
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

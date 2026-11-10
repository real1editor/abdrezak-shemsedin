"use client";

import { useState } from "react";
import { Eye, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/projects";
import { Skill } from "@/types/portfolio";
import { FadeIn, SectionHeading, TooltipBadge } from "./shared";

export default function Skills() {
  const [unlocked, setUnlocked] = useState(false);

  const renderBadge = (skill: Skill) => <TooltipBadge key={skill.name} skill={skill} />;

  return (
    <section id="skills" aria-labelledby="skills-heading" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <div className="flex flex-wrap items-center gap-3">
            <SectionHeading eyebrow="Stack" title="Tech & " highlight="Skills" />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Core Stack Active
            </span>
          </div>

          <p className="mt-4 text-sm text-zinc-400">Core development stack</p>
          <div className="mt-5 grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-8">
            {portfolioData.skills.primary.map(renderBadge)}
          </div>

          <p className="mt-8 text-sm text-zinc-400">AI / Machine Learning stack</p>
          <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
            {portfolioData.skills.ai.map(renderBadge)}
          </div>

          <p className="mt-8 text-sm text-zinc-400">Python data &amp; analysis stack</p>
          <div className="mt-5 grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {portfolioData.skills.data.map(renderBadge)}
          </div>

          <div className="relative mt-8">
            <div className={`grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-8 ${!unlocked ? "blur-sm select-none" : ""}`}>
              {portfolioData.skills.locked.map(renderBadge)}
            </div>
            {!unlocked && (
              <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-zinc-950/50 backdrop-blur-sm">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-400/10">
                    <Eye className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-semibold text-zinc-100">Want to see my full potential?</p>
                  <button
                    type="button"
                    onClick={() => setUnlocked(true)}
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-300 transition-colors hover:bg-emerald-400/20"
                  >
                    <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                    Show all skills
                  </button>
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

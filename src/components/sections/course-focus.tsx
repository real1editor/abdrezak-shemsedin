"use client";

import { BarChart3, Code2, Cpu, Network, Palette, Wrench } from "lucide-react";
import { usePortfolioData } from "@/components/portfolio-context";
import { FadeIn, SectionHeading } from "./shared";

const icons = [Code2, Cpu, BarChart3, Network, Wrench, Palette];

export default function CourseFocus() {
  const data = usePortfolioData();

  return (
    <section id="focus" aria-labelledby="focus-heading" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <SectionHeading
            eyebrow="Engineering Curriculum"
            title="Course "
            highlight="Focus"
            description="An engineering-first education that keeps me fluent from hardware to high-level software."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.courseFocus.map((item, i) => {
              const Icon = icons[i % icons.length];
              return (
                <FadeIn key={item.title} delay={i * 0.06}>
                  <div className="card group h-full p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300 transition-transform duration-300 group-hover:-translate-y-1">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-zinc-100">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

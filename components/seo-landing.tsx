import Link from "next/link";
import { portfolioData } from "@/data/projects";
import SeoLayout from "@/components/seo-layout";

export type SeoPageContent = {
  title: string;
  eyebrow: string;
  intro: string;
  bullets: string[];
  services: { title: string; description: string }[];
  cta: string;
  route: string;
};

export default function SeoLanding({
  content,
}: {
  content: SeoPageContent;
}) {
  return (
    <SeoLayout>
      <main className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
          {content.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {content.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
          {content.intro}
        </p>

        <section className="mt-10 rounded-2xl border border-white/10 bg-zinc-900/40 p-8">
          <h2 className="text-lg font-semibold text-zinc-100">
            Why {portfolioData.name.split(" ")[0]}?
          </h2>
          <ul className="mt-4 space-y-3">
            {content.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-sm text-zinc-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-zinc-100">Services</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {content.services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="text-sm font-semibold text-zinc-100">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
          <h2 className="text-xl font-bold text-white">{content.cta}</h2>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:real1editor@gmail.com"
              className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400"
            >
              Email me
            </a>
            <Link
              href="/#projects"
              className="rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-zinc-200 transition-colors hover:border-emerald-500/40"
            >
              View work
            </Link>
          </div>
        </section>
      </main>
    </SeoLayout>
  );
}

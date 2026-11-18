import Link from "next/link";
import { ArrowLeft, BadgeCheck, ExternalLink, ShieldCheck } from "lucide-react";
import type { PortfolioView } from "@/data/site";
import PrintButton from "@/components/print-button";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
      {children}
    </h2>
  );
}

export default function ResumeView({ view }: { view: PortfolioView }) {
  const { data, credentials, meta } = view;
  const backHref = meta.isMaster ? "/" : `/${meta.slug}`;

  const skillGroups = [
    { label: meta.skillLabels.primary, items: data.skills.primary },
    { label: meta.skillLabels.ai, items: data.skills.ai },
    { label: meta.skillLabels.data, items: data.skills.data },
    { label: meta.skillLabels.locked, items: data.skills.locked },
  ].filter((group) => group.items.length > 0);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 print:max-w-none print:px-0 print:py-0">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-emerald-300"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to {meta.isMaster ? "portfolio" : `${meta.label} portfolio`}
        </Link>
        <PrintButton />
      </div>

      <div className="rounded-2xl border border-line bg-zinc-900/40 p-8 print:rounded-none print:border-0 print:bg-transparent print:p-0">
        <header className="mb-10 border-b border-line pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">
            {meta.isMaster ? "Master Resume" : `${meta.label} Resume`}
          </p>
          <h1 className="mt-3 text-3xl font-bold text-zinc-100">
            {data.name}
          </h1>
          <p className="mt-1 text-sm text-zinc-400">{data.role}</p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
            <span>{data.location}</span>
            <span aria-hidden="true">&bull;</span>
            <a
              href={`mailto:${data.socials.email}`}
              className="text-emerald-400 hover:underline"
            >
              {data.socials.email}
            </a>
            <span aria-hidden="true">&bull;</span>
            <a
              href={data.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              github.com/real1editor
            </a>
            <span aria-hidden="true">&bull;</span>
            <a
              href={data.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              linkedin.com/in/abdrezak-shemsedin
            </a>
          </div>
        </header>

        <section className="mb-10">
          <SectionTitle>Profile</SectionTitle>
          <div className="mt-4 grid gap-3">
            {data.about.map((paragraph, index) => (
              <p key={index} className="text-sm leading-relaxed text-zinc-300">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <SectionTitle>Skills</SectionTitle>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <h3 className="text-sm font-semibold text-zinc-200">
                  {group.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {group.items.map((item) => item.name).join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <SectionTitle>Tools</SectionTitle>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            {data.tools.map((tool) => tool.name).join(" · ")}
          </p>
        </section>

        <section className="mb-10">
          <SectionTitle>Experience</SectionTitle>
          <div className="mt-4 space-y-6">
            {data.experience.map((item) => (
              <div key={`${item.title}-${item.company}`} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-zinc-100">
                    {item.title}
                  </h3>
                  <span className="text-xs text-zinc-500">{item.period}</span>
                </div>
                <p className="text-sm text-zinc-400">{item.company}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <SectionTitle>Education</SectionTitle>
          <div className="mt-4 space-y-6">
            {data.education.map((item) => (
              <div key={item.title} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-zinc-100">
                    {item.degree}
                  </h3>
                  <span className="text-xs text-zinc-500">{item.period}</span>
                </div>
                <p className="text-sm text-zinc-400">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <SectionTitle>Projects</SectionTitle>
          <div className="mt-4 space-y-5">
            {data.projects.map((project) => (
              <div key={project.title} className="break-inside-avoid">
                <h3 className="text-sm font-semibold text-zinc-100">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                  {project.description}
                </p>
                <p className="mt-2 text-xs text-zinc-500">
                  {project.tags.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle>Credentials</SectionTitle>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-zinc-500">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
            {credentials.length} verified records · {meta.credentialsTitle}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {credentials.map((credential) => {
              const verify =
                credential.verificationUrl &&
                /^https?:\/\//.test(credential.verificationUrl)
                  ? credential.verificationUrl
                  : null;
              return (
                <div
                  key={credential.id}
                  className="break-inside-avoid rounded-xl border border-line bg-soft p-3"
                >
                  <p className="flex items-start gap-2 text-xs font-semibold leading-snug text-zinc-200">
                    <BadgeCheck
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400"
                      aria-hidden="true"
                    />
                    {credential.title}
                  </p>
                  <p className="mt-1 pl-5 text-[11px] text-zinc-500">
                    {credential.issuer} &bull; {credential.issueDate}
                  </p>
                  {verify && (
                    <a
                      href={verify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 pl-5 text-[11px] font-medium text-emerald-300 hover:text-emerald-200 print:hidden"
                    >
                      Verify
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

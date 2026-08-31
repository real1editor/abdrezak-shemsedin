import { portfolioData } from "@/data/projects";
import PrintButton from "@/components/print-button";

export const metadata = {
  title: `Resume — ${portfolioData.name}`,
  description: "Resume of Abdrezak Shemsedin",
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Resume</h1>
          <p className="mt-1 text-sm text-zinc-400">
            {portfolioData.name} — {portfolioData.role}
          </p>
        </div>
        <PrintButton />
      </div>

      <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-8">
        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Profile
          </h2>
          <div className="mt-4 grid gap-4">
            {portfolioData.about.map((paragraph, index) => (
              <p key={index} className="text-sm leading-relaxed text-zinc-300">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-zinc-500">
            <span>{portfolioData.location}</span>
            <span>•</span>
            <a
              href={`mailto:${portfolioData.socials.email}`}
              className="text-emerald-400 hover:underline"
            >
              {portfolioData.socials.email}
            </a>
            <span>•</span>
            <a
              href={portfolioData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              github.com/real1editor
            </a>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Skills
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-zinc-200">Primary Skills</h3>
              <ul className="mt-2 space-y-1 text-sm text-zinc-400">
                {portfolioData.skills.primary.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-200">Additional Skills</h3>
              <ul className="mt-2 space-y-1 text-sm text-zinc-400">
                {portfolioData.skills.locked.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Tools
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {portfolioData.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-zinc-400"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Experience
          </h2>
          <div className="mt-4 space-y-6">
            {portfolioData.experience.map((item) => (
              <div key={item.title}>
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
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Education
          </h2>
          <div className="mt-4 space-y-6">
            {portfolioData.education.map((item) => (
              <div key={item.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-zinc-100">
                    {item.degree}
                  </h3>
                  <span className="text-xs text-zinc-500">{item.period}</span>
                </div>
                <p className="text-sm text-zinc-400">{item.institution}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Projects
          </h2>
          <div className="mt-4 space-y-4">
            {portfolioData.projects.map((project) => (
              <div key={project.title}>
                <h3 className="text-sm font-semibold text-zinc-100">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                  {project.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

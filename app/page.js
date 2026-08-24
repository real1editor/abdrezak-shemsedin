import { ArrowDown, Code2, ExternalLink, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, UpworkIcon } from "@/components/icons";
import { portfolioData } from "@/data/projects";

const socialBuilders = {
  github: (value) => value,
  linkedin: (value) => `https://www.linkedin.com/in/${value}`,
  upwork: (value) => `https://www.upwork.com/freelancers/${value}`,
  email: (value) => `mailto:${value}`,
};

const socialConfig = [
  { key: "github", label: "GitHub", Icon: GithubIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedinIcon },
  { key: "upwork", label: "Upwork", Icon: UpworkIcon },
  { key: "email", label: "Email", Icon: Mail },
];

function buildSocials() {
  return socialConfig.map(({ key, label, Icon }) => ({
    label,
    href: socialBuilders[key](portfolioData.socials[key]),
    Icon,
    external: key !== "email",
  }));
}

function SocialLinks({ socials }) {
  return (
    <div className="flex items-center gap-3">
      {socials.map(({ label, href, Icon, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:text-white"
        >
          <Icon className="h-[18px] w-[18px]" />
        </a>
      ))}
    </div>
  );
}

function Header({ initials }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm font-bold text-white">
            {initials}
          </span>
          <span className="hidden font-medium tracking-tight text-zinc-200 sm:block">
            {portfolioData.name}
          </span>
        </a>
        <nav className="flex items-center gap-6">
          <a
            href="#projects"
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero({ socials }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]"
      />
      <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-36 sm:pt-44">
        <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {portfolioData.availability}
        </span>

        <h1 className="mt-8 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl sm:leading-[1.1]">
          Hi, I&apos;m {portfolioData.name.split(" ")[0]}
        </h1>

        <p className="mt-4 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-xl font-semibold text-transparent sm:text-2xl">
          {portfolioData.role}
        </p>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          {portfolioData.bio}
        </p>

        <p className="mt-5 flex items-center gap-1.5 text-sm text-zinc-500">
          <MapPin className="h-3.5 w-3.5" />
          {portfolioData.location}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-300"
          >
            View Projects
            <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/5"
          >
            Get in Touch
          </a>
        </div>

        <div className="mt-10">
          <SocialLinks socials={socials} />
        </div>
      </div>
    </section>
  );
}

function Projects({ projects }) {
  return (
    <section id="projects" className="scroll-mt-20 border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Portfolio
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Selected Projects
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              A collection of products and platforms I have designed and built,
              from e-commerce to tourism and developer tools.
            </p>
          </div>
          <span className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs font-medium text-zinc-500">
            {projects.length} projects
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-zinc-900/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-zinc-900/70"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition-colors group-hover:border-emerald-500/30 group-hover:text-emerald-400">
                  <Code2 className="h-5 w-5" />
                </span>
                <div className="flex gap-1">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      aria-label={`${project.title} on GitHub`}
                      title="Source code"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <GithubIcon className="h-[18px] w-[18px]" />
                    </a>
                  ) : null}
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      aria-label={`Visit ${project.title}`}
                      title="Live demo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <ExternalLink className="h-[18px] w-[18px]" />
                    </a>
                  ) : null}
                </div>
              </div>

              <h3 className="mt-5 text-lg font-semibold tracking-tight text-zinc-100 transition-colors group-hover:text-white">
                {project.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ socials }) {
  const email = portfolioData.socials.email;
  return (
    <section id="contact" className="scroll-mt-20 border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-28 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
          Contact
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Let&apos;s build something great together.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          I&apos;m currently open to freelance work and full-time
          opportunities. Whether you have a project in mind or just want to
          connect, my inbox is always open.
        </p>
        <div className="mt-9">
          <a
            href={`mailto:${email}`}
            className="inline-flex h-12 items-center gap-2.5 rounded-full bg-white px-7 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-300"
          >
            <Mail className="h-4 w-4" />
            {email}
          </a>
        </div>
        <div className="mt-8 flex justify-center">
          <SocialLinks socials={socials} />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-zinc-600 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {portfolioData.name}. All rights
          reserved.
        </p>
        <p>Built with Next.js &amp; Tailwind CSS</p>
      </div>
    </footer>
  );
}

export default function Home() {
  const socials = buildSocials();
  const initials = portfolioData.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <>
      <Header initials={initials} />
      <main>
        <Hero socials={socials} />
        <Projects projects={portfolioData.projects} />
        <Contact socials={socials} />
      </main>
      <Footer />
    </>
  );
}

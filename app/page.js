"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ArrowDown,
  Code2,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronRight,
  Download,
  ArrowUp,
  Send,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, UpworkIcon } from "@/components/icons";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

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
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-300 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/5 md:hidden"
          >
            <div className="mx-auto max-w-5xl px-6 py-4">
              {links.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3 text-sm text-zinc-300 transition-colors hover:text-white"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4 text-zinc-500" aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function SectionHeading({ label, title, description }) {
  return (
    <div className="mb-10">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
        {label}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function FadeIn({ children, className }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

import React from "react";

function Hero({ socials }) {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]"
      />
      <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-36 sm:pt-44">
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {portfolioData.availability}
        </motion.span>

        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl sm:leading-[1.1]"
        >
          Hi, I&apos;m {portfolioData.name.split(" ")[0]}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-xl font-semibold text-transparent sm:text-2xl"
          aria-label={portfolioData.role}
        >
          {portfolioData.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          {portfolioData.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-5 flex items-center gap-1.5 text-sm text-zinc-500"
        >
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          <address className="not-italic">{portfolioData.location}</address>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-300"
          >
            View Projects
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/5"
          >
            Get in Touch
          </a>
            <a
            href="/resume"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/5"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10"
        >
          <SocialLinks socials={socials} />
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <SectionHeading
            label="About"
            title="A bit about me"
            description="Beyond code, I&apos;m interested in how systems scale, how users behave, and how small details shape big products."
          />
          <div className="grid gap-10 md:grid-cols-2">
            <p className="text-base leading-relaxed text-zinc-300">
              {portfolioData.about}
            </p>
            <p className="text-base leading-relaxed text-zinc-400">
              I&apos;m currently focused on full-stack web and mobile development.
              I like projects that require both technical depth and product sense.
              When I&apos;m not coding, I&apos;m usually reading about system design,
              contributing to open source, or mentoring junior developers.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <SectionHeading
            label="Skills"
            title="What I work with"
            description="A snapshot of the tools, languages, and platforms I use to ship products."
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {portfolioData.skills.map((group) => (
              <div
                key={group.category}
                className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6"
              >
                <h3 className="text-sm font-semibold text-zinc-200">
                  {group.category}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${group.category} skills`}>
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function TimelineItem({ item }) {
  return (
    <article className="relative pl-8 md:pl-12">
      <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full border border-emerald-400/60 bg-zinc-950 md:left-0" aria-hidden="true" />
      <div className="absolute left-[7px] top-6 h-full w-px bg-gradient-to-b from-emerald-500/40 via-white/10 to-transparent md:left-[7px]" aria-hidden="true" />
      <div className="pb-10">
        <time className="text-xs font-medium text-emerald-400" dateTime={item.period}>
          {item.period}
        </time>
        <h3 className="mt-1 text-base font-semibold text-zinc-100">
          {item.title}
        </h3>
        <p className="text-sm text-zinc-400">{item.company}</p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          {item.description}
        </p>
      </div>
    </article>
  );
}

function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <SectionHeading
            label="Experience"
            title="Where I&apos;ve worked"
            description="A mix of full-time, freelance, and hands-on engineering work."
          />
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Work
              </h3>
              <div className="mt-6" role="list" aria-label="Work experience">
                {portfolioData.experience.map((item) => (
                  <TimelineItem key={item.title} item={item} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Education
              </h3>
              <div className="mt-6" role="list" aria-label="Education history">
                {portfolioData.education.map((item) => (
                  <TimelineItem key={item.title} item={item} />
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function TechStack() {
  return (
    <section aria-labelledby="techstack-heading" className="border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <SectionHeading
            label="Tech Stack"
            title="Tools I use"
            description="Technologies I reach for depending on the problem."
          />
          <div className="flex flex-wrap gap-3" role="list" aria-label="Technologies">
            {portfolioData.techStack.map((tool) => (
              <span
                key={tool}
                role="listitem"
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-emerald-500/30 hover:text-white"
              >
                {tool}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <SectionHeading
            label="Testimonials"
            title="Kind words from people I&apos;ve worked with"
          />
          <div className="grid gap-5 md:grid-cols-3" role="list" aria-label="Testimonials">
            {portfolioData.testimonials.map((item) => (
              <blockquote
                key={item.author}
                role="listitem"
                className="flex flex-col rounded-2xl border border-white/10 bg-zinc-900/40 p-6"
              >
                <p className="text-sm leading-relaxed text-zinc-300">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-6">
                  <p className="text-sm font-semibold text-zinc-100">
                    {item.author}
                  </p>
                  <p className="text-xs text-zinc-500">{item.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ProjectFilter({ projects, activeFilter, onFilterChange }) {
  const allTags = useMemo(() => {
    const tags = new Set();
    projects.forEach((project) => project.tags.forEach((tag) => tags.add(tag)));
    return ["All", ...Array.from(tags)];
  }, [projects]);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.tags.includes(activeFilter));

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => onFilterChange(tag)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeFilter === tag
                ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
                : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {filteredProjects.map((project) => (
          <motion.article
            layout
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
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function Projects({ projects }) {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-20 border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Portfolio
            </p>
            <h2 id="projects-heading" className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
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

        <ProjectFilter
          projects={projects}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>
    </section>
  );
}

function Contact({ socials }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20 border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-28 text-center">
        <SectionHeading
          label="Contact"
          title="Let&apos;s build something great together."
          description="I&apos;m currently open to freelance work and full-time opportunities. Whether you have a project in mind or just want to connect, my inbox is always open."
        />
        <div className="mx-auto mt-10 max-w-xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300"
              role="status"
              aria-live="polite"
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Thanks! This form is a demo. Use the email button below to reach me.
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid gap-4 text-left"
              aria-label="Contact form"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1 block text-xs font-medium text-zinc-400">
                    Name
                  </label>
                  <input
                    id="name"
                    required
                    className="w-full rounded-xl border border-white/10 bg-zinc-900/40 px-4 py-3 text-sm text-zinc-100 outline-none transition-colors focus:border-emerald-400/40"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-xs font-medium text-zinc-400">
                    Email
                  </label>
                  <input
                    id="email"
                    required
                    type="email"
                    className="w-full rounded-xl border border-white/10 bg-zinc-900/40 px-4 py-3 text-sm text-zinc-100 outline-none transition-colors focus:border-emerald-400/40"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block text-xs font-medium text-zinc-400">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full rounded-xl border border-white/10 bg-zinc-900/40 px-4 py-3 text-sm text-zinc-100 outline-none transition-colors focus:border-emerald-400/40"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-300 sm:w-auto"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                Send Message
              </button>
            </form>
          )}
          <div className="mt-8">
            <a
              href={`mailto:${portfolioData.socials.email}`}
              className="inline-flex h-12 items-center gap-2.5 rounded-full bg-white px-7 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-300"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {portfolioData.socials.email}
            </a>
          </div>
          <address className="mt-8 flex not-italic justify-center">
            <SocialLinks socials={socials} />
          </address>
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
      </div>
    </footer>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          href="#top"
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-zinc-900/80 text-zinc-300 backdrop-blur transition-colors hover:border-emerald-400/40 hover:text-white"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const socials = buildSocials();
  const initials = portfolioData.initials || portfolioData.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-zinc-900">
        Skip to main content
      </a>
      <Header initials={initials} />
      <main id="main-content">
        <Hero socials={socials} />
        <About />
        <Skills />
        <Experience />
        <TechStack />
        <Testimonials />
        <Projects projects={portfolioData.projects} />
        <Contact socials={socials} />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

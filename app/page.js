"use client";

import { useState, useEffect, useMemo } from "react";
import {
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
  Phone,
  ChevronDown,
  HelpCircle,
  Copy,
  Check,
  Lock,
  Eye,
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  UpworkIcon,
  TelegramIcon,
  FacebookIcon,
  InstagramIcon,
  XIcon,
  TiktokIcon,
} from "@/components/icons";
import { motion, useInView, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/projects";

import React from "react";

const socialBuilders = {
  github: (v) => v,
  linkedin: (v) => (v.startsWith("http") ? v : `https://www.linkedin.com/in/${v}`),
  upwork: (v) => (v.startsWith("http") ? v : `https://www.upwork.com/freelancers/${v}`),
  email: (v) => `mailto:${v}`,
  telegram: (v) => (v.startsWith("http") ? v : `https://t.me/${v}`),
  phone: (v) => (v.startsWith("tel:") ? v : `tel:${v}`),
};

const socialConfig = [
  { key: "github", label: "GitHub", Icon: GithubIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedinIcon },
  { key: "telegram", label: "Telegram", Icon: TelegramIcon },
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

function SocialLinks({ socials, size = "md" }) {
  const s = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const i = size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]";
  return (
    <div className="flex items-center gap-3">
      {socials.map(({ label, href, Icon, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={`inline-flex ${s} items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:text-white`}
        >
          <Icon className={i} />
        </a>
      ))}
    </div>
  );
}

function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="ml-auto shrink-0 rounded-lg border border-white/10 bg-white/[0.03] p-2 text-zinc-500 transition-colors hover:border-emerald-400/40 hover:text-emerald-400"
      title={`Copy ${label}`}
      aria-label={`Copy ${label}`}
    >
      {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

function Header({ initials }) {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#seo-pages", label: "Pages" },
    { href: "#skills", label: "Skills" },
    { href: "#languages", label: "Languages" },
    { href: "#education", label: "Education" },
    { href: "#certifications", label: "Certs" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-emerald-500 to-teal-400"
      />
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a href="#home" className="flex items-center gap-3">
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
          <a
            href={portfolioData.resumeUrl}
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
          >
            <Download className="h-3.5 w-3.5" />
            Resume
          </a>
        </nav>
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-300 md:hidden"
          onClick={() => setOpen((p) => !p)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
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
                  <ChevronRight className="h-4 w-4 text-zinc-500" />
                </a>
              ))}
              <a
                href={portfolioData.resumeUrl}
                className="mt-2 flex items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-400"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function FadeIn({ children, className, delay = 0 }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Hero({ socials }) {
  return (
    <section id="home" aria-labelledby="hero-heading" className="relative border-b border-white/5">
      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="relative flex flex-col overflow-hidden rounded-3xl border border-[#382d25] shadow-[0_16px_40px_rgba(22,19,17,0.4)]"
          style={{
            background:
              "radial-gradient(circle at 85% 15%, rgba(201,152,119,0.22), transparent 45%), radial-gradient(circle at 8% 85%, rgba(109,125,99,0.14), transparent 40%), linear-gradient(135deg, #181412 0%, #201915 55%, #2a1e16 100%)",
          }}
        >
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="z-10 flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-[#c99877]/30 bg-white/8 px-4 py-1.5 text-xs font-medium text-[#f7e8da]"
              >
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#52b788] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#52b788]" />
                </span>
                {portfolioData.availability} &bull; Based in Ethiopia
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-xs font-bold uppercase tracking-[0.2em] text-[#e2b18e]"
              >
                {portfolioData.role}
              </motion.p>

              <motion.h1
                id="hero-heading"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-3 text-5xl font-extrabold leading-[0.95] tracking-tight text-[#f3ece5] sm:text-6xl lg:text-7xl"
              >
                {portfolioData.name.split(" ")[0]}
                <br />
                <span className="text-[#e2b18e]">{portfolioData.name.split(" ").slice(1).join(" ")}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-5 max-w-xl text-base leading-relaxed text-[#d0c1b2] sm:text-lg"
              >
                I am a <span className="font-bold text-[#e2b18e]">5th-year Electrical &amp; Computer Engineering student</span> at{" "}
                <span className="font-bold text-[#e2b18e]">Wolaita Sodo University</span> — building high-performance web apps, mobile apps, and digital platforms for local and global users.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-5 flex items-center gap-1.5 text-sm text-[#c99877]"
              >
                <MapPin className="h-4 w-4" />
                <address className="not-italic">{portfolioData.location}</address>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#projects"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[#e2b18e] px-6 text-sm font-semibold text-[#161311] shadow-[0_6px_18px_rgba(201,152,119,0.28)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#d9ab8b]"
                >
                  <Code2 className="h-4 w-4" />
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/6 px-6 text-sm font-semibold text-[#f3ece5] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#f3ece5] hover:bg-white/15"
                >
                  <Send className="h-4 w-4" />
                  Get in Touch
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8"
              >
                <SocialLinks socials={socials} />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="relative order-first lg:order-none"
            >
              <div className="relative h-72 w-full overflow-hidden sm:h-96 lg:h-full lg:min-h-[590px]">
                <img
                  src={portfolioData.profilePhoto}
                  alt={`Portrait of ${portfolioData.name}`}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  style={{ objectPosition: "60% center", filter: "contrast(1.03) saturate(0.96)" }}
                  fetchpriority="high"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(24,20,18,0) 45%, rgba(24,20,18,0.55) 100%), linear-gradient(75deg, rgba(24,20,18,0.35), transparent 30%)",
                  }}
                />
              </div>
              <div className="absolute bottom-5 left-5 flex animate-[floatBadge_4s_ease-in-out_infinite] items-center gap-3 rounded-xl border border-[#c99877]/35 bg-[#131010]/85 px-4 py-2.5 backdrop-blur-md">
                <Code2 className="h-6 w-6 text-[#e2b18e]" />
                <div>
                  <p className="text-sm font-semibold text-[#f3ece5]">{portfolioData.heroBadge.title}</p>
                  <p className="text-xs text-[#c99877]">{portfolioData.heroBadge.subtitle}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function KeyMetrics() {
  return (
    <section aria-label="Key highlights" className="border-b border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {portfolioData.metrics.map((m) => (
            <div key={m.label} className="flex flex-col items-center rounded-2xl border border-white/10 bg-zinc-900/40 px-4 py-5 text-center transition-colors hover:border-emerald-500/30">
              <span className="text-2xl font-bold text-zinc-100 sm:text-3xl">{m.value}</span>
              <span className="mt-1 text-xs font-medium text-zinc-400 sm:text-sm">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-b border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <h2 id="about-heading" className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            About <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="mt-8 space-y-4">
            {portfolioData.about.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-zinc-400">
                {i === 0 ? (
                  <>
                    I am a full-stack developer and 5th-year{" "}
                    <span className="text-emerald-400">Electrical and Computer Engineering</span>{" "}
                    student at <span className="text-emerald-400">Wolaita Sodo University</span>, based in Addis Ababa, Ethiopia.
                  </>
                ) : (
                  p
                )}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function WhatIBuild() {
  return (
    <section aria-labelledby="build-heading" className="border-b border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <h2 id="build-heading" className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            What I <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Build</span>
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {portfolioData.whatIBuild.map((item) => (
              <div key={item.title} className="group rounded-2xl border border-white/10 bg-zinc-900/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/30">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <Code2 className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-zinc-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function SeoPages() {
  return (
    <section id="seo-pages" aria-labelledby="seo-heading" className="border-b border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <h2 id="seo-heading" className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Search <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Pages</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            These focused pages target high-intent searches related to Ethiopian developers, full-stack work, and web development in Ethiopia.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {portfolioData.seoPages.map((page) => (
              <div key={page.title} className="group rounded-2xl border border-white/10 bg-zinc-900/40 p-6 transition duration-300 hover:border-emerald-500/30">
                <a href={page.href} className="inline-flex items-center gap-2 text-base font-semibold text-zinc-100 transition-colors group-hover:text-emerald-400">
                  {page.title}
                  <ExternalLink className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-emerald-400" />
                </a>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{page.description}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Languages() {
  return (
    <section id="languages" aria-labelledby="lang-heading" className="border-b border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <h2 id="lang-heading" className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Lang<span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">uages</span>
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {portfolioData.languages.map((lang) => (
              <div key={lang.name} className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 transition-colors hover:border-emerald-500/30">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-zinc-100">{lang.name}</h3>
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">{lang.level}</span>
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    { label: "Reading", value: lang.reading },
                    { label: "Writing", value: lang.writing ?? 0 },
                    { label: "Listening", value: lang.listening },
                    { label: "Speaking", value: lang.speaking },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-400">{label}</span>
                        <span className="text-zinc-500">{value}%</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                        <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Skills() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <section id="skills" aria-labelledby="skills-heading" className="border-b border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <div className="flex items-center gap-3">
            <h2 id="skills-heading" className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              Ski<span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">lls</span>
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              Core Stack Active
            </span>
          </div>

          <div className="mt-10 grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-8">
            {portfolioData.skills.primary.map((skill) => (
              <div key={skill.name} className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-4 text-center transition-colors hover:border-emerald-500/30">
                <img src={`https://cdn.simpleicons.org/${skill.slug}`} alt={`${skill.name} logo`} className="h-6 w-6" loading="lazy" />
                <span className="text-[11px] font-medium text-zinc-400">{skill.name}</span>
              </div>
            ))}
          </div>

          <div className="relative mt-6">
            <div className={`grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-8 ${!unlocked ? "blur-sm select-none" : ""}`}>
              {portfolioData.skills.locked.map((skill) => (
                <div key={skill.name} className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-4 text-center transition-colors hover:border-emerald-500/30">
                  <img src={`https://cdn.simpleicons.org/${skill.slug}`} alt={`${skill.name} logo`} className="h-6 w-6" loading="lazy" />
                  <span className="text-[11px] font-medium text-zinc-400">{skill.name}</span>
                </div>
              ))}
            </div>
            {!unlocked && (
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-zinc-950/60 backdrop-blur-sm">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10">
                    <Lock className="h-5 w-5 text-emerald-400" />
                  </div>
                  <p className="text-sm font-semibold text-zinc-100">Want to see my full potential?</p>
                  <button
                    onClick={() => setUnlocked(true)}
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
                  >
                    <Eye className="h-3.5 w-3.5" />
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

function Tools() {
  return (
    <section id="tools" aria-labelledby="tools-heading" className="border-b border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <h2 id="tools-heading" className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Too<span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">ls</span>
          </h2>
          <div className="mt-10 grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-8">
            {portfolioData.tools.map((tool) => (
              <div key={tool.name} className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-4 text-center transition-colors hover:border-emerald-500/30">
                <img src={`https://cdn.simpleicons.org/${tool.slug}`} alt={`${tool.name} logo`} className="h-6 w-6" loading="lazy" />
                <span className="text-[11px] font-medium text-zinc-400">{tool.name}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" aria-labelledby="edu-heading" className="border-b border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <h2 id="edu-heading" className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Edu<span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">cation</span>
          </h2>
          <div className="relative mt-10 ml-4 border-l border-emerald-500/20 pl-8">
            {portfolioData.education.map((item) => (
              <article key={item.title} className="relative pb-12 last:pb-0">
                <div className={`absolute -left-[41px] top-1.5 h-3 w-3 rounded-full border ${item.status === "current" ? "border-emerald-400 bg-emerald-500" : "border-white/20 bg-zinc-950"}`} />
                {item.status === "current" && (
                  <div className="absolute -left-[45px] top-0 h-5 w-5 animate-ping rounded-full bg-emerald-500/20" />
                )}
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-semibold text-zinc-100">{item.title}</h3>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${item.status === "current" ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border border-white/10 bg-white/[0.03] text-zinc-500"}`}>
                    {item.status === "current" ? "Current" : item.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-zinc-400">{item.degree}</p>
                {item.description && (
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">{item.description}</p>
                )}
              </article>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-heading" className="border-b border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <h2 id="exp-heading" className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Expe<span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">rience</span>
          </h2>
          <div className="relative mt-10 ml-4 border-l border-emerald-500/20 pl-8">
            {portfolioData.experience.map((item) => (
              <article key={item.title} className="relative pb-12 last:pb-0">
                <div className="absolute -left-[41px] top-1.5 h-3 w-3 rounded-full border border-emerald-400/60 bg-zinc-950" />
                <div className="absolute left-[7px] top-6 h-full w-px bg-gradient-to-b from-emerald-500/40 via-white/10 to-transparent" />
                <time className="text-xs font-medium text-emerald-400">{item.period}</time>
                <h3 className="mt-1 text-base font-semibold text-zinc-100">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.company}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
              </article>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = useMemo(() => {
    const counts = { all: portfolioData.projects.length };
    portfolioData.projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return [
      { key: "all", label: "All", icon: Code2, count: counts.all },
      { key: "web", label: "Web & APIs", icon: ExternalLink, count: counts.web || 0 },
      { key: "mobile", label: "Systems & Mobile", icon: Phone, count: counts.mobile || 0 },
    ];
  }, []);

  const filtered = activeFilter === "all" ? portfolioData.projects : portfolioData.projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" aria-labelledby="proj-heading" className="scroll-mt-20 border-b border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <h2 id="proj-heading" className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Pro<span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">jects</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            These projects show the type of work I do across web apps, mobile, e-commerce, and developer tools.
          </p>

          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveFilter(cat.key)}
                  role="tab"
                  aria-selected={activeFilter === cat.key}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    activeFilter === cat.key
                      ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
                      : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.label}
                  <span className="text-zinc-500">({cat.count})</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {filtered.map((project) => (
              <motion.article
                layout
                key={project.title}
                className="group flex flex-col rounded-2xl border border-white/10 bg-zinc-900/40 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-zinc-900/70"
              >
                <div className="relative h-44 overflow-hidden rounded-t-2xl bg-zinc-800/50">
                  <img
                    src={project.thumb}
                    alt={`${project.title} preview`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-zinc-100 transition-colors group-hover:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-zinc-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-emerald-400/40 hover:text-white">
                        <GithubIcon className="h-3.5 w-3.5" />
                        Source Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live View
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Certifications() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <section id="certifications" aria-labelledby="cert-heading" className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <FadeIn>
            <h2 id="cert-heading" className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              Certifi<span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">cations</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">Here are some certificates I earned from different programs and companies.</p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {portfolioData.certifications.map((cert) => (
                <button
                  key={cert.title}
                  onClick={() => setLightbox(cert)}
                  className="group text-left rounded-2xl border border-white/10 bg-zinc-900/40 overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-emerald-500/30"
                >
                  <div className="relative h-40 overflow-hidden bg-zinc-800/50">
                    <img src={cert.imageUrl} alt={`${cert.title} certificate`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-zinc-100">{cert.title}</h3>
                    <p className="mt-1 text-xs text-zinc-500">{cert.issuer} &bull; {cert.date}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-zinc-500 transition-colors group-hover:text-emerald-400">
                      Click to expand <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[85vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-zinc-900 text-zinc-300 hover:text-white"
                aria-label="Close preview"
              >
                <X className="h-4 w-4" />
              </button>
              <img src={lightbox.imageUrl} alt={lightbox.title} className="max-h-[80vh] rounded-2xl border border-white/10 object-contain" />
              <div className="mt-3 text-center">
                <p className="text-sm font-medium text-zinc-100">{lightbox.title}</p>
                <p className="text-xs text-zinc-500">{lightbox.issuer}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="border-b border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <h2 id="faq-heading" className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Quick <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Answers</span>
          </h2>
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {portfolioData.faq.map((item, idx) => (
              <details
                key={idx}
                className="group rounded-2xl border border-white/10 bg-zinc-900/40 transition-colors hover:border-white/15 [&[open]]:border-emerald-500/30"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-sm font-medium text-zinc-100 outline-none [&::-webkit-details-marker]:hidden [&::marker]:hidden">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-4 w-4 shrink-0 text-emerald-400" />
                    {item.question}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 group-open:rotate-180 group-open:text-emerald-400" />
                </summary>
                <div className="border-t border-white/5 px-6 pb-5 pt-4">
                  <p className="text-sm leading-relaxed text-zinc-400">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactItems = [
    { icon: Mail, label: "Email", value: portfolioData.socials.email, href: `mailto:${portfolioData.socials.email}`, copy: portfolioData.socials.email },
    { icon: Phone, label: "Phone", value: "+251 900 000 000", href: portfolioData.socials.phone, copy: "+251900000000" },
    { icon: GithubIcon, label: "GitHub", value: "real1editor", href: portfolioData.socials.github, copy: portfolioData.socials.github },
    { icon: LinkedinIcon, label: "LinkedIn", value: "abdrezak-shemsedin", href: portfolioData.socials.linkedin, copy: portfolioData.socials.linkedin },
    { icon: TelegramIcon, label: "Telegram", value: "@real1editor", href: portfolioData.socials.telegram, copy: "@real1editor" },
    { icon: UpworkIcon, label: "Upwork", value: "abdrezak", href: portfolioData.socials.upwork, copy: portfolioData.socials.upwork },
    { icon: FacebookIcon, label: "Facebook", value: "real1editor", href: portfolioData.socials.facebook, copy: portfolioData.socials.facebook },
    { icon: InstagramIcon, label: "Instagram", value: "@real1editor", href: portfolioData.socials.instagram, copy: "@real1editor" },
    { icon: TiktokIcon, label: "TikTok", value: "@real1editor", href: portfolioData.socials.tiktok, copy: "@real1editor" },
    { icon: XIcon, label: "X", value: "@real1editor", href: portfolioData.socials.x, copy: "@real1editor" },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20 border-b border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-28">
        <FadeIn>
          <h2 id="contact-heading" className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Con<span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">tact</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Let&apos;s connect &mdash; reach out on any platform below, send a quick message, or click to copy my details.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {contactItems.map(({ icon: Icon, label, value, href, copy }) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/40 p-4 transition duration-300 hover:border-emerald-500/30">
                <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-100">{label}</p>
                    <p className="truncate text-xs text-zinc-500">{value}</p>
                  </div>
                </a>
                <CopyButton text={copy} label={label} />
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-xl">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
                <Send className="h-4 w-4 text-emerald-400" />
                Send a Quick Message
              </h3>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Thanks! Use the email button to reach me directly.
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-4 grid gap-4" aria-label="Contact form">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1 block text-xs font-medium text-zinc-400">Your Name</label>
                      <input id="name" required className="w-full rounded-xl border border-white/10 bg-zinc-900/40 px-4 py-3 text-sm text-zinc-100 outline-none transition-colors focus:border-emerald-400/40" placeholder="John Doe" autoComplete="name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1 block text-xs font-medium text-zinc-400">Your Email / Telegram</label>
                      <input id="email" required className="w-full rounded-xl border border-white/10 bg-zinc-900/40 px-4 py-3 text-sm text-zinc-100 outline-none transition-colors focus:border-emerald-400/40" placeholder="you@example.com or @username" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1 block text-xs font-medium text-zinc-400">Message</label>
                    <textarea id="message" required rows={3} className="w-full rounded-xl border border-white/10 bg-zinc-900/40 px-4 py-3 text-sm text-zinc-100 outline-none transition-colors focus:border-emerald-400/40" placeholder="Hi Abdrezak, let&apos;s discuss a project..." />
                  </div>
                  <button type="submit" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-300 sm:w-auto">
                    <Send className="h-4 w-4" />
                    Send via Telegram / Email
                  </button>
                </form>
              )}
            </div>

            <div className="mt-8 text-center">
              <a
                href={`mailto:${portfolioData.socials.email}`}
                className="inline-flex h-12 items-center gap-2.5 rounded-full bg-white px-7 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-300"
              >
                <Mail className="h-4 w-4" />
                {portfolioData.socials.email}
              </a>
            </div>
            <address className="mt-6 flex not-italic justify-center">
              <SocialLinks socials={buildSocials()} size="sm" />
            </address>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 py-8 text-center text-xs text-zinc-600">
        <p>&copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
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
          href="#home"
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
    .map((p) => p[0])
    .join("");

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-zinc-900">
        Skip to main content
      </a>
      <Header initials={initials} />
      <main id="main-content">
        <Hero socials={socials} />
        <KeyMetrics />
        <About />
        <WhatIBuild />
        <SeoPages />
        <Languages />
        <Skills />
        <Tools />
        <Education />
        <Experience />
        <Projects />
        <Certifications />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

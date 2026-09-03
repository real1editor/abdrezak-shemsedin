"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import {
  Code2,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronRight,
  Download,
  Send,
  CheckCircle2,
  Phone,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Copy,
  Check,
  Eye,
  Sun,
  Moon,
  Cpu,
  BarChart3,
  Layers,
  ArrowRight,
  Sparkles,
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
import TypewriterRole from "@/components/type-writer";
import IsoLogo from "@/components/iso-logo";
import { motion, useInView, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/projects";

import React from "react";

/* ==========================================================================
   Shared helpers & primitives
   ========================================================================== */

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

function SocialLinks({ size = "md" }) {
  const s = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const i = size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]";
  return (
    <div className="flex items-center gap-3">
      {socialConfig.map(({ key, label, Icon }) => {
        const href = socialBuilders[key](portfolioData.socials[key]);
        const external = key !== "email";
        return (
          <a
            key={label}
            href={href}
            aria-label={label}
            title={label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`inline-flex ${s} items-center justify-center rounded-full border border-line bg-soft text-zinc-400 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/50 hover:text-zinc-100 hover:shadow-[0_8px_20px_-8px_rgba(197,168,128,0.5)]`}
          >
            <Icon className={i} />
          </a>
        );
      })}
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
      className="ml-auto shrink-0 rounded-lg border border-line bg-soft p-2 text-zinc-500 transition-colors hover:border-emerald-400/50 hover:text-emerald-400"
      title={`Copy ${label}`}
      aria-label={`Copy ${label}`}
    >
      {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.getAttribute("data-theme") || "dark";
  });
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-soft text-zinc-300 transition-colors hover:text-emerald-400"
    >
      {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  );
}

function SectionHeading({ eyebrow, title, highlight, description }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">
          <span className="h-px w-6 bg-emerald-400/60" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
        {title}<span className="editorial-gradient">{highlight}</span>
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">{description}</p>
      )}
    </div>
  );
}

/* ==========================================================================
   Header
   ========================================================================== */
function Header() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const links = [
    { href: "#about", label: "About" },
    { href: "#focus", label: "Course Focus" },
    { href: "#languages", label: "Languages" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#certifications", label: "Certs" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-zinc-950/75 backdrop-blur-md">
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-emerald-500 via-emerald-300 to-teal-300"
      />
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a href="#home" className="flex items-center" aria-label="Go to home">
          <IsoLogo />
        </a>
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-400 transition-colors hover:text-emerald-300"
            >
              {item.label}
            </a>
          ))}
          <a
            href={portfolioData.resumeUrl}
            className="group inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1.5 text-xs font-medium text-emerald-300 transition-all hover:bg-emerald-400/20 hover:shadow-[0_8px_20px_-8px_rgba(197,168,128,0.6)]"
          >
            <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            Resume
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-zinc-300 md:hidden"
            onClick={() => setOpen((p) => !p)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <div className="mx-auto max-w-5xl px-6 py-4">
              {links.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3 text-sm text-zinc-300 transition-colors hover:text-emerald-300"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4 text-zinc-500" />
                </a>
              ))}
              <a
                href={portfolioData.resumeUrl}
                className="mt-2 flex items-center justify-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-300"
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

/* ==========================================================================
   Section reveal primitive
   ========================================================================== */
function FadeIn({ children, className, delay = 0, y = 28 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================================================
   HERO — asymmetric grid, live status pill, warm typography, 4:5 portrait
   ========================================================================== */
function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="relative border-b border-line overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-4 sm:px-6 sm:pt-16">
        <div className="relative rounded-[2rem] p-[1px] bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.08),transparent_70%)]">
        <div
          className="card relative grid overflow-hidden glow-warm lg:grid-cols-[1.1fr_0.9fr]"
          style={{
            background:
              "radial-gradient(circle at 88% 12%, rgba(197,168,128,0.28), transparent 48%), radial-gradient(circle at 4% 96%, rgba(180,110,70,0.16), transparent 42%), linear-gradient(135deg, #181512 0%, #1e1712 55%, #241b13 100%)",
            borderRadius: "2rem",
          }}
        >
          {/* Left column */}
          <div className="z-10 flex flex-col justify-center px-6 py-14 sm:px-12 lg:px-14">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-medium text-[#f3ece5] shadow-[0_8px_24px_-12px_rgba(197,168,128,0.5)]"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-[pulseDot_2.2s_ease-in-out_infinite] rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {portfolioData.availability} &bull; Based in Ethiopia
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-3 text-5xl font-extrabold leading-[0.98] tracking-tight text-[#f3ece5] sm:text-6xl lg:text-6xl"
            >
              {portfolioData.firstName}
              <br />
              <span className="editorial-gradient">{portfolioData.lastName}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.14 }}
              className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1"
            >
              <span className="text-base font-bold text-[#d4c5b9] sm:text-lg">
                Ethiopian Developer
              </span>
              <span className="text-base font-extrabold text-[#c5a880]" aria-hidden="true">&middot;</span>
              <TypewriterRole />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-4 text-sm font-medium text-[#d4c5b9] sm:text-base"
            >
              I&apos;m a Computer Engineering GC Student @ WSU, Full-Stack Developer &amp; Future AI Systems Engineer. Architecting high-performance web applications, scalable Supabase systems, and production-ready Python pipelines for modern digital products. This portfolio showcases my work as an Ethiopian engineer dedicated to building efficient, high-impact software for local and global users.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-5 flex items-center gap-1.5 text-sm text-[#c5a880]"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <address className="not-italic">{portfolioData.location}</address>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 to-emerald-400 px-7 text-sm font-semibold text-[#161311] shadow-[0_10px_30px_-10px_rgba(197,168,128,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Code2 className="h-4 w-4" aria-hidden="true" />
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 text-sm font-semibold text-[#f3ece5] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-white/10"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                Get in Touch
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-9"
            >
              <SocialLinks />
            </motion.div>
          </div>

          {/* Right column — environmental portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative order-first lg:order-none"
          >
            <div className="relative h-80 w-full overflow-hidden sm:h-96 lg:h-full lg:min-h-[600px]">
              <Image
                src={portfolioData.profilePhoto}
                alt={`Environmental portrait of ${portfolioData.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                style={{
                  objectPosition: "60% center",
                  filter: "contrast(1.05) saturate(0.98) sepia(0.06)",
                }}
              />
              {/* Multi-layer ambient shadow + warm directional light cues */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(24,21,18,0) 42%, rgba(24,21,18,0.6) 100%), linear-gradient(72deg, rgba(24,21,18,0.4), transparent 32%), radial-gradient(circle at 30% 8%, rgba(224,180,130,0.22), transparent 45%), radial-gradient(circle at 60% 30%, rgba(197,168,128,0.18), transparent 55%)",
                  }}
                />
            </div>
            <div className="absolute bottom-5 left-5 flex animate-[floatBadge_4.5s_ease-in-out_infinite] items-center gap-3 rounded-2xl border border-emerald-400/35 bg-[#151210]/90 px-4 py-2.5 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur-md">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
                <Code2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#f3ece5]">{portfolioData.heroBadge.title}</p>
                <p className="text-xs text-[#c5a880]">{portfolioData.heroBadge.subtitle}</p>
              </div>
            </div>
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Key metrics
   ========================================================================== */
function KeyMetrics() {
  return (
    <section aria-label="Key highlights" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {portfolioData.metrics.map((m, i) => (
            <FadeIn key={m.label} delay={i * 0.06}>
              <div className="card flex flex-col items-center px-4 py-5 text-center">
                <span className="text-2xl font-bold text-zinc-100 sm:text-3xl">{m.value}</span>
                <span className="mt-1 text-xs font-medium text-zinc-400 sm:text-sm">{m.label}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   About
   ========================================================================== */
function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <FadeIn>
          <SectionHeading eyebrow="Profile" title="About " highlight="Me" />
          <div className="mt-6 max-w-3xl space-y-3">
            {portfolioData.about.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-zinc-400">
                {p}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ==========================================================================
   What I Build
   ========================================================================== */
function WhatIBuild() {
  const icons = [Code2, BarChart3, Layers];
  return (
    <section id="build" aria-labelledby="build-heading" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <SectionHeading eyebrow="Disciplines" title="What I " highlight="Build" />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {portfolioData.whatIBuild.map((item, i) => {
              const Icon = icons[i % icons.length];
              return (
                <FadeIn key={item.title} delay={i * 0.08}>
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

/* ==========================================================================
   Course focus (engineering-driven)
   ========================================================================== */
function CourseFocus() {
  const icons = [Cpu, Code2, BarChart3];
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
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {portfolioData.courseFocus.map((item, i) => {
              const Icon = icons[i % icons.length];
              return (
                <FadeIn key={item.title} delay={i * 0.08}>
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

/* ==========================================================================
   Search / SEO landing pages
   ========================================================================== */
function SeoPages() {
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
            {portfolioData.seoPages.map((page, i) => (
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

/* ==========================================================================
   Languages — granular fluency with native scripts
   ========================================================================== */
function Languages() {
  return (
    <section id="languages" aria-labelledby="lang-heading" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <SectionHeading
            eyebrow="Multilingual"
            title="Lang"
            highlight="uages"
            description="Five languages across two language families — native fluency in Amharic and Siltigna, professional English, plus Arabic and Gurage."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioData.languages.map((lang, i) => (
              <FadeIn key={lang.name} delay={i * 0.06}>
                <div className="card group h-full p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-100">{lang.name}</h3>
                      <p className="text-xs text-zinc-500">
                        {lang.native} &bull; {lang.tag}
                      </p>
                    </div>
                    <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                      {lang.level}
                    </span>
                  </div>
                  <div className="mt-5 space-y-3">
                    {[
                      { label: "Reading", value: lang.reading },
                      { label: "Writing", value: lang.writing },
                      { label: "Listening", value: lang.listening },
                      { label: "Speaking", value: lang.speaking },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-400">{label}</span>
                          <span className="text-zinc-500">{value}%</span>
                        </div>
                        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-soft">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 transition-[width] duration-700"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ==========================================================================
   Tooltip wrapper for skill/tool badges
   ========================================================================== */
function TooltipBadge({ skill }) {
  const [show, setShow] = useState(false);
  const level = skill.level;
  return (
    <div
      className="group/badge relative flex flex-col items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      <div className="card flex w-full flex-col items-center gap-2 px-3 py-4 text-center cursor-default">
        <Image
          src={skill.icon ?? `https://cdn.simpleicons.org/${skill.slug}/c5a880`}
          alt={`${skill.name} logo`}
          width={26}
          height={26}
          loading="lazy"
          unoptimized
          className="brand-logo"
        />
        <span className="text-[11px] font-medium text-zinc-300">{skill.name}</span>
      </div>
      <AnimatePresence>
        {show && level != null && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            role="tooltip"
            className="pointer-events-none absolute -top-9 z-20 whitespace-nowrap rounded-lg border border-emerald-400/30 bg-[#151210] px-2.5 py-1 text-[11px] font-semibold text-emerald-200 shadow-lg"
          >
            {skill.name} &middot; {level}%
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ==========================================================================
   Skills (core + data + unlock)
   ========================================================================== */
function Skills() {
  const [unlocked, setUnlocked] = useState(false);

  const renderBadge = (skill) => <TooltipBadge key={skill.name} skill={skill} />;

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

/* ==========================================================================
   Tools — interactive tooltips
   ========================================================================== */
function Tools() {
  return (
    <section id="tools" aria-labelledby="tools-heading" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <SectionHeading
            eyebrow="Workflow"
            title="Too"
            highlight="ls"
            description="My everyday workflow — version control, deployment, editing, and API tooling. Hover any badge for context."
          />
          <div className="mt-10 grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-8">
            {portfolioData.tools.map((tool) => (
              <TooltipBadge key={tool.name} skill={tool} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ==========================================================================
   Education
   ========================================================================== */
function Education() {
  return (
    <section id="education" aria-labelledby="edu-heading" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <SectionHeading eyebrow="Education" title="Edu" highlight="cation" />
          <div className="relative mt-10 ml-4 border-l border-emerald-400/25 pl-8">
            {portfolioData.education.map((item) => (
              <article key={item.title} className="relative pb-12 last:pb-0">
                <div className={`absolute -left-[41px] top-1.5 h-3 w-3 rounded-full border ${item.status === "current" ? "border-emerald-400 bg-emerald-400" : "border-line bg-zinc-900"}`} />
                {item.status === "current" && (
                  <div className="absolute -left-[45px] top-0 h-5 w-5 animate-[pulseDot_2.2s_ease-in-out_infinite] rounded-full bg-emerald-400/25" />
                )}
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-base font-semibold text-zinc-100">{item.title}</h3>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${item.status === "current" ? "border border-emerald-400/25 bg-emerald-400/10 text-emerald-300" : "border border-line bg-soft text-zinc-500"}`}>
                    {item.status === "current" ? "Current" : item.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-zinc-400">{item.degree}</p>
                <p className="mt-1 text-xs text-zinc-500">{item.period}</p>
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

/* ==========================================================================
   Experience
   ========================================================================== */
function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-heading" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <SectionHeading eyebrow="Journey" title="Expe" highlight="rience" />
          <div className="relative mt-10 ml-4 border-l border-emerald-400/25 pl-8">
            {portfolioData.experience.map((item) => (
              <article key={item.title} className="relative pb-12 last:pb-0">
                <div className="absolute -left-[41px] top-1.5 h-3 w-3 rounded-full border border-emerald-400/50 bg-zinc-900" />
                <time className="text-xs font-medium text-emerald-300">{item.period}</time>
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

/* ==========================================================================
   Projects — dynamic filtering tabs
   ========================================================================== */
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
      { key: "data", label: "Data & Analytics", icon: BarChart3, count: counts.data || 0 },
      { key: "mobile", label: "Systems & Mobile", icon: Phone, count: counts.mobile || 0 },
    ];
  }, []);

  const filtered =
    activeFilter === "all"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" aria-labelledby="proj-heading" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <SectionHeading
            eyebrow="Portfolio"
            title="Pro"
            highlight="jects"
            description="Selected work across web apps, mobile, e-commerce, analytics dashboards, and developer tools."
          />

          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveFilter(cat.key)}
                  role="tab"
                  aria-selected={activeFilter === cat.key}
                  aria-controls="projects-panel"
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                    activeFilter === cat.key
                      ? "border-emerald-400/50 bg-emerald-400/15 text-emerald-200 shadow-[0_8px_20px_-10px_rgba(197,168,128,0.6)]"
                      : "border-line bg-soft text-zinc-400 hover:border-emerald-400/30 hover:text-zinc-100"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {cat.label}
                  <span className="text-zinc-500">({cat.count})</span>
                </button>
              );
            })}
          </div>

          <div id="projects-panel" className="mt-8 grid gap-5 sm:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.article
                  layout
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="card group flex flex-col overflow-hidden"
                >
                  <div className="relative h-44 overflow-hidden bg-zinc-800/50">
                    <Image
                      src={project.thumb}
                      alt={`${project.title} preview`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12100e]/85 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold tracking-tight text-zinc-100 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-emerald-400/15 bg-emerald-400/5 px-2.5 py-1 text-[11px] font-medium text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-emerald-400/50 hover:text-zinc-100"
                        >
                          <GithubIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5" aria-hidden="true" />
                          Source
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300 transition-colors hover:bg-emerald-400/20"
                        >
                          <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5" aria-hidden="true" />
                          Live View
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ==========================================================================
   Certifications
   ========================================================================== */
function Certifications() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <section id="certifications" aria-labelledby="cert-heading" className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <FadeIn>
            <SectionHeading
              eyebrow="Credentials"
              title="Certifi"
              highlight="cations"
              description="Certificates I earned from different programs and companies."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {portfolioData.certifications.map((cert, i) => (
                <FadeIn key={cert.title} delay={i * 0.06}>
                  <button
                    onClick={() => setLightbox(cert)}
                    className="card group w-full overflow-hidden text-left"
                  >
                    <div className="relative h-40 overflow-hidden bg-zinc-800/50">
                      <Image
                        src={cert.imageUrl}
                        alt={`${cert.title} certificate`}
                        fill
                        sizes="(max-width: 640px) 100vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#12100e]/85 to-transparent" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-zinc-100">{cert.title}</h3>
                      <p className="mt-1 text-xs text-zinc-500">
                        {cert.issuer} &bull; {cert.date}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-zinc-500 transition-colors group-hover:text-emerald-300">
                        Click to expand <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </span>
                    </div>
                  </button>
                </FadeIn>
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
            role="dialog"
            aria-modal="true"
            aria-label={`${lightbox.title} certificate preview`}
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
                className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#1a1512] text-[#d4c5b9] hover:text-white"
                aria-label="Close preview"
              >
                <X className="h-4 w-4" />
              </button>
              <Image
                src={lightbox.imageUrl}
                alt={lightbox.title}
                width={800}
                height={600}
                className="max-h-[80vh] w-auto rounded-2xl border border-white/20 object-contain"
              />
              <div className="mt-3 text-center">
                <p className="text-sm font-medium text-[#f3ece5]">{lightbox.title}</p>
                <p className="text-xs text-[#a99a8d]">{lightbox.issuer}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ==========================================================================
   FAQ
   ========================================================================== */
function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <FadeIn>
          <SectionHeading eyebrow="FAQ" title="Quick " highlight="Answers" />
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {portfolioData.faq.map((item, idx) => (
              <details
                key={idx}
                className="card group p-0 transition-colors [&[open]]:border-emerald-400/30"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-sm font-medium text-zinc-100 outline-none [&::-webkit-details-marker]:hidden [&::marker]:hidden">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                    {item.question}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 group-open:rotate-180 group-open:text-emerald-300" aria-hidden="true" />
                </summary>
                <div className="border-t border-line px-6 pb-5 pt-4">
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

/* ==========================================================================
   Contact
   ========================================================================== */
function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name") || "";
    const email = form.get("email") || "";
    const message = form.get("message") || "";
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${portfolioData.socials.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const contactItems = [
    { icon: Mail, label: "Email", value: portfolioData.socials.email, href: `mailto:${portfolioData.socials.email}`, copy: portfolioData.socials.email },
    { icon: Phone, label: "Phone", value: "+251 947 758 994", href: portfolioData.socials.phone, copy: "+251947758994" },
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
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-28">
        <FadeIn>
          <SectionHeading
            eyebrow="Get in touch"
            title="Con"
            highlight="tact"
            description="Let's connect — reach out on any platform below, send a quick message, or click to copy my details."
          />

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {contactItems.map(({ icon: Icon, label, value, href, copy }) => (
              <div key={label} className="card group flex items-center gap-3 p-4">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 flex-1 items-center gap-3"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-soft text-zinc-400 transition-colors group-hover:text-emerald-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
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
            <div className="card p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
                <Send className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                Send a Quick Message
              </h3>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300"
                >
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Thanks! Email me directly using the Email card above.
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-4 grid gap-4" aria-label="Contact form">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1 block text-xs font-medium text-zinc-400">
                        Your Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        className="w-full rounded-xl border border-line bg-zinc-900/40 px-4 py-3 text-sm text-zinc-100 outline-none transition-colors focus:border-emerald-400/50"
                        placeholder="John Doe"
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1 block text-xs font-medium text-zinc-400">
                        Your Email / Telegram
                      </label>
                      <input
                        id="email"
                        name="email"
                        required
                        className="w-full rounded-xl border border-line bg-zinc-900/40 px-4 py-3 text-sm text-zinc-100 outline-none transition-colors focus:border-emerald-400/50"
                        placeholder="you@example.com or @username"
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
                      name="message"
                      required
                      rows={3}
                      className="w-full rounded-xl border border-line bg-zinc-900/40 px-4 py-3 text-sm text-zinc-100 outline-none transition-colors focus:border-emerald-400/50"
                      placeholder="Hi Abdrezak, let's discuss a project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 to-emerald-400 px-6 text-sm font-semibold text-[#161311] transition-all hover:-translate-y-0.5 sm:w-auto"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Send via Telegram / Email
                  </button>
                </form>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ==========================================================================
   Footer
   ========================================================================== */
function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 py-8 text-center text-xs text-zinc-600">
        <p>
          &copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ==========================================================================
   Back to top
   ========================================================================== */
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
          className="fixed bottom-4 left-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-400/40 bg-zinc-900/80 text-emerald-300 shadow-[0_10px_30px_-12px_rgba(197,168,128,0.6)] backdrop-blur transition-colors hover:bg-zinc-900 sm:bottom-5 sm:left-5"
        >
          <ChevronUp className="h-4 w-4" aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ==========================================================================
   Page
   ========================================================================== */
export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-zinc-900"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <KeyMetrics />
        <About />
        <WhatIBuild />
        <CourseFocus />
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

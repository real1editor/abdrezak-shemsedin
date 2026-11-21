"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Copy, Check, Sun, Moon, Mail } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  GithubIcon,
  LinkedinIcon,
  TelegramIcon,
} from "@/components/icons";
import { usePortfolioData } from "@/components/portfolio-context";
import { Skill, Tool } from "@/types/portfolio";

export const socialBuilders: Record<string, (v: string) => string> = {
  github: (v) => v,
  linkedin: (v) => (v.startsWith("http") ? v : `https://www.linkedin.com/in/${v}`),
  upwork: (v) => (v.startsWith("http") ? v : `https://www.upwork.com/freelancers/${v}`),
  email: (v) => `mailto:${v}`,
  telegram: (v) => (v.startsWith("http") ? v : `https://t.me/${v}`),
  phone: (v) => (v.startsWith("tel:") ? v : `tel:${v}`),
};

export const socialConfig = [
  { key: "github" as const, label: "GitHub", Icon: GithubIcon },
  { key: "linkedin" as const, label: "LinkedIn", Icon: LinkedinIcon },
  { key: "telegram" as const, label: "Telegram", Icon: TelegramIcon },
  { key: "email" as const, label: "Email", Icon: Mail },
];

export function SocialLinks({ size = "md" }: { size?: "sm" | "md" }) {
  const data = usePortfolioData();
  const s = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const i = size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]";
  return (
    <div className="flex items-center gap-3">
      {socialConfig.map(({ key, label, Icon }) => {
        const value = data.socials[key];
        const href = socialBuilders[key](value);
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

export function CopyButton({ text, label }: { text: string; label: string }) {
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

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof document === "undefined") return "dark";
    return (document.documentElement.getAttribute("data-theme") as "dark" | "light") || "dark";
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

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
}: {
  eyebrow?: string;
  title: string;
  highlight: string;
  description?: string;
}) {
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

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
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

/* Simple Icons removed several brand marks (Adobe, Canva, CapCut, Power BI, Excel).
   Render a monogram badge locally so those tools never show a broken image. */
const localLogoLabels: Record<string, string> = {
  microsoftexcel: "XLS",
  powerbi: "PBI",
  adobepremierepro: "Pr",
  adobeaftereffects: "Ae",
  adobephotoshop: "Ps",
  adobeaudition: "Au",
  capcut: "CC",
  canva: "Cv",
};

function logoSource(skill: Skill | Tool): string {
  if (skill.icon) return skill.icon;
  const label = localLogoLabels[skill.slug];
  if (!label) return `https://cdn.simpleicons.org/${skill.slug}/c5a880`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#241b13"/><rect x="1" y="1" width="62" height="62" rx="11" fill="none" stroke="#c5a880" stroke-opacity="0.6"/><text x="32" y="41" text-anchor="middle" font-family="Arial,sans-serif" font-size="${label.length > 2 ? 18 : 23}" font-weight="700" fill="#c5a880">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function TooltipBadge({ skill }: { skill: Skill | Tool }) {
  const [show, setShow] = useState(false);
  const level = "level" in skill ? skill.level : undefined;
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
          src={logoSource(skill)}
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

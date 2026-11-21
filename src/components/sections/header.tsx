"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, Download } from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import IsoLogo from "@/components/iso-logo";
import { usePortfolio } from "@/components/portfolio-context";
import { ThemeToggle } from "./shared";

export default function Header() {
  const { data, meta } = usePortfolio();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const links = [
    { href: "#about", label: "About" },
    ...(meta.showDomains ? [{ href: "#domains", label: "Domains" }] : []),
    { href: "#focus", label: "Course Focus" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#credentials", label: "Credentials" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-zinc-950/75 backdrop-blur-md">
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-emerald-500 via-emerald-300 to-teal-300"
      />
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a
          href="#home"
          className="flex items-center"
          aria-label="AS — Abdrezak Shemsedin, go to home"
        >
          <IsoLogo />
        </a>
        <nav aria-label="Primary navigation" className="hidden items-center gap-5 md:flex">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-400 transition-colors hover:text-emerald-300"
            >
              {item.label}
            </a>
          ))}
          <Link
            href={data.resumeUrl}
            className="group inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1.5 text-xs font-medium text-emerald-300 transition-all hover:bg-emerald-400/20 hover:shadow-[0_8px_20px_-8px_rgba(197,168,128,0.6)]"
          >
            <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            Resume
          </Link>
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
              <Link
                href={data.resumeUrl}
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-300"
              >
                <Download className="h-4 w-4" />
                View Resume
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

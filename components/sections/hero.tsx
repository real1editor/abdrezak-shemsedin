"use client";

import Image from "next/image";
import { Code2, MapPin, Send, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import TypewriterRole from "@/components/type-writer";
import { portfolioData } from "@/data/projects";
import { SocialLinks } from "./shared";

export default function Hero() {
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

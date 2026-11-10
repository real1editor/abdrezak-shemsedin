"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Code2, ExternalLink, BarChart3, Phone, X, Layers, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/projects";
import { ProjectItem } from "@/types/portfolio";
import { GithubIcon } from "@/components/icons";
import { FadeIn, SectionHeading } from "./shared";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const categories = useMemo(() => {
    const counts: Record<string, number> = { all: portfolioData.projects.length };
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
    <>
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
                    type="button"
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
                      {project.role && (
                        <div className="absolute top-3 left-3 rounded-full border border-emerald-400/30 bg-[#12100e]/80 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300 backdrop-blur">
                          {project.role}
                        </div>
                      )}
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
                      <div className="mt-5 flex flex-wrap items-center gap-2 pt-2 border-t border-line">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-400/20"
                        >
                          <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                          Case Study
                        </button>
                        {project.githubUrl && project.githubUrl !== "#" && (
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
                        {project.liveUrl && project.liveUrl !== "#" && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-emerald-400/50 hover:text-zinc-100"
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

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-line bg-[#161311] p-6 shadow-2xl sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-soft text-zinc-400 hover:text-zinc-100"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  {selectedProject.role || "Featured Project"}
                </span>
                <span className="text-xs uppercase tracking-wider text-zinc-500">
                  &bull; {selectedProject.category.toUpperCase()}
                </span>
              </div>

              <h2 id="case-study-title" className="mt-3 text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
                {selectedProject.title}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
                {selectedProject.description}
              </p>

              {/* Architecture Section */}
              {selectedProject.architecture && selectedProject.architecture.length > 0 && (
                <div className="mt-6 rounded-2xl border border-line bg-soft p-5">
                  <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                    <Layers className="h-4 w-4" />
                    Architecture &amp; Systems Design
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {selectedProject.architecture.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs text-zinc-300 sm:text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technical Highlights Section */}
              {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                <div className="mt-5">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                    Engineering Highlights
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {selectedProject.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs text-zinc-300 sm:text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              <div className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Technologies Applied
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs font-medium text-zinc-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-line">
                {selectedProject.liveUrl && selectedProject.liveUrl !== "#" && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 to-emerald-400 px-5 text-xs font-semibold text-[#161311] hover:-translate-y-0.5 transition-transform"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Visit Live Site
                  </a>
                )}
                {selectedProject.githubUrl && selectedProject.githubUrl !== "#" && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-soft px-5 text-xs font-medium text-zinc-200 hover:border-emerald-400/40"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    Source Code
                  </a>
                )}
                <a
                  href={`mailto:${portfolioData.socials.email}?subject=${encodeURIComponent(`Inquiry regarding ${selectedProject.title}`)}`}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 text-xs font-medium text-emerald-300 hover:bg-emerald-400/20"
                >
                  Inquire About This Project
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

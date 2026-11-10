"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/projects";
import { CertificationItem } from "@/types/portfolio";
import { FadeIn, SectionHeading } from "./shared";

export default function Certifications() {
  const [lightbox, setLightbox] = useState<CertificationItem | null>(null);

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
                    type="button"
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
                type="button"
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

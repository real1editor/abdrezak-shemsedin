"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Award,
  BadgeCheck,
  ExternalLink,
  ShieldCheck,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type {
  Credential,
  CredentialFilter,
  CredentialTag,
} from "@/data/masterPortfolio";
import { usePortfolio } from "@/components/portfolio-context";
import { FadeIn, SectionHeading } from "./shared";

const FILTERS: { key: CredentialFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "fullstack", label: "Full-Stack" },
  { key: "ece", label: "ECE" },
  { key: "ai", label: "AI Systems" },
  { key: "ml-dl", label: "ML / DL" },
  { key: "data", label: "Data" },
  { key: "video", label: "Video" },
  { key: "vault", label: "Archive" },
];

function localImage(credential: Credential): string | null {
  return credential.verificationUrl?.startsWith("/certs/")
    ? credential.verificationUrl
    : null;
}

function verifyLink(credential: Credential): string | null {
  return credential.verificationUrl && /^https?:\/\//.test(credential.verificationUrl)
    ? credential.verificationUrl
    : null;
}

function CredentialCard({
  credential,
  onPreview,
}: {
  credential: Credential;
  onPreview: (credential: Credential) => void;
}) {
  const image = localImage(credential);
  const verify = verifyLink(credential);

  return (
    <article className="card group flex h-full flex-col overflow-hidden">
      {image ? (
        <button
          type="button"
          onClick={() => onPreview(credential)}
          className="relative h-36 w-full overflow-hidden bg-zinc-800/50 text-left"
          aria-label={`Preview ${credential.title} certificate`}
        >
          <Image
            src={image}
            alt={`${credential.title} certificate`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12100e]/85 via-[#12100e]/20 to-transparent" />
          <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-[#12100e]/80 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300 backdrop-blur">
            <Award className="h-3 w-3" aria-hidden="true" />
            Archive certificate
          </span>
        </button>
      ) : (
        <div
          className="relative flex h-28 items-center justify-between overflow-hidden border-b border-line px-5"
          style={{
            background:
              "radial-gradient(circle at 88% 12%, rgba(197,168,128,0.22), transparent 52%), linear-gradient(135deg, #1a1613 0%, #211a14 100%)",
          }}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
            <BadgeCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="max-w-[60%] text-right text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
            {credential.issuer}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-sm font-semibold leading-snug text-zinc-100">
          {credential.title}
        </h3>
        <p className="mt-1.5 text-xs text-zinc-500">
          {credential.issuer} &bull; {credential.issueDate}
        </p>

        {credential.skills && credential.skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {credential.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-emerald-400/15 bg-emerald-400/5 px-2 py-0.5 text-[10px] font-medium text-zinc-400"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4">
          {verify ? (
            <a
              href={verify}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-300 transition-colors hover:text-emerald-200"
            >
              {credential.verificationLabel || "Verify credential"}
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          ) : image ? (
            <button
              type="button"
              onClick={() => onPreview(credential)}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-300 transition-colors hover:text-emerald-200"
            >
              View certificate
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-500">
              <ShieldCheck className="h-3 w-3" aria-hidden="true" />
              Recorded credential
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Credentials() {
  const { credentials, meta } = usePortfolio();
  const [filter, setFilter] = useState<CredentialFilter>("all");
  const [preview, setPreview] = useState<Credential | null>(null);

  const counts = useMemo(() => {
    const next: Record<string, number> = { all: credentials.length };
    credentials.forEach((credential) => {
      credential.pillarTags.forEach((tag) => {
        next[tag] = (next[tag] || 0) + 1;
      });
    });
    return next;
  }, [credentials]);

  const visible = useMemo(() => {
    if (!meta.isMaster || filter === "all") return credentials;
    return credentials.filter((credential) =>
      credential.pillarTags.includes(filter as CredentialTag),
    );
  }, [credentials, filter, meta.isMaster]);

  const issuerCount = useMemo(
    () => new Set(credentials.map((credential) => credential.issuer)).size,
    [credentials],
  );

  const baseTitle = meta.credentialsTitle.replace(/\s*Credentials$/i, "").trim();
  const title = baseTitle ? `${baseTitle} ` : "Verified ";

  const filters = FILTERS.filter(
    (item) => item.key === "all" || (counts[item.key] || 0) > 0,
  );

  return (
    <>
      <section id="credentials" aria-labelledby="credentials-heading" className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <FadeIn>
            <SectionHeading
              eyebrow={meta.isMaster ? "Credentials Vault" : meta.label}
              title={title}
              highlight="Credentials"
              description={meta.credentialsBlurb}
            />

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-500">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                {credentials.length} verified records
              </span>
              <span>{issuerCount} issuers</span>
              {meta.isMaster && <span>Full master record</span>}
            </div>

            {meta.isMaster && (
              <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Filter credentials">
                {filters.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setFilter(item.key)}
                    role="tab"
                    aria-selected={filter === item.key}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                      filter === item.key
                        ? "border-emerald-400/50 bg-emerald-400/15 text-emerald-200 shadow-[0_8px_20px_-10px_rgba(197,168,128,0.6)]"
                        : "border-line bg-soft text-zinc-400 hover:border-emerald-400/30 hover:text-zinc-100"
                    }`}
                  >
                    {item.label}
                    <span className="text-zinc-500">({counts[item.key] || 0})</span>
                  </button>
                ))}
              </div>
            )}

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((credential, index) => (
                <FadeIn key={credential.id} delay={Math.min(index, 8) * 0.03}>
                  <CredentialCard credential={credential} onPreview={setPreview} />
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setPreview(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${preview.title} certificate preview`}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[85vh] max-w-[90vw]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#1a1512] text-[#d4c5b9] hover:text-white"
                aria-label="Close preview"
              >
                <X className="h-4 w-4" />
              </button>
              {localImage(preview) && (
                <Image
                  src={localImage(preview)!}
                  alt={preview.title}
                  width={800}
                  height={600}
                  unoptimized
                  className="max-h-[80vh] w-auto rounded-2xl border border-white/20 object-contain"
                />
              )}
              <div className="mt-3 text-center">
                <p className="text-sm font-medium text-[#f3ece5]">{preview.title}</p>
                <p className="text-xs text-[#a99a8d]">
                  {preview.issuer} &bull; {preview.issueDate}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

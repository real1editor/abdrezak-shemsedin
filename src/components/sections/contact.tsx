"use client";

import { useActionState } from "react";
import { Mail, Phone, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { usePortfolioData } from "@/components/portfolio-context";
import { sendContactMessage, ContactFormState } from "@/app/actions/contact";
import {
  GithubIcon,
  LinkedinIcon,
  UpworkIcon,
  TelegramIcon,
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  XIcon,
} from "@/components/icons";
import { FadeIn, SectionHeading, CopyButton } from "./shared";

const initialState: ContactFormState = { success: false };

export default function Contact() {
  const data = usePortfolioData();
  const [state, formAction, isPending] = useActionState(sendContactMessage, initialState);

  const contactItems = [
    { icon: Mail, label: "Email", value: data.socials.email, href: `mailto:${data.socials.email}`, copy: data.socials.email },
    { icon: Phone, label: "Phone", value: "+251 947 758 994", href: data.socials.phone, copy: "+251947758994" },
    { icon: GithubIcon, label: "GitHub", value: "real1editor", href: data.socials.github, copy: data.socials.github },
    { icon: LinkedinIcon, label: "LinkedIn", value: "abdrezak-shemsedin", href: data.socials.linkedin, copy: data.socials.linkedin },
    { icon: TelegramIcon, label: "Telegram", value: "@real1editor", href: data.socials.telegram, copy: "@real1editor" },
    { icon: UpworkIcon, label: "Upwork", value: "abdrezak", href: data.socials.upwork, copy: data.socials.upwork },
    { icon: FacebookIcon, label: "Facebook", value: "real1editor", href: data.socials.facebook, copy: data.socials.facebook },
    { icon: InstagramIcon, label: "Instagram", value: "@real1editor", href: data.socials.instagram, copy: "@real1editor" },
    { icon: TiktokIcon, label: "TikTok", value: "@real1editor", href: data.socials.tiktok, copy: "@real1editor" },
    { icon: XIcon, label: "X", value: "@real1editor", href: data.socials.x, copy: "@real1editor" },
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
                Send a Direct Message
              </h3>

              {state.success ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex flex-col gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-300"
                >
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                    <span>Message Delivered</span>
                  </div>
                  <p className="text-xs text-zinc-300">
                    {state.message}
                  </p>
                </motion.div>
              ) : (
                <form action={formAction} className="mt-4 grid gap-4" aria-label="Contact form">
                  {state.error && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-xs text-red-300">
                      <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                      <span>{state.error}</span>
                    </div>
                  )}

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
                        disabled={isPending}
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
                        disabled={isPending}
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
                      disabled={isPending}
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 to-emerald-400 px-6 text-sm font-semibold text-[#161311] transition-all hover:-translate-y-0.5 disabled:opacity-50 sm:w-auto"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" aria-hidden="true" />
                          Send Message
                        </>
                      )}
                    </button>
                    <a
                      href={`mailto:${data.socials.email}`}
                      className="text-xs text-zinc-500 hover:text-emerald-400 hover:underline"
                    >
                      Or open default mail app
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

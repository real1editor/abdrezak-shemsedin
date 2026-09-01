import type { Metadata } from "next";
import SeoLanding from "@/components/seo-landing";

const content = {
  title: "Full-Stack Developer in Ethiopia",
  eyebrow: "Full-Stack Development",
  intro:
    "Hiring a full-stack developer in Ethiopia? I build end-to-end web applications with React, Next.js, TypeScript, and Node.js — from responsive front-ends to secure APIs and databases.",
  bullets: [
    "Modern stack: Next.js, React, TypeScript, Tailwind CSS, Node.js, PostgreSQL",
    "Responsive, accessible, and SEO-friendly web applications",
    "Clean REST APIs, authentication, and role-based dashboards",
    "Deployment and CI/CD on Vercel and cloud platforms",
    "Based in Addis Ababa, available for local and remote projects",
  ],
  services: [
    { title: "Web Apps", description: "Custom SaaS and business web applications built with modern frameworks." },
    { title: "E-Commerce", description: "Online stores with payments, inventory, and order tracking." },
    { title: "APIs", description: "Scalable REST APIs and database design for your product." },
  ],
  cta: `Want a full-stack engineer for your next project? Let's talk.`,
  route: "/full-stack-developer-ethiopia",
};

export const metadata: Metadata = {
  title: content.title,
  description:
    "Full-stack developer in Ethiopia building web apps and e-commerce platforms with Next.js, React, TypeScript, and Node.js.",
  alternates: { canonical: content.route },
  openGraph: {
    title: content.title,
    description: content.intro,
    url: `https://abdrezak-shemsedin.vercel.app${content.route}`,
  },
};

export default function Page() {
  return <SeoLanding content={content} />;
}

export const revalidate = 3600;

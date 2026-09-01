import type { Metadata } from "next";
import SeoLanding from "@/components/seo-landing";

const content = {
  title: "ECE Student Developer",
  eyebrow: "Engineering · Code",
  intro:
    "As an Electrical and Computer Engineering student, I combine engineering fundamentals with modern software development — building products where systems thinking meets clean, practical code.",
  bullets: [
    "Engineering-driven problem solving and systems thinking",
    "Applied web and mobile development across real projects",
    "Comfortable with embedded systems and hardware concepts",
    "Strong foundation in math, algorithms, and software design",
    "Committed to shipping production-ready, maintainable code",
  ],
  services: [
    { title: "Software Design", description: "Clean architecture for scaleable applications." },
    { title: "Prototyping", description: "Rapid MVPs to validate your product idea." },
    { title: "Consulting", description: "Technical guidance grounded in engineering principles." },
  ],
  cta: "Need engineering-minded development? Let's work together.",
  route: "/ece-student-developer",
};

export const metadata: Metadata = {
  title: content.title,
  description:
    "Electrical and Computer Engineering student developer building web and mobile applications with a strong engineering foundation.",
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

import type { Metadata } from "next";
import SeoLanding from "@/components/seo-landing";
import { portfolioData } from "@/data/projects";

const content = {
  title: "Ethiopian Web & Mobile Developer",
  eyebrow: "Web & Mobile Development",
  intro:
    "I build responsive websites and cross-platform mobile apps for Ethiopian businesses and international clients — turning ideas into fast, reliable digital products.",
  bullets: [
    "Websites and web apps tuned for local and global audiences",
    "Mobile apps for Android and iOS using React Native and Expo",
    "Offline-first sync and push notifications for real-world use",
    "Fast load times, mobile-first design, and clean UX",
    "From Wolaita Sodo, serving clients across Ethiopia and abroad",
  ],
  services: [
    { title: "Websites", description: "Fast, responsive business sites and landing pages." },
    { title: "Mobile Apps", description: "Cross-platform mobile apps with native-feel UX." },
    { title: "Integrations", description: "Payments, maps, and third-party API integrations." },
  ],
  cta: "Have a website or app idea? Let's build it.",
  route: "/ethiopian-web-developer",
};

export const metadata: Metadata = {
  title: content.title,
  description:
    "Ethiopian web and mobile developer building responsive websites and cross-platform apps with React Native, Next.js, and React.",
  alternates: { canonical: content.route },
  openGraph: {
    title: content.title,
    description: content.intro,
    url: `https://abdrezak-shemsedin.vercel.app${content.route}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolioData.name,
  url: "https://abdrezak-shemsedin.vercel.app",
  jobTitle: "Web & Mobile Developer",
  description: content.intro,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Wolaita Sodo",
    addressCountry: "Ethiopia",
  },
  knowsAbout: ["React", "Next.js", "React Native", "Expo", "TypeScript"],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SeoLanding content={content} />
    </>
  );
}

export const revalidate = 3600;

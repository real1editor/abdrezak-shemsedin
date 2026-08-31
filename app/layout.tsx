import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { portfolioData } from "@/data/projects";
import "./globals.css";

const siteUrl = "https://real1editor.vercel.app";
const profileImage = portfolioData.profilePhoto;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Abdrezak Shemsedin — Full-Stack Web and App Developer",
    template: "%s — Abdrezak Shemsedin",
  },
  description:
    "Electrical and Computer Engineering student specializing in building high-performance web applications and digital platforms.",
  keywords: [
    "Abdrezak Shemsedin",
    "Full-Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "React Native",
    "Portfolio",
    "E-commerce",
    "Tourism",
    "Analytics",
  ],
  authors: [{ name: "Abdrezak Shemsedin", url: "https://github.com/real1editor" }],
  creator: "Abdrezak Shemsedin",
  publisher: "Abdrezak Shemsedin",
  applicationName: "Abdrezak Shemsedin Portfolio",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Abdrezak Shemsedin — Full-Stack Web and App Developer",
    description:
      "Electrical and Computer Engineering student specializing in building high-performance web applications and digital platforms.",
    url: siteUrl,
    siteName: "Abdrezak Shemsedin",
    type: "profile",
    locale: "en_US",
    images: [
      {
        url: "/og-image",
        width: 1200,
        height: 630,
        alt: "Abdrezak Shemsedin — Full-Stack Web and App Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdrezak Shemsedin — Full-Stack Web and App Developer",
    description:
      "Electrical and Computer Engineering student specializing in building high-performance web applications and digital platforms.",
    images: ["/og-image"],
    creator: "@real1editor",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#13100e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolioData.name,
    url: siteUrl,
    image: profileImage,
    jobTitle: portfolioData.role,
    description: portfolioData.bio,
    email: "mailto:" + portfolioData.socials.email,
    telephone: portfolioData.socials.phone,
    worksFor: {
      "@type": "Organization",
      name: "Self-employed",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Wolaita Sodo University",
    },
    knowsAbout: [...portfolioData.skills.primary, ...portfolioData.skills.locked, ...portfolioData.tools].map(
      (s) => s.name
    ),
    sameAs: [
      portfolioData.socials.github,
      portfolioData.socials.linkedin,
      portfolioData.socials.upwork,
      portfolioData.socials.telegram,
      portfolioData.socials.facebook,
      portfolioData.socials.instagram,
      portfolioData.socials.tiktok,
      portfolioData.socials.x,
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Addis Ababa",
      addressCountry: "Ethiopia",
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme")||"dark";document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-zinc-950 text-zinc-100">
        {children}
        <Script
          src="https://vercel.live/analytics/script.js"
          strategy="afterInteractive"
          data-host="https://vercel.live"
          data-collect-dnt="true"
        />
      </body>
    </html>
  );
}

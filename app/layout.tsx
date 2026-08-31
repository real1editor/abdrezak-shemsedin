import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { portfolioData } from "@/data/projects";
import "./globals.css";

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
  metadataBase: new URL("https://real1editor.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Abdrezak Shemsedin — Full-Stack Web and App Developer",
    description:
      "Electrical and Computer Engineering student specializing in building high-performance web applications and digital platforms.",
    url: "https://real1editor.vercel.app",
    siteName: "Abdrezak Shemsedin",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: portfolioData.profilePhoto,
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
    images: [portfolioData.profilePhoto],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#10b981",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Abdrezak Shemsedin",
    url: "https://real1editor.vercel.app",
    image: portfolioData.image,
    jobTitle: "Full-Stack Web and App Developer",
    worksFor: {
      "@type": "Organization",
      name: "Self-employed",
    },
    sameAs: [
      "https://github.com/real1editor",
      "https://www.linkedin.com/in/abdrezak-shemsedin",
      "https://www.upwork.com/freelancers/abdrezak",
      "https://t.me/real1editor",
      "https://real1editor.vercel.app",
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
      </head>
      <body className="flex min-h-full flex-col bg-zinc-950 text-zinc-100">
        {children}
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { credentials } from "@/data/masterPortfolio";
import { masterMeta, masterSiteData, siteUrl } from "@/data/site";
import AmbientSpotlight from "@/components/ambient-spotlight";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/geist-sans.woff2",
  variable: "--font-geist-sans",
  display: "swap",
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "sans-serif",
  ],
});

const geistMono = localFont({
  src: "./fonts/geist-mono.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "monospace",
  ],
});

const fullTitle = `${masterSiteData.name} — Full-Stack Developer & AI`;
const fullDescription =
  "Abdrezak Shemsedin — Computer Engineering Student @ Wolaita Sodo University building high-performance web applications, AI-powered platforms, and data-driven products with Next.js, Supabase, Python, and modern AI/ML tooling.";

export const metadata: Metadata = {
  title: {
    default: fullTitle,
    template: `%s — ${masterSiteData.name}`,
  },
  description: fullDescription,
  keywords: [
    "Abdrezak Shemsedin",
    "Abdrezak Shemsedin Hakimo",
    "real1editor",
    "Full-Stack Developer",
    "Web Developer Ethiopia",
    "Ethiopian Developer",
    "Computer Engineering",
    "Electrical and Computer Engineering",
    "AI Systems Engineer",
    "AI Agents",
    "Machine Learning",
    "Computer Vision",
    "Data Analyst",
    "React",
    "Next.js",
    "TypeScript",
    "Supabase",
    "PostgreSQL",
    "Python",
    "FastAPI",
    "TensorFlow",
    "OpenCV",
    "NumPy",
    "Pandas",
    "Telegram Bot",
    "Portfolio",
  ],
  authors: [
    {
      name: masterSiteData.name,
      url: "https://github.com/real1editor",
    },
  ],
  creator: masterSiteData.name,
  publisher: masterSiteData.name,
  applicationName: "Abdrezak Shemsedin — Master Portfolio",
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
    title: fullTitle,
    description: fullDescription,
    url: siteUrl,
    siteName: masterSiteData.name,
    type: "profile",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: fullTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description: fullDescription,
    images: ["/opengraph-image"],
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
  themeColor: "#12100e",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const knowsAbout = Array.from(
    new Set([
      ...masterSiteData.skills.primary,
      ...masterSiteData.skills.ai,
      ...masterSiteData.skills.data,
      ...masterSiteData.skills.locked,
      ...masterSiteData.tools,
    ].map((item) => item.name)),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: masterSiteData.name,
    alternateName: "real1editor",
    url: siteUrl,
    image: masterSiteData.profilePhoto,
    jobTitle: masterMeta.role,
    description: masterSiteData.bio,
    email: `mailto:${masterSiteData.socials.email}`,
    telephone: masterSiteData.socials.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wolaita Sodo / Butajira",
      addressCountry: "Ethiopia",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Wolaita Sodo University",
    },
    knowsAbout,
    sameAs: [
      masterSiteData.socials.github,
      masterSiteData.socials.linkedin,
      masterSiteData.socials.upwork,
      masterSiteData.socials.telegram,
      masterSiteData.socials.facebook,
      masterSiteData.socials.instagram,
      masterSiteData.socials.tiktok,
      masterSiteData.socials.x,
    ],
    hasCredential: credentials
      .filter((credential) => credential.verificationUrl?.startsWith("http"))
      .map((credential) => ({
        "@type": "EducationalOccupationalCredential",
        name: credential.title,
        credentialCategory: "certificate",
        recognizedBy: {
          "@type": "Organization",
          name: credential.issuer,
        },
        url: credential.verificationUrl,
      })),
  };

  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="color-scheme" content="dark light" />
        <script
          suppressHydrationWarning
          type={typeof document === "undefined" ? "text/javascript" : "text/plain"}
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme")||"dark";document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`,
          }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <AmbientSpotlight />
        {children}
      </body>
    </html>
  );
}

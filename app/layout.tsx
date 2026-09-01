import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { portfolioData } from "@/data/projects";
import "./globals.css";

const siteUrl = "https://abdrezak-shemsedin.vercel.app";
const profileImage = portfolioData.profilePhoto;
const fullTitle = `${portfolioData.shortName} — Full-Stack Developer & Computer Engineer`;
const fullDescription =
  "Abdrezak Shemsedin Hakimo — fifth-year Electrical and Computer Engineering student at Wolaita Sodo University building high-performance web applications, digital platforms, and data-driven products with Next.js, Supabase, and Python.";

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
    default: fullTitle,
    template: `%s — ${portfolioData.shortName}`,
  },
  description: fullDescription,
  keywords: [
    "Abdrezak Shemsedin",
    "Abdrezak Shemsedin Hakimo",
    "Full-Stack Developer",
    "Web Developer Ethiopia",
    "Ethiopian Developer",
    "Electrical and Computer Engineering",
    "React",
    "Next.js",
    "Supabase",
    "Python",
    "NumPy",
    "Pandas",
    "Data Analysis",
    "Portfolio",
    "E-commerce",
    "Tourism",
    "Analytics",
  ],
  authors: [
    {
      name: "Abdrezak Shemsedin Hakimo",
      url: "https://github.com/real1editor",
    },
  ],
  creator: "Abdrezak Shemsedin Hakimo",
  publisher: "Abdrezak Shemsedin Hakimo",
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
    title: fullTitle,
    description: fullDescription,
    url: siteUrl,
    siteName: "Abdrezak Shemsedin",
    type: "profile",
    locale: "en_US",
    images: [
      {
        url: "/og-image",
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
  themeColor: "#12100e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolioData.name,
    givenName: portfolioData.firstName,
    familyName: "Shemsedin Hakimo",
    url: siteUrl,
    image: profileImage,
    jobTitle: portfolioData.role,
    description: portfolioData.bio,
    email: "mailto:" + portfolioData.socials.email,
    telephone: portfolioData.socials.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Addis Ababa",
      addressCountry: "Ethiopia",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Wolaita Sodo University",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "BSc in Electrical and Computer Engineering",
    },
    knowsAbout: [
      ...portfolioData.skills.primary,
      ...portfolioData.skills.data,
      ...portfolioData.skills.locked,
      ...portfolioData.tools,
    ].map((s) => s.name),
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

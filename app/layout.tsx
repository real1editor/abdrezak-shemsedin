import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Abdrezak Shemsedin — Full-Stack Web and App Developer",
  description:
    "Electrical and Computer Engineering student specializing in building high-performance web applications and digital platforms.",
  keywords: [
    "Abdrezak Shemsedin",
    "Full-Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Abdrezak Shemsedin" }],
  openGraph: {
    title: "Abdrezak Shemsedin — Full-Stack Web and App Developer",
    description:
      "Electrical and Computer Engineering student specializing in building high-performance web applications and digital platforms.",
    url: "https://real1editor.vercel.app",
    siteName: "Abdrezak Shemsedin",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdrezak Shemsedin — Full-Stack Web and App Developer",
    description:
      "Electrical and Computer Engineering student specializing in building high-performance web applications and digital platforms.",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-950 text-zinc-100">
        {children}
        <script
          defer
          src="https://vercel.live/analytics/script.js"
          data-host="https://vercel.live"
          data-collect-dnt="true"
        />
      </body>
    </html>
  );
}

import Link from "next/link";
import { portfolioData } from "@/data/projects";

export default function SeoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-line bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-semibold text-zinc-100">
            {portfolioData.name}
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <a
              href={`mailto:${portfolioData.socials.email}`}
              className="text-zinc-400 transition-colors hover:text-emerald-400"
            >
              Contact
            </a>
            <Link
              href="/#projects"
              className="text-zinc-400 transition-colors hover:text-emerald-400"
            >
              Projects
            </Link>
            <Link
              href="/"
              className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20"
            >
              Back to Home
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="mt-auto border-t border-line bg-zinc-950">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 px-6 py-8 text-center">
          <p className="text-sm font-medium text-zinc-200">
            © {new Date().getFullYear()} {portfolioData.name}
          </p>
          <p className="text-xs text-zinc-500">
            {portfolioData.role} · {portfolioData.location}
          </p>
        </div>
      </footer>
    </div>
  );
}

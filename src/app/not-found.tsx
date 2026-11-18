import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Layers } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">
        404 · Signal lost
      </p>
      <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
        This route does not exist.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
        The page was moved, renamed, or never existed. The portfolio is still
        intact.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 to-emerald-400 px-5 text-sm font-semibold text-[#161311] transition-transform hover:-translate-y-0.5"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to the master portfolio
        </Link>
        <Link
          href="/#domains"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-soft px-5 text-sm font-medium text-zinc-200 transition-colors hover:border-emerald-400/40 hover:text-zinc-100"
        >
          <Layers className="h-4 w-4" aria-hidden="true" />
          Explore domains
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

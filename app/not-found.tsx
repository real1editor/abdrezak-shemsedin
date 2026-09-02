import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-8xl font-extrabold tracking-tight text-zinc-800">404</p>
      <h1 className="mt-4 text-2xl font-bold text-zinc-100">Page Not Found</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 to-emerald-400 px-7 text-sm font-semibold text-[#161311] transition-transform duration-300 hover:-translate-y-0.5"
      >
        Back to Home
      </Link>
    </div>
  );
}

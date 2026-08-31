"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-soft px-5 text-sm font-semibold text-zinc-200 transition-colors hover:border-emerald-400/40 hover:text-zinc-100"
    >
      Save as PDF
    </button>
  );
}

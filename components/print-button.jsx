"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/5"
    >
      Save as PDF
    </button>
  );
}

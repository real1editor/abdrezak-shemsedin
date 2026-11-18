"use client";

import { usePortfolio } from "@/components/portfolio-context";

export default function Footer() {
  const { data, meta } = usePortfolio();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-8 text-center text-xs text-zinc-600">
        <p>
          &copy; {new Date().getFullYear()} {data.name}. All rights reserved.
        </p>
        {!meta.isMaster && (
          <p className="text-zinc-500">
            {meta.title} &middot; {data.location}
          </p>
        )}
      </div>
    </footer>
  );
}

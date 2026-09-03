"use client";

import { useState, useEffect } from "react";

const HOLD_MS = 1000;
const TOTAL_MS = 2600;

export default function SitePreloader() {
  const [phase, setPhase] = useState<"mount" | "hold" | "exit" | "gone">("mount");

  useEffect(() => {
    const mount = requestAnimationFrame(() => setPhase("hold"));
    const exit = setTimeout(() => setPhase("exit"), HOLD_MS);
    const gone = setTimeout(() => setPhase("gone"), TOTAL_MS);

    return () => {
      cancelAnimationFrame(mount);
      clearTimeout(exit);
      clearTimeout(gone);
    };
  }, []);

  if (phase === "gone") return null;

  const exiting = phase === "exit";

  return (
    <div
      aria-hidden="true"
      className={`site-preloader bg-[#12100E] ${exiting ? "site-preloader--exit" : ""}`}
    >
      <div className={`site-preloader__logo ${exiting ? "site-preloader__logo--exit" : ""}`}>
        <span className="site-preloader__bracket site-preloader__bracket--open" aria-hidden="true">
          {"<"}
        </span>
        <span className="site-preloader__initials">AS</span>
        <span className="site-preloader__bracket site-preloader__bracket--close" aria-hidden="true">
          {"/>"}
        </span>
      </div>
    </div>
  );
}

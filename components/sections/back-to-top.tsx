"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          href="#home"
          aria-label="Back to top"
          className="fixed bottom-4 left-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-400/40 bg-zinc-900/80 text-emerald-300 shadow-[0_10px_30px_-12px_rgba(197,168,128,0.6)] backdrop-blur transition-colors hover:bg-zinc-900 sm:bottom-5 sm:left-5"
        >
          <ChevronUp className="h-4 w-4" aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

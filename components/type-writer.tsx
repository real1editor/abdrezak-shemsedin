"use client";

import { useState, useEffect, useCallback } from "react";

const STRINGS = [
  "Full-Stack Web Builder",
  "Python & API Developer",
  "Supabase & Next.js Architect",
  "AI & Data Specialist",
] as const;

const TYPING_SPEED = 72;
const DELETING_SPEED = 42;
const PAUSE_AFTER_TYPE = 2200;
const PAUSE_AFTER_DELETE = 400;

export default function TypewriterRole() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const current = STRINGS[index];

    if (!isDeleting) {
      if (text.length < current.length) {
        setText(current.slice(0, text.length + 1));
      } else {
        const timer = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
        return () => clearTimeout(timer);
      }
    } else {
      if (text.length > 0) {
        setText(current.slice(0, text.length - 1));
      } else {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % STRINGS.length);
      }
    }
  }, [text, index, isDeleting]);

  useEffect(() => {
    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    const delay = text.length === 0 && !isDeleting ? PAUSE_AFTER_DELETE : speed;
    const timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, text.length]);

  return (
    <span className="inline-flex items-baseline" aria-live="polite" aria-atomic="true">
      <span className="editorial-gradient">{text}</span>
      <span
        className="ml-[1px] inline-block h-[1.15em] w-[2px] translate-y-[0.06em] bg-[#c5a880]"
        aria-hidden="true"
        style={{ animation: "blink 1s step-end infinite" }}
      />
    </span>
  );
}

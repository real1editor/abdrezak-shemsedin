"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      document.documentElement.classList.add("cursor-native");
      return;
    }
    document.documentElement.classList.add("cursor-custom");
    setEnabled(true);

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let visible = false;

    const setPosition = (el: HTMLElement, px: number, py: number) => {
      el.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`;
    };

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const dot = dotRef.current;
      if (dot) setPosition(dot, x, y);
      if (!visible) {
        visible = true;
        dot?.classList.add("is-on");
        ringRef.current?.classList.add("is-on");
      }
    };

    const loop = () => {
      rx += (x - rx) * 0.22;
      ry += (y - ry) * 0.22;
      const ring = ringRef.current;
      if (ring) setPosition(ring, rx, ry);
      raf = requestAnimationFrame(loop);
    };

    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const active = !!t.closest?.(
        "a, button, [role='button'], .card, summary, input, textarea, select, label, [data-cursor]"
      );
      if (active !== hoverRef.current) {
        hoverRef.current = active;
        setHovering(active);
      }
    };

    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => {
      visible = false;
      dotRef.current?.classList.remove("is-on");
      ringRef.current?.classList.remove("is-on");
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("cursor-custom");
      document.documentElement.classList.remove("cursor-native");
    };
  }, []);

  if (!enabled) return null;

  const ringClass = [
    "cursor-ring",
    hovering ? "is-hover" : "",
    pressed ? "is-press" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div aria-hidden="true" className="cursor-layer">
      <div
        ref={dotRef}
        className={`cursor-dot ${pressed ? "is-press" : ""}`}
      />
      <div ref={ringRef} className={ringClass} />
    </div>
  );
}

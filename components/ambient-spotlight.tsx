"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE =
  "a, button, [role='button'], .card, summary, input, textarea, select, label, [data-cursor]";

export default function AmbientSpotlight() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(
      "(pointer: fine) and (min-width: 768px)"
    );
    if (!mq.matches) return;

    const el = layerRef.current!;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let raf = 0;
    let active = false;

    const css = (x: number, y: number) => {
      el.style.setProperty("--sx", `${x}px`);
      el.style.setProperty("--sy", `${y}px`);
    };

    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!active) {
        active = true;
        css(mx, my);
        el.classList.add("spot-on");
      }
    };

    const loop = () => {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      css(cx, cy);
      raf = requestAnimationFrame(loop);
    };

    const over = (e: PointerEvent) => {
      const hit = !!(e.target as HTMLElement).closest?.(INTERACTIVE);
      el.classList.toggle("spot-focus", hit);
    };

    const leave = () => {
      active = false;
      el.classList.remove("spot-on");
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <div ref={layerRef} aria-hidden="true" className="ambient-spotlight" />;
}

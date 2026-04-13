"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    let nextX = window.innerWidth / 2;
    let nextY = window.innerHeight / 2;

    const onMove = (e: MouseEvent) => {
      nextX = e.clientX;
      nextY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(flush);
      }
    };

    const flush = () => {
      rafId = 0;
      el.style.setProperty("--cursor-x", `${nextX}px`);
      el.style.setProperty("--cursor-y", `${nextY}px`);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed top-0 left-0 w-[260px] h-[260px] rounded-full pointer-events-none hidden sm:block z-[-10]"
      style={{
        backgroundColor: "#00ff88",
        transform:
          "translate3d(calc(var(--cursor-x, 50vw) - 50%), calc(var(--cursor-y, 50vh) - 50%), 0)",
        animation: "cursorGlow 4s linear infinite",
        willChange: "transform, filter",
      }}
    />
  );
}

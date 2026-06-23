"use client";

import { useEffect, useRef } from "react";

const SIZE = 260;
const HALF = SIZE / 2;
const EASE = 0.18;

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const root = document.documentElement;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId = 0;
    let running = false;

    const tick = () => {
      currentX += (targetX - currentX) * EASE;
      currentY += (targetY - currentY) * EASE;

      el.style.transform = `translate3d(${currentX - HALF}px, ${currentY - HALF}px, 0)`;
      root.style.setProperty("--cursor-x", `${currentX}px`);
      root.style.setProperty("--cursor-y", `${currentY}px`);

      if (
        Math.abs(targetX - currentX) > 0.1 ||
        Math.abs(targetY - currentY) > 0.1
      ) {
        rafId = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(tick);
      }
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
      className="fixed top-0 left-0 rounded-full pointer-events-none hidden sm:block z-[-10]"
      style={{
        width: SIZE,
        height: SIZE,
        backgroundColor: "#00ff88",
        animation: "cursorGlow 4s linear infinite",
        willChange: "transform, filter",
      }}
    />
  );
}

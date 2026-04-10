"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[200px] h-[200px] rounded-full pointer-events-none z-[-5]"
      animate={{
        x: mousePosition.x - 100, // offset by half the width/height
        y: mousePosition.y - 100,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      style={{
        background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(14,165,233,0) 70%)",
        filter: "blur(20px)",
      }}
    />
  );
}

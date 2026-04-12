"use client";

import { useEffect, useRef, useState } from "react";
import { SKILLS, SKILL_CATEGORIES } from "@/lib/data";
import GlitchText from "../ui/GlitchText";
import GlassBox from "../ui/GlassBox";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  Lightbulb,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  code: <Code2 size={20} />,
  layout: <Layout size={20} />,
  server: <Server size={20} />,
  database: <Database size={20} />,
  wrench: <Wrench size={20} />,
  lightbulb: <Lightbulb size={20} />,
};

// Resolved hex values for glow effects (CSS vars can't be used in box-shadow)
const GLOW_COLORS: Record<string, string> = {
  "var(--color-js)": "#eab308",
  "var(--color-ts)": "#3178c6",
  "var(--color-java)": "#3b82f6",
  "var(--color-py)": "#f97316",
  "var(--color-web)": "#a855f7",
  "var(--color-node)": "#68a063",
};

function AnimatedPercentage({
  target,
  color,
}: {
  target: number;
  color: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const duration = 1200;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-white text-xl sm:text-2xl lg:text-3xl font-bold font-outfit">
      {count}
      <span
        className="text-[10px] sm:text-xs lg:text-sm font-light tracking-wide"
        style={{ color }}
      >
        %
      </span>
    </span>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="Skills"
      className="py-16 sm:py-24 relative z-10 w-full min-h-screen flex flex-col justify-center"
    >
      {/* Section heading */}
      <div className="flex flex-col items-center mb-10 sm:mb-16">
        <GlitchText text="My Skills" />
        <div className="h-1 w-24 bg-emerald-500 rounded mt-4" />
        <p className="text-gray-500 text-sm sm:text-base mt-3 text-center max-w-md px-4">
          Technologies and tools I work with daily
        </p>
      </div>

      {/* Proficiency rings */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto w-full px-4 mb-14 sm:mb-20">
        {SKILLS.map((skill, index) => {
          const glow = GLOW_COLORS[skill.color] || "#10b981";

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassBox className="skill-ring-card w-[140px] sm:w-[180px] lg:w-[210px] py-6 sm:py-8 lg:py-10 px-3 sm:px-4 flex flex-col items-center justify-center group">
                {/* Ring container */}
                <div className="relative w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] lg:w-[150px] lg:h-[150px] mb-3 sm:mb-5">
                  {/* Outer glow layer — pulses on hover */}
                  <div
                    className="absolute -inset-2 sm:-inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: glow, opacity: undefined }}
                  />
                  <div
                    className="absolute -inset-1 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-md skill-glow-pulse"
                    style={{ background: glow }}
                  />

                  {/* Spinning arc highlight */}
                  <div
                    className="absolute inset-0 rounded-full skill-ring-spin"
                    style={{
                      background: `conic-gradient(from 0deg, transparent 0%, ${glow}44 10%, transparent 20%, transparent 100%)`,
                    }}
                  />

                  {/* Main conic gradient ring */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(from 220deg, ${glow} 0%, ${glow} ${skill.percentage}%, #1a1a1a ${skill.percentage}%, #1a1a1a 100%)`,
                      boxShadow: `0 0 20px ${glow}33, inset 0 0 15px ${glow}11`,
                    }}
                  />

                  {/* Bright tip at the end of the arc */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(from 220deg, transparent 0%, transparent ${Math.max(skill.percentage - 3, 0)}%, ${glow} ${skill.percentage}%, transparent ${Math.min(skill.percentage + 1, 100)}%, transparent 100%)`,
                      filter: `drop-shadow(0 0 6px ${glow})`,
                    }}
                  />

                  {/* Inner cutout */}
                  <div
                    className="absolute inset-[6px] sm:inset-[8px] lg:inset-[10px] rounded-full flex items-center justify-center"
                    style={{
                      background: `radial-gradient(circle at center, #0d0d0d 60%, ${glow}08 100%)`,
                    }}
                  >
                    <AnimatedPercentage target={skill.percentage} color={glow} />
                  </div>
                </div>

                {/* Skill name with color accent on hover */}
                <h3
                  className="text-gray-300 group-hover:text-white text-xs sm:text-sm lg:text-base font-medium tracking-wide uppercase font-outfit text-center transition-colors duration-300"
                >
                  {skill.name}
                </h3>

                {/* Colored underline that grows on hover */}
                <div
                  className="h-0.5 w-0 group-hover:w-8 sm:group-hover:w-10 rounded-full mt-1.5 transition-all duration-500"
                  style={{ background: glow }}
                />
              </GlassBox>
            </motion.div>
          );
        })}
      </div>

      {/* Skill category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto w-full px-4">
        {SKILL_CATEGORIES.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <GlassBox className="p-4 sm:p-5 hover:border-emerald-500/30 transition-colors duration-300 group h-full">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                  {CATEGORY_ICONS[category.icon]}
                </div>
                <h3 className="text-white text-sm sm:text-base font-semibold font-outfit">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 sm:px-2.5 py-1 text-[10px] sm:text-xs font-code rounded-md bg-white/5 border border-white/10 text-gray-400 group-hover:text-gray-300 group-hover:border-white/15 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlassBox>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

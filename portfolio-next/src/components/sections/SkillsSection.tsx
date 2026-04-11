"use client";

import { SKILLS } from "@/lib/data";
import GlitchText from "../ui/GlitchText";
import GlassBox from "../ui/GlassBox";
import { motion } from "framer-motion";

export default function SkillsSection() {
  return (
    <section id="Skills" className="py-24 relative z-10 w-full min-h-screen flex flex-col justify-center">
      <div className="flex flex-col items-center mb-16">
        <GlitchText text="My Skills" />
        <div className="h-1 w-24 bg-emerald-500 rounded mt-4" />
      </div>

      <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto w-full">
        {SKILLS.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GlassBox className="w-[240px] py-10 px-4 flex flex-col items-center justify-center hover:-translate-y-2 transition-transform duration-300">
              {/* Circular Progress mimicking legacy logic */}
              <div
                className="relative w-[150px] h-[150px] rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                style={{
                  background: `conic-gradient(from 0deg, ${skill.color} 0%, ${skill.color} ${skill.percentage}%, #222 ${skill.percentage}%, #222 100%)`,
                }}
              >
                {/* Inner cutout */}
                <div className="absolute inset-[10px] bg-[#111] rounded-full backdrop-blur-xl flex items-center justify-center">
                  <span className="text-white text-3xl font-bold font-outfit">
                    {skill.percentage}
                    <span className="text-sm font-light tracking-wide text-gray-400">%</span>
                  </span>
                </div>
              </div>
              <h3 className="text-white text-lg font-medium tracking-wide uppercase font-outfit text-center">
                {skill.name}
              </h3>
            </GlassBox>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { ACHIEVEMENTS } from "@/lib/data";
import GlitchText from "../ui/GlitchText";
import GlassBox from "../ui/GlassBox";
import { motion } from "framer-motion";

export default function AchievementsSection() {
  return (
    <section id="Achievements" className="py-24 relative z-10 w-full min-h-screen">
      <div className="flex flex-col items-center mb-16">
        <GlitchText text="Achievements" />
        <div className="h-1 w-24 bg-purple-500 rounded mt-4" />
      </div>

      <div className="max-w-4xl mx-auto space-y-16">
        {ACHIEVEMENTS.map((category, catIndex) => (
          <div key={category.title}>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-3xl font-bold text-white font-outfit mb-8 flex items-center gap-4"
            >
              <span className="w-8 h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded" />
              {category.title}
            </motion.h2>
            
            <div className="space-y-6 pl-2 md:pl-10 border-l-2 border-white/10">
              {category.items.map((item, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: itemIndex * 0.1 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[13px] md:-left-[45px] top-6 w-6 h-6 rounded-full bg-black border-4 border-purple-500" />
                  
                  <GlassBox className="p-6 md:p-8 ml-6 group transition-all hover:border-purple-500/30 w-full">
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <h3 className="text-xl font-bold text-emerald-400 font-outfit">{item.title}</h3>
                      {item.date && (
                        <span className="text-sm font-mono text-gray-400 bg-white/5 px-3 py-1 rounded mt-2 md:mt-0 self-start">
                          {item.date}
                        </span>
                      )}
                    </div>
                    
                    {'organization' in item && item.organization && (
                      <p className="text-white/80 font-medium mb-4">{item.organization as string}</p>
                    )}
                    
                    <ul className="list-disc list-outside ml-5 space-y-2 text-gray-400">
                      {item.details.map((detail, dIndex) => (
                        <li key={dIndex}>{detail}</li>
                      ))}
                    </ul>
                  </GlassBox>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { SOCIAL_LINKS } from "@/lib/data";
import GlitchText from "../ui/GlitchText";
import GlassBox from "../ui/GlassBox";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LinksSection() {
  return (
    <section id="Projects" className="py-24 relative z-10 w-full">
      <div className="flex flex-col items-center mb-16">
        <GlitchText text="My Links" />
        <div className="h-1 w-24 bg-sky-500 rounded mt-4" />
      </div>

      <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
        {SOCIAL_LINKS.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="block"
          >
            <GlassBox className="w-[300px] h-[350px] p-0 overflow-hidden group border-white/5 hover:border-sky-500/50 transition-colors">
              <div className="relative w-full h-[70%]">
                <Image
                  src={link.image}
                  alt={link.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-75 group-hover:brightness-100"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
              <div className="p-6 relative z-10 flex flex-col items-center justify-center -mt-10 h-[30%]">
                <h1 className="text-3xl font-bold font-outfit text-white group-hover:text-sky-400 transition-colors">
                  {link.name}
                </h1>
                {link.subtext && (
                  <p className="text-gray-400 text-sm mt-1">{link.subtext}</p>
                )}
              </div>
            </GlassBox>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

"use client";

import { SOCIAL_LINKS } from "@/lib/data";
import GlitchText from "../ui/GlitchText";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Mail } from "lucide-react";

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  linkedin: (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  github: (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  instagram: (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  mail: <Mail size={22} />,
};

export default function LinksSection() {
  return (
    <section
      id="Projects"
      className="py-16 sm:py-24 relative z-10 w-full"
    >
      {/* Section heading */}
      <div className="flex flex-col items-center mb-10 sm:mb-16">
        <GlitchText text="My Links" />
        <div className="h-1 w-24 bg-emerald-500 rounded mt-4" />
        <p className="text-gray-500 text-sm sm:text-base mt-3 text-center max-w-md px-4">
          Find me across the internet
        </p>
      </div>

      {/* Links grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
        {SOCIAL_LINKS.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.url}
            target={link.icon === "mail" ? undefined : "_blank"}
            rel={link.icon === "mail" ? undefined : "noreferrer"}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="link-card group relative block rounded-2xl overflow-hidden border border-white/5 hover:border-transparent transition-colors duration-500"
          >
            {/* Animated border glow on hover */}
            <div
              className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
              style={{
                background: `linear-gradient(135deg, ${link.color}66, transparent 40%, transparent 60%, ${link.color}66)`,
              }}
            />

            {/* Card inner */}
            <div className="relative z-[1] rounded-2xl overflow-hidden bg-neutral-950/90">
              {/* Background image */}
              <div className="relative w-full h-[180px] sm:h-[200px] overflow-hidden">
                {link.image ? (
                  <Image
                    src={link.image}
                    alt={link.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-50 group-hover:brightness-75"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                ) : (
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${link.color}22 0%, #0a0a0a 50%, ${link.color}11 100%)`,
                    }}
                  />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />

                {/* Floating glow orb on hover */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full opacity-0 group-hover:opacity-30 blur-[60px] transition-opacity duration-700 pointer-events-none"
                  style={{ background: link.color }}
                />

                {/* External link indicator */}
                {link.icon !== "mail" && (
                  <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-white/50 group-hover:text-white/90 transition-colors">
                    <ExternalLink size={14} />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="relative p-4 sm:p-5 -mt-10">
                <div className="flex items-center gap-3 mb-2">
                  {/* Icon with colored background */}
                  <div
                    className="p-2.5 rounded-xl transition-all duration-500 group-hover:shadow-lg"
                    style={{
                      backgroundColor: `${link.color}18`,
                      color: link.color,
                      boxShadow: undefined,
                    }}
                  >
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      {PLATFORM_ICONS[link.icon]}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold font-outfit text-white group-hover:text-white transition-colors">
                      {link.name}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm font-code truncate">
                      @{link.handle}
                    </p>
                  </div>
                </div>

                {/* Subtext + arrow */}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {link.subtext}
                  </p>
                  <motion.div
                    className="text-gray-600 group-hover:text-white transition-colors"
                    whileHover={{ x: 3 }}
                  >
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

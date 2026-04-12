"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import ScrambleText from "../ui/ScrambleText";
import { MapPin, Briefcase, Mail } from "lucide-react";

const TECH_STACK = [
  "React.js",
  "NestJS",
  "Spring Boot",
  "Node.js",
  "TypeScript",
  "MySQL",
];

export default function HeroSection() {
  const mousePosition = useMousePosition();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3D tilt only on large screens
  const isDesktop = windowSize.width >= 1024;
  const rotX =
    isDesktop && windowSize.height > 0
      ? -1 *
        (((mousePosition.y - windowSize.height / 2) /
          (windowSize.height / 2)) *
          12)
      : 0;
  const rotY =
    isDesktop && windowSize.width > 0
      ? ((mousePosition.x - windowSize.width / 2) /
          (windowSize.width / 2)) *
        12
      : 0;

  // Rotating words
  const words = ["Developer..", "Engineer..", "Creator.."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section
      id="Home"
      className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Main content wrapper */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Text Side */}
        <div className="flex-1 w-full space-y-5 sm:space-y-6 z-10 text-center lg:text-left">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs sm:text-sm font-code"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for opportunities
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1
              className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold font-outfit text-white leading-tight"
              id="names"
            >
              I&apos;m a&nbsp;
              <span
                key={currentWordIndex}
                className="hero-word"
                data-text={words[currentWordIndex]}
              >
                {words[currentWordIndex]}
              </span>
            </h1>
          </motion.div>

          {/* Scramble text + description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <ScrambleText
              initialText="Great Landing , Welcome !"
              targetText="Welcome to my portfolio !"
              className="text-xl sm:text-2xl md:text-3xl text-emerald-400 font-code transition-colors hover:text-white hover:bg-white/10 px-2 py-1 rounded inline-block cursor-default"
            />
            <p className="text-gray-400 text-sm sm:text-base md:text-lg font-inter max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Full Stack Developer building scalable and secure web applications
              with React.js, NestJS, Spring Boot, and Node.js.
            </p>
          </motion.div>

          {/* Role & Location info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-gray-500 text-xs sm:text-sm"
          >
            <span className="inline-flex items-center gap-1.5">
              <Briefcase size={14} className="text-purple-400" />
              SDE-I @ Schemax Tech
            </span>
            <span className="hidden sm:inline text-gray-700">|</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-pink-400" />
              Visakhapatnam, India
            </span>
          </motion.div>

          {/* Tech stack pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2"
          >
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[11px] sm:text-xs font-code rounded-md bg-white/5 border border-white/10 text-gray-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTA buttons + social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2"
          >
            <a
              href="#Contact"
              className="group relative px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-white text-sm sm:text-base rounded-xl bg-gradient-to-tr from-emerald-400 via-purple-600 to-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all"
            >
              <span className="relative z-10">Contact me</span>
              <div className="absolute inset-[2px] bg-black/80 backdrop-blur-md rounded-[10px] group-hover:bg-black/60 transition-colors z-0" />
              <span className="absolute z-10 inset-0 flex items-center justify-center pointer-events-none">
                Contact me
              </span>
            </a>
            <a
              href="https://drive.google.com/file/d/1jrKmpeooPkSKZ2JSEyqj--HtjDsv4rCu/view?usp=drive_link"
              target="_blank"
              rel="noreferrer"
              className="group relative px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-white text-sm sm:text-base rounded-xl bg-gradient-to-tr from-emerald-400 via-purple-600 to-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all"
            >
              <span className="relative z-10">My Resume</span>
              <div className="absolute inset-[2px] bg-black/80 backdrop-blur-md rounded-[10px] group-hover:bg-black/60 transition-colors z-0" />
              <span className="absolute z-10 inset-0 flex items-center justify-center pointer-events-none">
                My Resume
              </span>
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-2 ml-1">
              <a
                href="https://www.linkedin.com/in/b-neeraj-kumar/"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="LinkedIn"
              >
                <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a
                href="https://github.com/Joy-Boy-999s"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="GitHub"
              >
                <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
              <a
                href="mailto:b.neerajkumar.999@gmail.com"
                className="p-2 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right 3D Code Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex-1 w-full flex items-center justify-center z-10 relative"
          style={{ perspective: isDesktop ? "1500px" : undefined }}
        >
          {/* Subtle glow behind the box */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[300px] lg:w-[400px] h-[250px] sm:h-[300px] lg:h-[400px] bg-gradient-to-tr from-emerald-500 to-purple-500 rounded-full blur-[80px] lg:blur-[100px] opacity-15 lg:opacity-20 pointer-events-none" />

          <motion.div
            animate={{
              rotateX: rotX,
              rotateY: rotY,
            }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 30,
              mass: 0.5,
            }}
            className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[500px]"
            style={{
              transformStyle: isDesktop ? "preserve-3d" : undefined,
            }}
          >
            {/* Neon Animated Border */}
            <div className="absolute inset-[-1px] rounded-[16px] overflow-hidden shadow-[0_0_30px_rgba(255,0,221,0.2)] lg:shadow-[0_0_40px_rgba(255,0,221,0.3)]">
              <motion.div
                className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 origin-center"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0%, #00ffcc 25%, #ff00cc 50%, transparent 50%, transparent 100%)",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "linear",
                }}
              />
            </div>

            {/* Glass Background */}
            <div
              className="absolute inset-[1px] bg-neutral-950/90 backdrop-blur-2xl rounded-[15px]"
              style={{ transform: isDesktop ? "translateZ(0px)" : undefined }}
            />

            {/* Code content */}
            <div
              className="relative w-full p-4 sm:p-6 lg:p-8 font-jetbrains text-[11px] sm:text-[13px] lg:text-[15px] leading-relaxed flex flex-col justify-center"
              style={{
                transform: isDesktop ? "translateZ(40px)" : undefined,
              }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-white/10">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-gray-500 text-[10px] sm:text-xs">
                  about_me.py
                </span>
              </div>

              <CodeLine n={1}>
                <span className="text-emerald-500"># About me</span>
              </CodeLine>
              <CodeLine n={2}>
                <span className="text-sky-400">name</span>{" "}
                <span className="text-white">=</span>{" "}
                <span className="text-orange-400">
                  &quot;B.Neeraj Kumar&quot;
                </span>
              </CodeLine>
              <CodeLine n={3}>
                <span className="text-sky-400">role</span>{" "}
                <span className="text-white">=</span>{" "}
                <span className="text-orange-400">
                  &quot;Full Stack Developer&quot;
                </span>
              </CodeLine>
              <CodeLine n={4}>
                <span className="text-sky-400">company</span>{" "}
                <span className="text-white">=</span>{" "}
                <span className="text-orange-400">
                  &quot;Schemax Tech&quot;
                </span>
              </CodeLine>
              <CodeLine n={5}>
                <span className="text-sky-400">stack</span>{" "}
                <span className="text-white">=</span>{" "}
                <span className="text-yellow-400">[</span>
                <span className="text-orange-400">
                  &quot;React&quot;
                </span>
                <span className="text-white">,</span>{" "}
                <span className="text-orange-400">
                  &quot;NestJS&quot;
                </span>
                <span className="text-white">,</span>
              </CodeLine>
              <CodeLine n={6}>
                <span className="text-orange-400">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;Spring
                  Boot&quot;
                </span>
                <span className="text-white">,</span>{" "}
                <span className="text-orange-400">
                  &quot;Node.js&quot;
                </span>
                <span className="text-yellow-400">]</span>
              </CodeLine>
              <CodeLine n={7}>
                <span className="text-sky-400">passion</span>{" "}
                <span className="text-white">=</span>{" "}
                <span className="text-orange-400">
                  &quot;Building scalable apps&quot;
                </span>
              </CodeLine>
              <CodeLine n={8}>&nbsp;</CodeLine>
              <CodeLine n={9}>
                <span className="text-yellow-300">print</span>
                <span className="text-yellow-400">(</span>
                <span className="text-blue-600">f</span>
                <span className="text-orange-400">&quot;Hi! I&apos;m </span>
                <span className="text-pink-500">{"{"}</span>
                <span className="text-sky-400">name</span>
                <span className="text-pink-500">{"}"}</span>
                <span className="text-orange-400">,</span>
              </CodeLine>
              <CodeLine n={10}>
                <span className="text-orange-400">
                  &nbsp;&nbsp;a{" "}
                </span>
                <span className="text-pink-500">{"{"}</span>
                <span className="text-sky-400">role</span>
                <span className="text-pink-500">{"}"}</span>
                <span className="text-orange-400"> at </span>
                <span className="text-pink-500">{"{"}</span>
                <span className="text-sky-400">company</span>
                <span className="text-pink-500">{"}"}</span>
              </CodeLine>
              <CodeLine n={11}>
                <span className="text-orange-400">
                  &nbsp;&nbsp;who loves{" "}
                </span>
                <span className="text-pink-500">{"{"}</span>
                <span className="text-sky-400">passion</span>
                <span className="text-pink-500">{"}"}</span>
                <span className="text-orange-400">&quot;</span>
                <span className="text-yellow-400">)</span>
              </CodeLine>
              <CodeLine n={12}>&nbsp;</CodeLine>
              <CodeLine n={13} accent>
                <b className="text-white animate-pulse">|</b>
              </CodeLine>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CodeLine({
  n,
  accent,
  children,
}: {
  n: number;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <p className="whitespace-pre-wrap">
      <b
        className={`${accent ? "text-emerald-500" : "text-gray-500"} font-bold inline-block w-5 sm:w-6 lg:w-8 text-right select-none mr-2 sm:mr-3 lg:mr-4`}
      >
        {String(n).padStart(2, " ")}
      </b>
      {children}
    </p>
  );
}

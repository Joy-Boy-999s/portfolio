"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import GlassBox from "../ui/GlassBox";

export default function HeroSection() {
  const mousePosition = useMousePosition();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate 3D tilt
  const rotX = windowSize.height > 0 ? -1 * (((mousePosition.y - windowSize.height / 2) / (windowSize.height / 2)) * 15) : 0;
  const rotY = windowSize.width > 0 ? ((mousePosition.x - windowSize.width / 2) / (windowSize.width / 2)) * 15 : 0;

  // Words for typing effect
  const words = ["Coder..", "Editor..", "Creator.."];
  const [currentWordConfig, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section id="Home" className="min-h-screen flex flex-col lg:flex-row items-center justify-center pt-20 relatve overflow-hidden">
      
      {/* Left Text Side */}
      <div className="flex-1 w-full space-y-8 z-10">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold font-outfit text-white">
            I'm a <br />
            <span className="bg-gradient-to-r from-[#ffe100] to-[#ff00dd] bg-clip-text text-fill-transparent drop-shadow-[0_0_20px_rgba(255,0,221,0.5)]">
               {words[currentWordConfig]}
            </span>
          </h1>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl text-emerald-400 font-code transition-colors hover:text-white hover:bg-white/10 px-2 py-1 rounded inline-block cursor-default">
            Great Landing , Welcome !
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-inter max-w-md">
            Greetings, tech enthusiasts! I'm B.Neeraj Kumar.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <a
            href="#Contact"
            className="group relative px-6 py-3 font-semibold text-white rounded-xl bg-gradient-to-tr from-emerald-400 via-purple-600 to-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all"
          >
            <span className="relative z-10">Contact me</span>
            <div className="absolute inset-[2px] bg-black/80 backdrop-blur-md rounded-[10px] group-hover:bg-black/60 transition-colors z-0" />
            <span className="absolute z-10 inset-0 flex items-center justify-center pointer-events-none">Contact me</span>
          </a>
          <a
            href="https://drive.google.com/file/d/1jrKmpeooPkSKZ2JSEyqj--HtjDsv4rCu/view?usp=drive_link"
            target="_blank"
            rel="noreferrer"
            className="group relative px-6 py-3 font-semibold text-white rounded-xl bg-gradient-to-tr from-emerald-400 via-purple-600 to-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all"
          >
            <span className="relative z-10">My Resume</span>
            <div className="absolute inset-[2px] bg-black/80 backdrop-blur-md rounded-[10px] group-hover:bg-black/60 transition-colors z-0" />
            <span className="absolute z-10 inset-0 flex items-center justify-center pointer-events-none">My Resume</span>
          </a>
        </div>
      </div>

      {/* Right 3D Code Box */}
      <div className="flex-1 w-full hidden lg:flex items-center justify-center z-10 relative h-[500px]" style={{ perspective: "1500px" }}>
        
        {/* Subtle glow behind the box */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-emerald-500 to-purple-500 rounded-full blur-[80px] opacity-20" />

        <motion.div
          animate={{
            rotateX: rotX,
            rotateY: rotY,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30, mass: 0.5 }}
          className="relative w-full max-w-[450px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Neon Border equivalent via rotating pseudo-element if preferred, but a nice static colorful border is incredibly performant and modern. We'll use a multi-stop gradient border block instead of the heavy DOM iteration. */}
          <div className="absolute inset-[-4px] bg-gradient-to-r from-emerald-400 via-sky-400 to-fuchsia-500 rounded-2xl opacity-70 blur-[8px]" />
          <div className="absolute inset-[-2px] bg-gradient-to-r from-emerald-400 via-sky-400 to-fuchsia-500 rounded-2xl" />
          
          <GlassBox className="relative w-full h-[350px] p-6 font-jetbrains text-sm bg-neutral-900/90 shadow-2xl flex flex-col justify-center">
            <p className="text-gray-500 mb-2"><span className="mr-4">1</span><span className="text-emerald-500"># About me</span></p>
            <p className="mb-1"><span className="text-gray-500 mr-4">2</span><span className="text-sky-400">name</span> <span className="text-white">=</span> <span className="text-orange-400">"B.Neeraj Kumar"</span></p>
            <p className="mb-1"><span className="text-gray-500 mr-4">3</span><span className="text-sky-400">job</span> <span className="text-white">=</span> <span className="text-orange-400">"Aspiring Software Developer"</span></p>
            <p className="mb-1"><span className="text-gray-500 mr-4">4</span><span className="text-sky-400">hobby</span> <span className="text-white">=</span> <span className="text-orange-400">"Turning creative ideas </span></p>
            <p className="mb-1"><span className="text-gray-500 mr-4"> </span><span className="text-orange-400">           into reality through code"</span></p>
            <p className="mb-4"><span className="text-gray-500 mr-4">5</span><span className="text-sky-400">fav_lang</span> <span className="text-white">=</span> <span className="text-orange-400">"Python"</span></p>
            
            <p className="mb-1 line-clamp-3">
              <span className="text-gray-500 mr-4">6</span>
              <span className="text-yellow-200">print</span>
              <span className="text-yellow-400">(</span>
              <span className="text-blue-600">f</span>
              <span className="text-orange-400">"Hi there! I'm </span>
              <span className="text-pink-500">{'{'}</span><span className="text-sky-400">name</span><span className="text-pink-500">{'}'}</span>
              <span className="text-orange-400">. I'm an </span>
              <span className="text-pink-500">{'{'}</span><span className="text-sky-400">job</span><span className="text-pink-500">{'}'}</span>
              <span className="text-orange-400"> who enjoys </span>
              <span className="text-pink-500">{'{'}</span><span className="text-sky-400">hobby</span><span className="text-pink-500">{'}'}</span> 
              <span className="text-orange-400"> as a hobby with my favourite language </span>
              <span className="text-pink-500">{'{'}</span><span className="text-sky-400">fav_lang</span><span className="text-pink-500">{'}'}</span>
              <span className="text-orange-400">"</span>
              <span className="text-yellow-400">)</span>
            </p>
            <p className="mt-2"><span className="text-gray-500 mr-4">7</span><span className="text-white animate-pulse">|</span></p>
          </GlassBox>
        </motion.div>
      </div>
    </section>
  );
}

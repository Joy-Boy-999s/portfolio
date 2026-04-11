"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/sections/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import LinksSection from "@/components/sections/LinksSection";
import ContactSection from "@/components/sections/ContactSection";
import { ChevronUp } from "lucide-react";

export default function Home() {
  const [showToTop, setShowToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowToTop(true);
      } else {
        setShowToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <HeroSection />
      <SkillsSection />
      <AchievementsSection />
      <LinksSection />
      <ContactSection />
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[100] w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-110 ${
          showToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} strokeWidth={3} />
      </button>
    </>
  );
}

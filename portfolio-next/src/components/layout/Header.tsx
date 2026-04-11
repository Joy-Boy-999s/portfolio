"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#Home" },
  { name: "Skills", href: "#Skills" },
  { name: "Achievements", href: "#Achievements" },
  { name: "Links", href: "#Projects" },
  { name: "Contact Me", href: "#Contact" },
];

export default function Header() {
  const [activeSegment, setActiveSegment] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active segment tracker based on scroll position
      const sections = navItems.map((item) => item.href.substring(1));
      let current = sections[0];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      
      const activeItem = navItems.find((i) => i.href === `#${current}`);
      if (activeItem) setActiveSegment(activeItem.name);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 font-outfit ${
        isScrolled ? "bg-black/50 backdrop-blur-md py-4 shadow-lg shadow-black/20" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center w-full">
        <a href="#Home" className="text-2xl font-bold text-white z-50">
          B.Neeraj Kumar
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setActiveSegment(item.name)}
              className={`relative px-4 py-2 font-medium transition-colors ${
                activeSegment === item.name ? "text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {activeSegment === item.name && (
                <motion.div
                  layoutId="activeNavSegment"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {activeSegment === item.name ? (
                <span className="relative bg-gradient-to-r from-emerald-400 via-sky-400 to-fuchsia-500 bg-clip-text text-fill-transparent animate-gradient-pos font-bold">
                  {item.name}
                </span>
              ) : (
                <span className="relative">{item.name}</span>
              )}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Nav Overlay */}
        <div
          className={`fixed inset-0 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-opacity duration-300 md:hidden ${
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => {
                setActiveSegment(item.name);
                setMobileMenuOpen(false);
              }}
              className={`text-2xl font-bold ${
                activeSegment === item.name
                  ? "bg-gradient-to-r from-emerald-400 via-sky-400 to-fuchsia-500 bg-clip-text text-fill-transparent"
                  : "text-white/70"
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

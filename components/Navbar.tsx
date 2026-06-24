"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Menu, X, Download, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { name: "About", id: "about" },
  { name: "Experience", id: "experience" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Milestones", id: "milestones" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar at the top edge */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent-violet via-accent-indigo to-accent-cyan origin-left z-50"
        style={{ scaleX }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "glassmorphic py-4 shadow-lg shadow-black/10 border-b border-white/5"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-2xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-accent-violet via-accent-indigo to-accent-cyan font-outfit"
            >
              ANNA JOSE<span className="text-accent-cyan">.</span>
            </a>
          </motion.div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item, idx) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => handleNavClick(item.id)}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 cursor-pointer font-inter relative group"
              >
                {item.name}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-gradient-to-r from-accent-violet to-accent-cyan transition-all duration-300 group-hover:w-full" />
              </motion.button>
            ))}

            {/* Resume Button */}
            <motion.a
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              href="/Anna_Jose_Resume.pdf"
              download="Anna_Jose_Resume.pdf"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs font-semibold text-white rounded-full group bg-gradient-to-br from-accent-violet to-accent-cyan group-hover:from-accent-violet group-hover:to-accent-cyan hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-accent-violet/30 cursor-pointer transition-all duration-300"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-slate-950 rounded-full group-hover:bg-opacity-0 flex items-center gap-1.5">
                <Download size={14} className="group-hover:translate-y-[1px] transition-transform" />
                Resume
              </span>
            </motion.a>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glassmorphic border-b border-white/5 absolute top-full left-0 right-0 overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col px-6 py-6 space-y-4">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="text-left py-2 text-base font-medium text-slate-300 hover:text-white transition-colors duration-200 font-inter border-b border-white/5 last:border-0"
                  >
                    {item.name}
                  </button>
                ))}

                {/* Resume Download Mobile */}
                <a
                  href="/Anna_Jose_Resume.pdf"
                  download="Anna_Jose_Resume.pdf"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-accent-violet to-accent-cyan text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-violet/20 transition-all duration-300 font-inter"
                >
                  <Download size={16} />
                  Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

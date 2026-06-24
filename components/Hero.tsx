"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileText, Send } from "lucide-react";

export default function Hero() {
  const firstName = Array.from("ANNA");
  const lastName = Array.from("JOSE");

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Animation variants for letters
  // Animation variants for letters
  const letterVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-6 md:px-8 border-b border-white/5"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Intro Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glassmorphic border border-white/10 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-300 font-inter">
            AI/ML Developer &amp; Full-Stack Java Engineer
          </span>
        </motion.div>

        {/* Large Cinematic Typography Reveal */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight font-outfit select-none flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mb-6"
        >
          <span className="flex">
            {firstName.map((letter, idx) => (
              <motion.span
                key={`first-${idx}`}
                variants={letterVariants}
                className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 inline-block hover:text-accent-violet hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                {letter}
              </motion.span>
            ))}
          </span>
          <span className="flex">
            {lastName.map((letter, idx) => (
              <motion.span
                key={`last-${idx}`}
                variants={letterVariants}
                className="bg-clip-text text-transparent bg-gradient-to-r from-accent-violet via-accent-indigo to-accent-cyan inline-block hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Recruiter-Optimized Value Proposition */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="max-w-2xl text-lg md:text-xl text-slate-400 font-inter leading-relaxed mb-10"
        >
          I engineer high-accuracy deep learning models and type-safe Spring Boot enterprise 
          web applications, fusing algorithmic precision with responsive, performance-driven UIs.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Projects Button */}
          <button
            onClick={() => handleScrollTo("projects")}
            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 font-bold rounded-full hover:bg-slate-200 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 cursor-pointer font-outfit"
          >
            Explore Projects
            <ArrowDown size={18} />
          </button>

          {/* Resume CTA */}
          <a
            href="/Anna_Jose_Resume.pdf"
            download="Anna_Jose_Resume.pdf"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-white/10 hover:border-accent-violet text-white font-bold rounded-full hover:bg-slate-950 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-outfit"
          >
            <FileText size={18} className="text-accent-violet" />
            Get Resume
          </a>

          {/* Contact Button */}
          <button
            onClick={() => handleScrollTo("contact")}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-accent-violet to-accent-cyan hover:shadow-lg hover:shadow-accent-violet/30 text-white font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-outfit"
          >
            Let&apos;s Connect
            <Send size={16} />
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer pointer-events-auto"
          onClick={() => handleScrollTo("about")}
        >
          <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold font-inter hover:text-slate-300 transition-colors duration-200">
            Scroll to explore
          </span>
          <div className="w-[28px] h-[48px] rounded-full border-2 border-slate-700 flex justify-center p-1.5 hover:border-accent-cyan transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

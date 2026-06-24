"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calendar, Briefcase, MapPin } from "lucide-react";

const POSITIONS = [
  {
    role: "Java Intern",
    company: "Saasvaap Techies Private Limited",
    location: "Trivandrum, Kerala, India",
    period: "Dec 2024 - Jan 2025",
    tech: ["Java", "Spring Boot", "MySQL", "Thymeleaf", "HTML", "CSS", "JavaScript", "JDBC"],
    bullets: [
      "Completed hands-on training in Java-based full-stack web application development using Spring Boot, MySQL, HTML, CSS, and JavaScript.",
      "Built a Student Management System with user authentication and full CRUD functionality.",
      "Developed backend modules and RESTful APIs using Spring Boot to support application workflows and business logic.",
      "Integrated frontend and backend using Thymeleaf, creating responsive and user-friendly interfaces.",
      "Worked with JDBC and MySQL for database connectivity, query execution, and relational data handling.",
      "Strengthened problem-solving, debugging, and software development workflow skills through project-based implementation in a professional training environment.",
    ],
  },
];

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      id="experience"
      className="relative py-24 px-6 md:px-8 bg-slate-900/10 border-b border-white/5"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold tracking-widest uppercase text-accent-cyan font-inter"
          >
            Career Journey
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-outfit mt-3"
          >
            Professional Experience
          </motion.h3>
        </div>

        {/* Timeline List */}
        <div className="space-y-6 relative">
          {/* Vertical central connector line (visual only, hidden on mobile) */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "calc(100% - 12px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-[30px] top-6 w-[2px] bg-gradient-to-b from-accent-violet via-accent-indigo to-accent-cyan hidden md:block origin-top"
          />

          {POSITIONS.map((pos, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative pl-0 md:pl-16 group ${
                  isExpanded ? "z-10" : "z-0"
                }`}
              >
                {/* Timeline node icon (hidden on mobile) */}
                <div
                  className={`absolute left-[18px] top-7 w-[26px] h-[26px] rounded-full border-4 border-slate-950 flex items-center justify-center transition-all duration-300 hidden md:flex ${
                    isExpanded
                      ? "bg-accent-violet border-accent-violet shadow-[0_0_12px_rgba(139,92,246,0.6)]"
                      : "bg-slate-800 border-slate-700 group-hover:border-slate-500"
                  }`}
                >
                  <Briefcase size={10} className="text-white" />
                </div>

                {/* Accordion Card */}
                <div
                  onClick={() => toggleExpand(idx)}
                  className={`glassmorphic-card p-6 md:p-8 rounded-2xl cursor-pointer transition-all duration-300 ${
                    isExpanded
                      ? "border-accent-violet/30 bg-slate-900/40 shadow-[0_0_30px_rgba(139,92,246,0.05)]"
                      : "hover:border-white/10"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h4 className="text-xl font-bold text-white font-outfit">
                          {pos.role}
                        </h4>
                        <span className="text-sm font-semibold px-2.5 py-0.5 rounded bg-accent-violet/10 text-accent-violet border border-accent-violet/20 font-inter">
                          {pos.company}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-450 text-sm mt-2 font-inter">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {pos.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {pos.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end">
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`p-2 rounded-full bg-white/5 border border-white/5 text-slate-400 group-hover:text-white transition-colors`}
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {pos.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/5 font-inter"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Bullet Points */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 border-t border-white/5 mt-6 space-y-3">
                          {pos.bullets.map((bullet, bIdx) => (
                            <div
                              key={bIdx}
                              className="flex items-start gap-3 text-slate-350 text-sm md:text-base font-inter leading-relaxed"
                            >
                              <span className="text-accent-cyan mt-1.5 font-bold">•</span>
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

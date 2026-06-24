"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, GraduationCap, Trophy, GitCommit, BookOpen } from "lucide-react";

const MILESTONES = [
  {
    icon: <GraduationCap className="text-accent-indigo w-5 h-5" />,
    title: "Bachelor of Technology - Computer Science and Engineering",
    date: "July 2023 - June 2027",
    institution: "Mar Baselios College of Engineering and Technology",
    description: "Pursuing CSE with a strong academic standing (CGPA: 9.2). Coursework covers Object-Oriented Programming, Database Management Systems, Data Structures & Algorithms, and Neural Networks.",
  },
  {
    icon: <Award className="text-accent-violet w-5 h-5" />,
    title: "AI/ML and Satellite Imagery Research",
    date: "2024 - Present",
    institution: "Department of Computer Science / Directorate of Mining & Geology",
    description: "Designing satellite-based segmenters utilizing PyTorch and U-Net architectures for geological mining detection, alongside CNN-based emotion detectors trained on FER datasets.",
  },
  {
    icon: <Trophy className="text-accent-cyan w-5 h-5" />,
    title: "Enterprise Java Application Internship",
    date: "Dec 2024 - Jan 2025",
    institution: "Saasvaap Techies Private Limited",
    description: "Completed project-based training on Spring Boot MVC architectures, relational queries, database connectors (JDBC), and responsive frontends utilizing Thymeleaf and JavaScript.",
  },
  {
    icon: <BookOpen className="text-rose-400 w-5 h-5" />,
    title: "Avid Thriller & Mystery Reader",
    date: "Personal Interest",
    institution: "Logical Deduction & Plot Decoding",
    description: "Outside of writing code, I dive into psychological thrillers and mystery novels. Analyzing complex plots and twists fuels my critical deduction skills, directly translating to clean troubleshooting and system debugging.",
  },
];

function TextDecoder({ text }: { text: string }) {
  const [displayVal, setDisplayVal] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      setDisplayVal(text);
      return;
    }

    let iterations = 0;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

    const interval = setInterval(() => {
      setDisplayVal(
        text
          .split("")
          .map((char, idx) => {
            if (char === " ") return " ";
            if (idx < iterations) return text[idx];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iterations += 1 / 3;
      if (iterations >= text.length) {
        clearInterval(interval);
        setDisplayVal(text);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer"
    >
      {displayVal}
    </span>
  );
}

export default function Milestones() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const nodeVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="milestones"
      className="relative py-24 px-6 md:px-8 bg-slate-950/20 border-b border-white/5"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold tracking-widest uppercase text-accent-cyan font-inter"
          >
            Academic &amp; Awards
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-outfit mt-3"
          >
            Key Milestones
          </motion.h3>
        </div>

        {/* Milestone Vertical Chain */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative ml-4 md:ml-8 space-y-12 py-2"
        >
          {/* Vertical central connector line (visual only) */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "calc(100% - 24px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-0 top-2 w-[1px] bg-gradient-to-b from-accent-violet via-accent-indigo to-accent-cyan origin-top"
          />
          {MILESTONES.map((ms, idx) => (
            <motion.div
              key={idx}
              variants={nodeVariants}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Vertical connector bullet */}
              <div className={`absolute left-[-17px] top-1.5 w-[34px] h-[34px] rounded-full border bg-slate-950 flex items-center justify-center transition-all duration-300 ${
                ms.title.includes("Thriller")
                  ? "border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)] animate-pulse"
                  : "border-slate-800 group-hover:border-accent-cyan group-hover:shadow-[0_0_12px_rgba(6,182,212,0.4)]"
              }`}>
                {ms.icon}
              </div>

              {/* Content Panel */}
              <div className={`glassmorphic-card p-6 rounded-2xl hover:border-white/10 transition-colors ${
                ms.title.includes("Thriller") ? "hover:border-rose-500/30 hover:shadow-[0_0_25px_rgba(244,63,94,0.08)]" : ""
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h4 className="text-lg font-bold text-white font-outfit group-hover:text-accent-cyan transition-colors">
                    <TextDecoder text={ms.title} />
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 font-inter">
                      {ms.date}
                    </span>
                  </div>
                </div>

                <div className="text-xs font-bold text-slate-300 mb-2 font-inter">
                  {ms.institution}
                </div>

                <p className="text-sm text-slate-400 font-inter leading-relaxed">
                  {ms.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Award, Code2, Cpu, Zap } from "lucide-react";

const METRICS = [
  {
    icon: <Award className="text-accent-violet w-6 h-6" />,
    value: "9.2",
    label: "B.Tech CGPA",
    description: "Computer Science & Engineering",
  },
  {
    icon: <Code2 className="text-accent-cyan w-6 h-6" />,
    value: "3+",
    label: "Deep Learning Models",
    description: "CNNs & U-Net Segmentation",
  },
  {
    icon: <Zap className="text-amber-400 w-6 h-6" />,
    value: "100%",
    label: "Full-Stack Ready",
    description: "Spring Boot Ecosystem",
  },
  {
    icon: <Cpu className="text-accent-indigo w-6 h-6" />,
    value: "5+",
    label: "Core Languages",
    description: "Python, Java, SQL, JS, C, R",
  },
];

function AnimatedCounter({ value }: { value: string }) {
  const [displayVal, setDisplayVal] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const numMatch = value.match(/^([0-9.]+)(.*)$/);
    if (!numMatch) {
      setDisplayVal(value);
      return;
    }

    const target = parseFloat(numMatch[1]);
    const suffix = numMatch[2] || "";
    const isDecimal = numMatch[1].includes(".");

    const controls = animate(0, target, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayVal(
          isDecimal
            ? latest.toFixed(1) + suffix
            : Math.floor(latest).toString() + suffix
        );
      },
    });

    return () => controls.stop();
  }, [isInView, value]);

  return <span ref={ref}>{displayVal}</span>;
}

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      id="about"
      className="relative py-24 px-6 md:px-8 bg-slate-950/20 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6">
            <motion.h2
              variants={itemVariants}
              className="text-sm font-bold tracking-widest uppercase text-accent-cyan font-inter"
            >
              Professional Mission
            </motion.h2>

            <motion.h3
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-outfit leading-tight"
            >
              Fusing Intelligent AI/ML Architectures with Scalable Full-Stack Engineering.
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-350 font-inter leading-relaxed"
            >
              I am a Software Engineer and Deep Learning enthusiast dedicated to crafting data-driven web applications and scalable neural models. I specialize in building with **Python**, **PyTorch**, **TensorFlow**, and **Spring Boot**, ensuring that every pipeline is optimized, reliable, and addresses real-world challenges cleanly.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base text-slate-400 font-inter leading-relaxed"
            >
              Beyond training neural architectures, my technical philosophy centers around high-scannability codebase designs, accessible data systems, and efficient backend workflows. Whether it&apos;s developing computer vision solutions or semantic image segmentation pipelines for geographic tracking, I focus on delivering clean, modular projects that ease team collaboration.
            </motion.p>
          </div>

          {/* Right Metrics Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {METRICS.map((metric, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glassmorphic-card p-6 rounded-2xl flex flex-col justify-between h-[180px] hover:translate-y-[-4px] transition-transform duration-300 relative overflow-hidden group"
              >
                {/* Subtle card glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="flex items-center justify-between">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
                    {metric.icon}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-4xl font-extrabold text-white tracking-tight font-outfit">
                    <AnimatedCounter value={metric.value} />
                  </div>
                  <div className="text-sm font-bold text-slate-200 mt-1 font-inter">
                    {metric.label}
                  </div>
                  <div className="text-xs text-slate-450 mt-0.5 font-inter">
                    {metric.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

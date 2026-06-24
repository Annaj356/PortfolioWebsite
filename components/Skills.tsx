"use client";

import { motion } from "framer-motion";
import { Layout, Server, Paintbrush, ShieldCheck } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    title: "Core Languages",
    icon: <Layout className="text-accent-violet w-6 h-6" />,
    skills: [
      { name: "Python", desc: "Machine learning, AI models & data analysis" },
      { name: "Java", desc: "Full-stack development & enterprise patterns" },
      { name: "SQL", desc: "Structured database queries & design" },
      { name: "C", desc: "System-level operations & microcontrollers" },
      { name: "JavaScript", desc: "Client-side interactivity & scripts" },
      { name: "R", desc: "Statistical modeling & computations" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: <Server className="text-accent-cyan w-6 h-6" />,
    skills: [
      { name: "Spring Boot", desc: "Enterprise MVC backends & RESTful APIs" },
      { name: "TensorFlow & Keras", desc: "CNN image classifiers & deep learning" },
      { name: "PyTorch", desc: "Pixel-level semantic U-Net segmentation" },
      { name: "Scikit-Learn", desc: "Statistical algorithms & data preprocessing" },
      { name: "Flask", desc: "Lightweight Python microservices" },
      { name: "Thymeleaf", desc: "Java server-side HTML page templating" },
      { name: "JDBC", desc: "Database connectivity & connection pools" },
    ],
  },
  {
    title: "Databases & Tools",
    icon: <Paintbrush className="text-accent-indigo w-6 h-6" />,
    skills: [
      { name: "PostgreSQL & MySQL", desc: "Relational database server management" },
      { name: "Git & GitHub", desc: "Version control, commits & pull requests" },
      { name: "MySQL Workbench", desc: "Visual schema layouts & query testing" },
      { name: "IntelliJ IDEA & VS Code", desc: "Primary IDEs & extensions pipelines" },
      { name: "Postman", desc: "API request verification & mocking" },
      { name: "Linux, Windows & AWS", desc: "Operating environments & cloud hosts" },
      { name: "Arduino", desc: "Microcontroller circuits & firmware" },
    ],
  },
];

export default function Skills() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="skills"
      className="relative py-24 px-6 md:px-8 bg-slate-950/40 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold tracking-widest uppercase text-accent-cyan font-inter"
          >
            Technical Arsenal
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-outfit mt-3"
          >
            Categorized Expertise
          </motion.h3>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {SKILL_CATEGORIES.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: catIdx * 0.15 }}
              className="flex flex-col h-full"
            >
              {/* Category Title */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                  {category.icon}
                </div>
                <h4 className="text-xl font-bold text-white font-outfit">
                  {category.title}
                </h4>
              </div>

              {/* Skills List */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-3.5 flex-grow"
              >
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skillIdx}
                    variants={cardVariants}
                    className="glassmorphic-card p-4 rounded-xl flex items-center justify-between hover:scale-[1.02] hover:translate-x-1 duration-200 transition-all group relative overflow-hidden"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white group-hover:text-accent-cyan transition-colors font-outfit">
                        {skill.name}
                      </span>
                      <span className="text-xs text-slate-450 mt-0.5 font-inter">
                        {skill.desc}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                      <ShieldCheck size={14} className="text-accent-cyan" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

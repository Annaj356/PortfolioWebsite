"use client";

import { useState } from "react";
import { motion as fm, AnimatePresence as AP } from "framer-motion";
import { ExternalLink, Layers } from "lucide-react";

const CATEGORIES = ["All", "AI/ML", "Full-Stack"];

const PROJECTS = [
  {
    id: 1,
    title: "Mining Area Detection using U-Net (Ongoing)",
    desc: "Satellite image-based mining area detection system using U-Net for semantic segmentation, with domain guidance from the Directorate of Mining & Geology, Thiruvananthapuram. Training the model on 256x256 image inputs for pixel-level classification.",
    category: "AI/ML",
    tech: ["Python", "PyTorch", "OpenCV", "NumPy", "Matplotlib"],
    demo: "https://github.com/Annaj356",
    repo: "https://github.com/Annaj356",
  },
  {
    id: 2,
    title: "Facial Emotion Recognition",
    desc: "Developed a facial emotion recognition system using Python and CNN-based deep learning for image classification. Trained on 41,200 facial images across 7 emotion classes. Implemented an OpenCV computer vision pipeline for preprocessing, feature extraction, and prediction.",
    category: "AI/ML",
    tech: ["Python", "TensorFlow", "Keras", "OpenCV", "NumPy", "Matplotlib"],
    demo: "https://github.com/Annaj356",
    repo: "https://github.com/Annaj356",
  },
  {
    id: 3,
    title: "Lost and Found in a Campus",
    desc: "Campus-based Lost and Found web application to streamline reporting and tracking of lost property. Designed 2 core database modules for securely managing records. Implemented user authentication, image upload, and NLP-based matching.",
    category: "Full-Stack",
    tech: ["Spring Boot", "MySQL", "HTML", "CSS", "JavaScript"],
    demo: "https://github.com/Annaj356",
    repo: "https://github.com/Annaj356",
  },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects =
    activeTab === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeTab);

  return (
    <section
      id="projects"
      className="relative py-24 px-6 md:px-8 bg-slate-900/10 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <fm.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm font-bold tracking-widest uppercase text-accent-cyan font-inter"
            >
              Selected Works
            </fm.h2>
            <fm.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-outfit mt-3"
            >
              Engineering &amp; UX Showcases
            </fm.h3>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 glassmorphic border border-white/5 rounded-xl self-start md:self-auto">
            {CATEGORIES.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-300 cursor-pointer font-outfit relative ${
                  activeTab === tab ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {activeTab === tab && (
                  <fm.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-gradient-to-r from-accent-violet to-accent-indigo rounded-lg -z-10 shadow-md"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid Container with AnimatePresence */}
        <fm.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          <AP mode="popLayout">
            {filteredProjects.map((project) => (
              <fm.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="glassmorphic-card p-6 rounded-2xl flex flex-col justify-between group relative overflow-hidden h-[340px]"
              >
                {/* Visual Category Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-accent-cyan text-xs font-bold font-inter uppercase tracking-wider">
                    <Layers size={12} />
                    {project.category}
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.repo}
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Opening GitHub: ${project.repo}`);
                      }}
                      className="text-slate-400 hover:text-white transition-colors"
                      title="View Repository"
                      aria-label="GitHub Repository"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-github"
                      >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </a>
                    <a
                      href={project.demo}
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Opening Live Demo: ${project.demo}`);
                      }}
                      className="text-slate-400 hover:text-white transition-colors"
                      title="Launch Demo"
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                <div className="my-4 flex-grow flex flex-col justify-center">
                  <h4 className="text-xl font-bold text-white font-outfit mb-2 group-hover:text-accent-cyan transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-sm text-slate-350 font-inter line-clamp-3 leading-relaxed">
                    {project.desc}
                  </p>
                </div>

                {/* Tech tags */}
                <div className="pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5 font-inter"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </fm.div>
            ))}
          </AP>
        </fm.div>
      </div>
    </section>
  );
}

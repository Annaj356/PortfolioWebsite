import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Milestones from "../components/Milestones";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20">
        <h1 className="sr-only">Anna Jose Portfolio - Elite Creative Frontend Engineer &amp; UX Architect</h1>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Milestones />
        <Contact />
      </main>

      {/* Premium Glassmorphic Footer */}
      <footer className="glassmorphic py-10 px-6 md:px-8 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-lg font-bold text-white font-outfit">
              ANNA JOSE<span className="text-accent-cyan">.</span>
            </div>
            <p className="text-xs text-slate-450 mt-1.5 font-inter">
              Designed with precision. Coded with strict type safety.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-400 font-inter">
            <a
              href="#about"
              className="hover:text-white transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#experience"
              className="hover:text-white transition-colors duration-200"
            >
              Experience
            </a>
            <a
              href="#skills"
              className="hover:text-white transition-colors duration-200"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="hover:text-white transition-colors duration-200"
            >
              Projects
            </a>
          </div>

          <div className="text-center md:text-right">
            <div className="text-xs text-slate-500 font-inter">
              &copy; {new Date().getFullYear()} Anna Jose. All rights reserved.
            </div>
            <div className="text-[10px] text-slate-600 mt-1 font-inter">
              Built on Next.js 15 &amp; Tailwind CSS v4.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

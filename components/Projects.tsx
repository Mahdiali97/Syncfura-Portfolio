"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

interface Project {
  id: string;
  title: string;
  teaser: string;
  description: string;
  tools: string[];
  image: string;
  category: string;
  accentFrom: string;
  accentTo: string;
}

const projects: Project[] = [
  {
    id: "smartexam",
    title: "SmartExamDuty",
    teaser: "Automated teacher invigilation scheduling.",
    description: "A web-based platform that automates the full lifecycle of teacher invigilation scheduling—from initial duty assignment and clash detection through to last-minute replacements.

Use Case: Administrators gain a live dashboard view of all upcoming exams, pending slots, and confirmed invigilators, eliminating manual scheduling conflicts.",
    tools: ["Laravel", "MySQL", "Blade", "HTML/CSS", "JavaScript"],
    image: "/Projects/SmartExamDuty.png",
    category: "Web Platform",
    accentFrom: "#6366f1",
    accentTo: "#8b5cf6",
  },
  {
    id: "wattaware",
    title: "WattAware",
    teaser: "Energy literacy & simulated billing platform.",
    description: "A mobile application designed to bring energy literacy to students and home users through a playful, gamified interface.

Use Case: Users log appliances to understand consumption patterns via interactive lesson modules, simulate monthly bills, and receive personalized energy-saving tips.",
    tools: ["Flutter", "Firebase"],
    image: "/Projects/WattAware.jpeg",
    category: "Mobile App",
    accentFrom: "#3b82f6",
    accentTo: "#2dd4bf",
  },
  {
    id: "myaid",
    title: "MYAid",
    teaser: "Paperless disaster relief registration platform.",
    description: "A cross-platform mobile solution that completely replaces paper-based intake forms at disaster relief centres.

Use Case: Enables on-site volunteers to register evacuees digitally, auto-validates data, and syncs records in real-time to a central dashboard to accelerate aid distribution.",
    tools: ["Flutter", "Firebase"],
    image: "/Projects/MYAid.jpeg",
    category: "Mobile App",
    accentFrom: "#f43f5e",
    accentTo: "#f97316",
  },
  {
    id: "nadiputra",
    title: "NadiPutra Rider",
    teaser: "Real-time Putrajaya bus transit tracking.",
    description: "A public transit companion app engineered specifically for Putrajaya bus passengers to eliminate wait-time uncertainty.

Use Case: Shows live bus positions on a map, calculates optimal routes, displays nearby stops, and leverages RESTful transit APIs for low-latency position updates.",
    tools: ["REST API", "Mobile Transit"],
    image: "/Projects/NadiPutra.jpeg",
    category: "Mobile App",
    accentFrom: "#8b5cf6",
    accentTo: "#ec4899",
  },
  {
    id: "gepcrm",
    title: "GEP CRM System",
    teaser: "Subscriber management platform.",
    description: "A full-featured Customer Relationship Management system built for the GEP platform, handling company-level subscriber management, zone assignment, and automated invoicing.

Use Case: Integrates deeply with the GEP Next security operations module. It features two-factor authentication, smart alerts, and strict UI logic where selecting 'continue overtime' instantly triggers a dedicated Clock-In screen rather than just recording a static note.",
    tools: ["React", "TypeScript", "MySQL"],
    image: "/Projects/GEPCRMSystem.png",
    category: "Web Platform",
    accentFrom: "#06b6d4",
    accentTo: "#3b82f6",
  },
  {
    id: "uniperks",
    title: "UniPerks",
    teaser: "University merchandise e-commerce platform.",
    description: "Our proprietary e-commerce application dedicated entirely to promoting and scaling university merchandise sales.

Use Case: Built from the ground up with comprehensive SRS and SDD documentation, this platform introduces an AI virtual try-on feature to revolutionize how students interact with university apparel.",
    tools: ["E-commerce", "AI Virtual Try-On", "Mobile"],
    image: "/hero-backbone.jpg",
    category: "E-Commerce",
    accentFrom: "#10b981",
    accentTo: "#3b82f6",
  }
];

const toolColors: Record<string, string> = {
  Laravel: "bg-red-50 text-red-600 border-red-200",
  MySQL: "bg-blue-50 text-blue-600 border-blue-200",
  Blade: "bg-orange-50 text-orange-600 border-orange-200",
  "HTML/CSS": "bg-amber-50 text-amber-600 border-amber-200",
  JavaScript: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Flutter: "bg-sky-50 text-sky-600 border-sky-200",
  Firebase: "bg-orange-50 text-orange-500 border-orange-200",
  "RESTful APIs": "bg-green-50 text-green-600 border-green-200",
  React: "bg-cyan-50 text-cyan-600 border-cyan-200",
  TypeScript: "bg-blue-50 text-blue-700 border-blue-200",
};

function ToolBadge({ tool }: { tool: string }) {
  const cls =
    toolColors[tool] ?? "bg-violet-50 text-violet-600 border-violet-200";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${cls}`}
    >
      {tool}
    </span>
  );
}

/* ── Modal ─────────────────────────────────────────────────────────── */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
      style={{
        backgroundColor: "rgba(26,26,46,0.55)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      {/* Modal panel */}
      <div
        className="modal-scroll relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/80 bg-white shadow-2xl"
        style={{
          boxShadow: `0 32px 80px -12px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.9) inset, 0 0 60px -20px ${project.accentFrom}33`,
          animation: "modal-in 0.25s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 grid place-items-center w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-all"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Full image - no cropping */}
        <div
          className="rounded-t-3xl overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.accentFrom}12, ${project.accentTo}12)`,
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={900}
            className="w-full h-auto"
            style={{ display: "block" }}
          />
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 pb-8 pt-5 space-y-5">
          {/* Category */}
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-semibold tracking-widest uppercase"
            style={{
              background: `${project.accentFrom}12`,
              borderColor: `${project.accentFrom}35`,
              color: project.accentFrom,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: project.accentFrom }}
            />
            {project.category}
          </span>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-slate-600 leading-relaxed text-base">
            {project.description}
          </p>

          {/* Tools */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 mb-3">
              Built With
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <ToolBadge key={tool} tool={tool} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ── Compact Project Card ──────────────────────────────────────────── */
function ProjectCard({
  project,
  onClick,
  index,
}: {
  project: Project;
  onClick: () => void;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.08}>
      <button
        onClick={onClick}
        className="group w-full text-left rounded-2xl border border-slate-200 overflow-hidden bg-white transition-all duration-300 hover:border-slate-300 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        aria-label={`View ${project.title} details`}
      >
        {/* Thumbnail */}
        <div
          className="relative h-44 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.accentFrom}12, ${project.accentTo}12)`,
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          {/* Bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
        </div>

        {/* Card body */}
        <div className="p-5">
          {/* Category pill */}
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase mb-3"
            style={{
              background: `${project.accentFrom}10`,
              borderColor: `${project.accentFrom}35`,
              color: project.accentFrom,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: project.accentFrom }}
            />
            {project.category}
          </span>

          <h3 className="text-slate-900 font-bold text-lg leading-snug group-hover:text-violet-700 transition-colors duration-200">
            {project.title}
          </h3>
          <p className="mt-1.5 text-slate-500 text-sm leading-relaxed line-clamp-2">
            {project.teaser}
          </p>

          {/* View details row */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-medium">
              {project.tools.length} technologies
            </span>
            <span
              className="inline-flex items-center gap-1 text-[11px] font-semibold rounded-full border px-3 py-1 transition-all duration-200"
              style={{
                color: project.accentFrom,
                borderColor: `${project.accentFrom}35`,
                background: `${project.accentFrom}08`,
              }}
            >
              View details <ArrowUpRight size={11} />
            </span>
          </div>
        </div>
      </button>
    </Reveal>
  );
}

/* ── Section ───────────────────────────────────────────────────────── */

import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="projects" className="py-32 bg-[#FAFAFC] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-neutral-950">Selected Works</h2>
            <p className="text-xl text-neutral-500 mt-4 max-w-xl">A showcase of scalable platforms, mobile applications, and intelligent systems engineered for the modern enterprise.</p>
          </div>
        </motion.div>
        
        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              layoutId={`card-container-${p.id}`}
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className="group relative cursor-pointer flex flex-col bg-white/50 backdrop-blur-sm rounded-3xl border border-neutral-200/50 hover:border-purple-300/50 transition-colors duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_bottom,rgba(124,58,237,0.08)_0,transparent_60%)] pointer-events-none" />
              
              <motion.div layoutId={`image-container-${p.id}`} className="relative h-64 w-full overflow-hidden bg-neutral-100">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </motion.div>
              
              <div className="p-8 flex flex-col flex-grow relative z-10">
                <motion.h3 layoutId={`title-${p.id}`} className="text-2xl font-bold tracking-tight text-neutral-900 mb-2">
                  {p.title}
                </motion.h3>
                <motion.p layoutId={`desc-${p.id}`} className="text-neutral-500 mb-6 flex-grow">
                  {p.teaser}
                </motion.p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {p.tools.slice(0, 3).map(tag => (
                    <span key={tag} className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-medium border border-neutral-200/50">
                      {tag}
                    </span>
                  ))}
                  {p.tools.length > 3 && (
                    <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-medium border border-neutral-200/50">
                      +{p.tools.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Modal (AnimatePresence) */}
      <AnimatePresence>
        {selectedId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xl cursor-pointer"
              onClick={() => setSelectedId(null)}
            />
            
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 pointer-events-none">
              {projects.filter(p => p.id === selectedId).map(p => (
                <motion.div
                  layoutId={`card-container-${p.id}`}
                  key={p.id}
                  className="bg-white w-full max-w-6xl max-h-[90vh] rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl pointer-events-auto relative"
                  transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
                >
                  <button 
                    onClick={() => setSelectedId(null)}
                    className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/50 backdrop-blur-md border border-neutral-200/50 rounded-full flex items-center justify-center text-neutral-900 hover:bg-white hover:scale-110 transition-all duration-300"
                  >
                    <X size={20} />
                  </button>

                  <motion.div layoutId={`image-container-${p.id}`} className="w-full md:w-1/2 relative h-64 md:h-full bg-neutral-100">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </motion.div>

                  <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto bg-white flex flex-col">
                    <motion.h3 layoutId={`title-${p.id}`} className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 mb-4">
                      {p.title}
                    </motion.h3>
                    <motion.p layoutId={`desc-${p.id}`} className="text-xl text-neutral-500 mb-8 font-medium">
                      {p.teaser}
                    </motion.p>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="space-y-8"
                    >
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-3">Overview & Logic</h4>
                        <p className="text-neutral-600 leading-relaxed text-lg whitespace-pre-line">{p.description}</p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-4">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {p.tools.map(tag => (
                            <span key={tag} className="px-4 py-2 bg-neutral-50 text-neutral-700 rounded-lg text-sm font-semibold border border-neutral-200/50">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

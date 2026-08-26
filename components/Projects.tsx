"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

interface Project {
  id: number;
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
    id: 1,
    title: "SmartExamDuty",
    teaser: "Automated teacher invigilation scheduling for exam duty management.",
    description:
      "A web-based platform that automates the full lifecycle of teacher invigilation scheduling — from initial duty assignment and clash detection through to last-minute replacements and real-time tracking. Administrators gain a live dashboard view of all upcoming exams, pending slots, and confirmed invigilators.",
    tools: ["Laravel", "MySQL", "Blade", "HTML/CSS", "JavaScript"],
    image: "/projects/project1.png",
    category: "Web Platform",
    accentFrom: "#6366f1",
    accentTo: "#8b5cf6",
  },
  {
    id: 2,
    title: "WattAware",
    teaser: "Smart energy app helping users monitor household electricity usage.",
    description:
      "A mobile application designed to bring energy literacy to students and home users. WattAware lets users log appliances, understand consumption patterns through interactive lesson modules, simulate monthly bills, and receive personalised energy-saving tips — all in a playful, gamified interface.",
    tools: ["Flutter", "Firebase"],
    image: "/projects/project2.png",
    category: "Mobile App",
    accentFrom: "#10b981",
    accentTo: "#06b6d4",
  },
  {
    id: 3,
    title: "MYAid",
    teaser: "Digitizes disaster-relief centre registration to cut data errors.",
    description:
      "A cross-platform mobile solution that replaces paper-based intake forms at disaster relief centres. MYAid enables on-site volunteers to register evacuees digitally, auto-validates data, and syncs records in real-time to a central dashboard — dramatically reducing errors and accelerating the distribution of aid.",
    tools: ["Flutter", "Firebase"],
    image: "/projects/project3.png",
    category: "Mobile App",
    accentFrom: "#3b82f6",
    accentTo: "#6366f1",
  },
  {
    id: 4,
    title: "NadiPutra Rider",
    teaser: "Real-time bus tracking & route planning app for Putrajaya.",
    description:
      "A public transit companion app for Putrajaya bus passengers. The app shows live bus positions on a map, calculates optimal routes, displays nearby stops, and lets riders share trip plans with friends. Built with RESTful transit APIs for accurate, low-latency position updates.",
    tools: ["Flutter", "Firebase", "RESTful APIs"],
    image: "/projects/project4.png",
    category: "Mobile App",
    accentFrom: "#7c3aed",
    accentTo: "#a855f7",
  },
  {
    id: 5,
    title: "CRM System",
    teaser: "GEP subscriber management with zone tracking & invoicing.",
    description:
      "A full-featured Customer Relationship Management system built for the GEP platform. It provides company-level subscriber management, geographic zone assignment, on-site premise tracking, automated invoice generation, and role-based access control — giving the operations team a single source of truth for all client activity.",
    tools: ["React", "TypeScript", "MySQL"],
    image: "/projects/project5.png",
    category: "Web Platform",
    accentFrom: "#f43f5e",
    accentTo: "#ec4899",
  },
];

const toolColors: Record<string, string> = {
  Laravel: "bg-red-500/15 text-red-300 border-red-400/30",
  MySQL: "bg-blue-500/15 text-blue-300 border-blue-400/30",
  Blade: "bg-orange-500/15 text-orange-300 border-orange-400/30",
  "HTML/CSS": "bg-amber-500/15 text-amber-300 border-amber-400/30",
  JavaScript: "bg-yellow-500/15 text-yellow-300 border-yellow-400/30",
  Flutter: "bg-sky-500/15 text-sky-300 border-sky-400/30",
  Firebase: "bg-orange-400/15 text-orange-300 border-orange-400/30",
  "RESTful APIs": "bg-green-500/15 text-green-300 border-green-400/30",
  React: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
  TypeScript: "bg-blue-400/15 text-blue-200 border-blue-400/30",
};

function ToolBadge({ tool }: { tool: string }) {
  const cls = toolColors[tool] ?? "bg-violet-500/15 text-violet-300 border-violet-400/30";
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${cls}`}>
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

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: "rgba(8,6,26,0.80)", backdropFilter: "blur(12px)" }}
    >
      {/* Modal panel */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(24px)",
          boxShadow: `0 32px 80px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 60px -20px ${project.accentFrom}55`,
          animation: "modal-in 0.25s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 grid place-items-center w-9 h-9 rounded-full bg-white/8 border border-white/12 text-white/60 hover:text-white hover:bg-white/15 transition-all"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Hero image — full natural size, no cropping */}
        <div
          className="rounded-t-3xl overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.accentFrom}22, ${project.accentTo}22)`,
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
              background: `${project.accentFrom}18`,
              borderColor: `${project.accentFrom}40`,
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
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-slate-300 leading-relaxed text-base">
            {project.description}
          </p>

          {/* Tools */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-3">
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
        className="group w-full text-left rounded-2xl border border-white/8 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_40px_-12px_rgba(124,58,237,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
        }}
        aria-label={`View ${project.title} details`}
      >
        {/* Thumbnail */}
        <div
          className="relative h-44 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.accentFrom}18, ${project.accentTo}18)`,
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          {/* Bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08061a]/60 via-transparent to-transparent" />
        </div>

        {/* Card body */}
        <div className="p-5">
          {/* Category pill — clearly visible on dark background */}
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase mb-3"
            style={{
              background: `${project.accentFrom}18`,
              borderColor: `${project.accentFrom}40`,
              color: project.accentFrom,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: project.accentFrom }}
            />
            {project.category}
          </span>

          <h3 className="text-white font-bold text-lg leading-snug group-hover:text-violet-200 transition-colors duration-200">
            {project.title}
          </h3>
          <p className="mt-1.5 text-slate-400 text-sm leading-relaxed line-clamp-2">
            {project.teaser}
          </p>

          {/* View details row */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-medium">
              {project.tools.length} technologies
            </span>
            <span
              className="inline-flex items-center gap-1 text-[11px] font-semibold rounded-full border px-3 py-1 transition-all duration-200 group-hover:shadow-[0_0_12px_-2px_var(--accent)]"
              style={{
                color: project.accentFrom,
                borderColor: `${project.accentFrom}35`,
                background: `${project.accentFrom}10`,
                // @ts-ignore
                "--accent": project.accentFrom,
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
export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 sm:py-32 projects-section">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute top-1/2 right-0 w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-purple-500/4 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-sm font-semibold tracking-[0.3em] text-violet-400 uppercase">
              Our Work
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Projects we&rsquo;re{" "}
              <span className="text-gradient-soft">proud of</span>
            </h2>
            <p className="mt-5 text-lg text-slate-400 leading-relaxed">
              Real-world solutions we&rsquo;ve built — click any card to explore
              the full story.
            </p>
          </div>
        </Reveal>

        {/* 5-card grid: 1 col → 2 col → 3 col (last row: 2 centred) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.15}>
          <div className="mt-14 text-center">
            <p className="text-slate-400 text-sm mb-4">
              Have a project in mind? Let&rsquo;s build it together.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white/6 border border-white/12 hover:border-violet-400/50 hover:bg-violet-500/10 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_24px_-4px_rgba(139,92,246,0.4)] backdrop-blur-sm"
            >
              Start a Conversation →
            </a>
          </div>
        </Reveal>
      </div>

      {/* Modal */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

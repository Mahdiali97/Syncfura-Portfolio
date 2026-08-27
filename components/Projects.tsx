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
    image: "/Projects/project1.png",
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
    image: "/Projects/project2.jpeg",
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
    image: "/Projects/project3.jpeg",
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
    image: "/Projects/project4.jpeg",
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
    image: "/Projects/project5.png",
    category: "Web Platform",
    accentFrom: "#f43f5e",
    accentTo: "#ec4899",
  },
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

        {/* Full image — no cropping */}
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
export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 sm:py-32 section-glow">
      {/* Soft background shapes */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-100/60 blur-3xl" />
        <div className="absolute top-1/2 right-0 w-[350px] h-[350px] rounded-full bg-indigo-100/50 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-purple-100/40 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-sm font-semibold tracking-[0.3em] text-violet-500 uppercase">
              Our Work
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
              Projects we&rsquo;re{" "}
              <span className="text-gradient-violet">proud of</span>
            </h2>
            <p className="mt-5 text-lg text-slate-500 leading-relaxed">
              Real-world solutions we&rsquo;ve built — click any card to explore
              the full story.
            </p>
          </div>
        </Reveal>

        {/* 5-card grid */}
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
              className="inline-flex items-center gap-2 rounded-full border border-violet-300 bg-violet-50 hover:bg-violet-100 hover:border-violet-400 px-7 py-3 text-sm font-semibold text-violet-700 transition-all duration-300"
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

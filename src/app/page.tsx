"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Mail, MapPin, X } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

// Images from generation & project specs
const AI_CORE = "https://v3b.fal.media/files/b/0aaa8638/EjQtuU7MU_BAu2PUphjnk_zDEf7KF3.png";
const IOT_RINGS = "https://v3b.fal.media/files/b/0aaa8648/FtZEr4DhHPQrVXjndwdWo_IafD7Shr.png";
const WEB_CUBES = "https://v3b.fal.media/files/b/0aaa8659/WiYWTx4dXWmVvi0hPm6d__RV6efwpX.png";

const projects = [
  {
    id: "smartexam",
    title: "SmartExamDuty",
    shortDesc: "Automated teacher invigilation scheduling.",
    image: "/Projects/SmartExamDuty.png",
    tags: ["Laravel", "MySQL", "Blade", "HTML/CSS", "JavaScript"],
    explanation: "A web-based platform that automates the full lifecycle of teacher invigilation scheduling—from initial duty assignment and clash detection through to last-minute replacements.",
    useCase: "Administrators gain a live dashboard view of all upcoming exams, pending slots, and confirmed invigilators, eliminating manual scheduling conflicts."
  },
  {
    id: "wattaware",
    title: "WattAware",
    shortDesc: "Energy literacy & simulated billing platform.",
    image: "/Projects/WattAware.jpeg",
    tags: ["Flutter", "Firebase"],
    explanation: "A mobile application designed to bring energy literacy to students and home users through a playful, gamified interface.",
    useCase: "Users log appliances to understand consumption patterns via interactive lesson modules, simulate monthly bills, and receive personalized energy-saving tips."
  },
  {
    id: "myaid",
    title: "MYAid",
    shortDesc: "Paperless disaster relief registration platform.",
    image: "/Projects/MyAID.jpeg",
    tags: ["Flutter", "Firebase"],
    explanation: "A cross-platform mobile solution that completely replaces paper-based intake forms at disaster relief centres.",
    useCase: "Enables on-site volunteers to register evacuees digitally, auto-validates data, and syncs records in real-time to a central dashboard to accelerate aid distribution."
  },
  {
    id: "nadiputra",
    title: "NadiPutra Rider",
    shortDesc: "Real-time Putrajaya bus transit tracking.",
    image: "/Projects/NadiPutra.jpeg",
    tags: ["REST API", "Mobile Transit"],
    explanation: "A public transit companion app engineered specifically for Putrajaya bus passengers to eliminate wait-time uncertainty.",
    useCase: "Shows live bus positions on a map, calculates optimal routes, displays nearby stops, and leverages RESTful transit APIs for low-latency position updates."
  },
  {
    id: "gepcrm",
    title: "GEP CRM System",
    shortDesc: "Subscriber management platform.",
    image: "/Projects/GEPCRMSystem.png",
    tags: ["React", "TypeScript", "MySQL"],
    explanation: "A full-featured Customer Relationship Management system built for the GEP platform, handling company-level subscriber management, zone assignment, and automated invoicing.",
    useCase: "Integrates deeply with the GEP Next security operations module. It features two-factor authentication, smart alerts, and strict UI logic where selecting 'continue overtime' instantly triggers a dedicated Clock-In screen rather than just recording a static note."
  }
];

// Capabilities data from company profile
const capabilities = [
  {
    id: "web",
    title: "Custom Web Platforms",
    tagline: "Scalable Architectures. Reliable by Design.",
    overview: "We design and engineer reliable, scalable web architectures tailored specifically for seamless business operations. Beyond a basic web presence, we build robust digital ecosystems — from internal enterprise management portals to dynamic, customer-facing applications.",
    points: [
      "Enterprise portals & internal management dashboards",
      "Comprehensive software validation & QA pipelines",
      "Secure, highly responsive front-end systems",
      "Scalable back-end architectures that adapt to evolving needs",
      "Custom CRM, ERP, and workflow automation platforms",
    ],
    approach: "Every platform is built with a focus on comprehensive software validation, ensuring it is secure, highly responsive, and capable of adapting to your evolving operational needs without failure.",
    color: "from-blue-600 to-purple-600",
  },
  {
    id: "ai",
    title: "Intelligent AI & Automation",
    tagline: "From Raw Data to Actionable Intelligence.",
    overview: "We deploy advanced artificial intelligence and automated workflows to eliminate bottlenecks and transform complex, raw data into clear, actionable insights. By integrating smart algorithms into your daily processes, we help reduce repetitive manual workloads and minimize human error.",
    points: [
      "Predictive analytics & data-driven decision engines",
      "Process automation to eliminate repetitive bottlenecks",
      "Smart algorithm integration into existing workflows",
      "AI-powered reporting & business intelligence dashboards",
      "Natural language processing and document automation",
    ],
    approach: "Our solutions empower your team to operate more efficiently, predict trends, and make faster, data-driven decisions that propel growth.",
    color: "from-violet-600 to-pink-600",
  },
  {
    id: "iot",
    title: "Seamless IoT Systems",
    tagline: "Bridging the Physical and Digital Worlds.",
    overview: "We bridge the physical and digital worlds by integrating smart, interconnected networks. Our Internet of Things (IoT) solutions enable real-time monitoring, data collection, and remote management of physical assets — whether tracking resources, optimising smart environments, or automating hardware triggers.",
    points: [
      "Real-time asset monitoring & remote management",
      "Secure device-to-cloud synchronisation pipelines",
      "Centralised operational dashboard with live telemetry",
      "Smart environment optimisation & hardware automation",
      "Edge computing & low-latency sensor data processing",
    ],
    approach: "We ensure your physical operations are securely and reliably synchronised with your central digital dashboard for complete visibility and control.",
    color: "from-emerald-600 to-teal-600",
  },
];

// Custom easing
const customEase = [0.76, 0, 0.24, 1];

// Text Reveal Animation Variants
const textRevealParent = {
  initial: { opacity: 1 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const textRevealChild = {
  initial: { y: "110%", opacity: 0 },
  animate: { y: "0%", opacity: 1, transition: { duration: 1.2, ease: customEase } },
};

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 1, ease: customEase } },
};

// Simple Fallback Image Component to completely avoid next/image crashing on missing assets
const SafeImage = ({ src, alt, className, objectFit = 'cover' }: { src: string, alt: string, className?: string, objectFit?: 'cover' | 'contain' }) => {
  const [error, setError] = useState(false);
  if (error || !src) {
    return (
      <div className={`w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-400 font-bold uppercase text-xs tracking-wider ${className}`}>
        {alt}
      </div>
    );
  }
  return (
    <img 
      src={src} 
      alt={alt} 
      onError={() => setError(true)} 
      className={`w-full h-full ${objectFit === 'contain' ? 'object-contain' : 'object-cover'} ${className}`} 
    />
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedCapability, setSelectedCapability] = useState<string | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100, mass: 0.5 });
  
  const y1 = useTransform(smoothProgress, [0, 1], [0, -300]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, -150]);
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#FAFAFC] text-neutral-950 selection:bg-purple-950 selection:text-white"
    >
      {/* Navigation */}
      {/* Logo — separate layer so it keeps original colors, unaffected by mix-blend-difference */}
      <div className="fixed top-0 left-0 z-50 pt-8 pl-8 pointer-events-none">
        <div className="max-w-[1600px] mx-auto">
          <img
            src="/Logo.png"
            alt="SyncFura Logo"
            className="h-7 w-auto object-contain pointer-events-auto cursor-pointer"
          />
        </div>
      </div>

      <nav className="fixed top-0 w-full z-40 pt-8 px-8 mix-blend-difference text-white pointer-events-none">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <div className="overflow-hidden">
            <div className="text-xl font-bold tracking-tighter uppercase pointer-events-auto cursor-pointer relative z-20 pl-14">
              SyncFura<span className="text-purple-500">.</span>
            </div>
          </div>
          <div className="overflow-hidden pointer-events-auto">
            <div className="flex gap-8 font-medium text-sm">
              <a href="#solutions" className="hover:text-purple-400 transition-colors">Solutions</a>
              <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
              <a href="#team" className="hover:text-purple-400 transition-colors">Team</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-[#FAFAFC] flex items-center justify-center px-6">
        <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ y: bgY }}>
          <div className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-purple-200/50 rounded-full blur-[120px] mix-blend-multiply opacity-70" />
          <div className="absolute bottom-[10%] right-[10%] w-[800px] h-[800px] bg-indigo-100/40 rounded-full blur-[150px] mix-blend-multiply opacity-60" />
        </motion.div>

        {/* 3D Video Asset */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover mix-blend-multiply opacity-35"
          >
            <source src="/hero-backbone.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Text Container */}
        <div className="relative z-10 w-full max-w-[1200px] h-full flex flex-col justify-center bg-transparent pointer-events-none mt-12">
          <motion.div variants={textRevealParent} initial="initial" animate="animate" className="flex flex-col gap-2 bg-transparent">
            
            <div className="overflow-hidden mb-6 bg-transparent">
              <motion.div variants={textRevealChild} className="pointer-events-auto bg-transparent inline-block">
                <span className="px-4 py-1.5 rounded-full border border-neutral-900/10 bg-transparent text-xs font-bold tracking-[0.2em] uppercase text-neutral-800 backdrop-blur-[2px]">
                  ✦ From Idea to Digital
                </span>
              </motion.div>
            </div>

            <div className="text-[10vw] md:text-[7rem] leading-[0.85] font-black tracking-tighter uppercase mb-4 bg-transparent">
              <div className="overflow-hidden bg-transparent"><motion.div variants={textRevealChild} className="bg-transparent">We Build The</motion.div></div>
              <div className="overflow-hidden bg-transparent">
                <motion.div variants={textRevealChild} className="text-purple-600 relative inline-block bg-transparent">
                  <span className="relative z-10 bg-transparent">Digital</span>
                  <span className="absolute inset-0 bg-purple-600 blur-[40px] opacity-20 -z-10 mix-blend-multiply"></span>
                </motion.div>
              </div>
              <div className="overflow-hidden bg-transparent"><motion.div variants={textRevealChild} className="bg-transparent">Backbone.</motion.div></div>
            </div>

            <div className="overflow-hidden max-w-xl mb-12 bg-transparent">
              <motion.div variants={textRevealChild} className="text-xl md:text-2xl font-medium text-neutral-600 leading-snug bg-transparent">
                Intelligent Web, IoT, AI, Automation, and Data Analytics solutions for the modern enterprise.
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="flex gap-4 pointer-events-auto bg-transparent">
              <button
                onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-neutral-950 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center gap-2"
              >
                Explore Solutions <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white border border-neutral-200 px-8 py-4 rounded-full font-semibold hover:bg-neutral-50 transition-colors"
              >
                Meet the Team
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Infinite Marquee */}
      <div className="bg-neutral-950 text-white overflow-hidden py-6 relative border-y border-neutral-800">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          className="flex whitespace-nowrap gap-16 text-3xl md:text-5xl font-black uppercase tracking-tighter w-[200%]"
        >
          <span className="flex gap-16 items-center">
            <span>Synchronised Systems</span> <span className="text-purple-500">✦</span>
            <span>Fusion of Technologies</span> <span className="text-purple-500">✦</span>
            <span>Rapid & Reliable</span> <span className="text-purple-500">✦</span>
            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>Modern Enterprise</span> <span className="text-purple-500">✦</span>
          </span>
          <span className="flex gap-16 items-center">
            <span>Synchronised Systems</span> <span className="text-purple-500">✦</span>
            <span>Fusion of Technologies</span> <span className="text-purple-500">✦</span>
            <span>Rapid & Reliable</span> <span className="text-purple-500">✦</span>
            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>Modern Enterprise</span> <span className="text-purple-500">✦</span>
          </span>
        </motion.div>
      </div>

      {/* Core Solutions */}
      <section id="solutions" className="py-40 px-6 max-w-[1400px] mx-auto relative">
        <div className="mb-32">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">Core Engineering</h2>
          <p className="text-xl text-neutral-500 max-w-2xl">We do not construct temporary fixes. We architect resilient systems designed to scale endlessly.</p>
        </div>

        <div className="flex flex-col gap-32">
          {[
            { title: "Custom Web Platforms", desc: "Internal portals, dynamic web apps, and comprehensive software validation.", img: WEB_CUBES, layout: "left", capId: "web" },
            { title: "Intelligent AI & Auto", desc: "Predictive analytics, process automation, and actionable business insights.", img: AI_CORE, layout: "right", capId: "ai" },
            { title: "Seamless IoT Systems", desc: "Real-time monitoring, secure device sync, and centralized operational dashboards.", img: IOT_RINGS, layout: "left", capId: "iot" }
          ].map((sol, i) => (
            <div key={i} className={`flex flex-col ${sol.layout === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 md:gap-24`}>
              <div className="w-full md:w-1/2 relative aspect-square">
                <div className="absolute inset-0 mix-blend-multiply flex items-center justify-center">
                  <img 
                    src={sol.img} 
                    alt={sol.title}
                    className="w-full max-w-[500px] object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <span className="text-purple-600 font-bold tracking-widest uppercase mb-4 block">0{i + 1} / Pillar</span>
                <h3 className="text-4xl md:text-5xl font-black tracking-tight mb-6">{sol.title}</h3>
                <p className="text-xl text-neutral-600 leading-relaxed mb-8">{sol.desc}</p>
                <button
                  onClick={() => setSelectedCapability(sol.capId)}
                  className="group px-6 py-3 border border-neutral-300 rounded-full font-semibold hover:bg-neutral-950 hover:text-white hover:border-neutral-950 transition-all duration-300 flex items-center gap-2"
                >
                  View Capabilities <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Works - Staggered Asymmetrical Grid */}
      <section id="projects" className="py-40 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-neutral-950">Selected Works</h2>
              <p className="text-xl text-neutral-500 mt-4 max-w-xl">A showcase of scalable platforms, mobile applications, and intelligent systems engineered for the modern enterprise.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {projects.map((p, i) => (
              <motion.div
                layoutId={`card-container-${p.id}`}
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`group relative cursor-pointer rounded-3xl border border-neutral-200/60 bg-[#FAFAFC] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(124,58,237,0.15)] hover:-translate-y-1 ${
                  i < 2 ? 'col-span-1 md:col-span-3' : 'col-span-1 md:col-span-2'
                }`}
              >
                <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                  <SafeImage
                    src={p.image}
                    alt={p.title}
                    className="transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                
                <div className="p-8 flex flex-col relative z-10">
                  <h3 className="text-2xl font-bold tracking-tight text-neutral-900 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-neutral-500 mb-6">
                    {p.shortDesc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Expanded Modal */}
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
                  >
                    <button 
                      onClick={() => setSelectedId(null)}
                      className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/50 backdrop-blur-md border border-neutral-200/50 rounded-full flex items-center justify-center text-neutral-900 hover:bg-white hover:scale-110 transition-all duration-300"
                    >
                      <X size={20} />
                    </button>

                    <div className="w-full md:w-1/2 relative h-72 md:h-auto min-h-[400px] bg-neutral-100 flex items-center justify-center">
                      <SafeImage
                        src={p.image}
                        alt={p.title}
                        objectFit='contain'
                        className='p-4'
                      />
                    </div>

                    <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto bg-white flex flex-col">
                      <h3 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 mb-4">
                        {p.title}
                      </h3>
                      <p className="text-xl text-neutral-500 mb-8 font-medium">
                        {p.shortDesc}
                      </p>
                      
                      <div className="space-y-8">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-3">Overview</h4>
                          <p className="text-neutral-600 leading-relaxed text-lg">{p.explanation}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-3">Use Case & Logic</h4>
                          <p className="text-neutral-600 leading-relaxed text-lg">{p.useCase}</p>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-4">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {p.tags.map(tag => (
                              <span key={tag} className="px-4 py-2 bg-neutral-50 text-neutral-700 rounded-lg text-sm font-semibold border border-neutral-200/50">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </AnimatePresence>
      </section>

      {/* Capabilities Modal */}
      <AnimatePresence>
        {selectedCapability && (() => {
          const cap = capabilities.find(c => c.id === selectedCapability);
          if (!cap) return null;
          return (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xl cursor-pointer"
                onClick={() => setSelectedCapability(null)}
              />
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  className="bg-white w-full max-w-[1200px] h-[90vh] rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl pointer-events-auto relative"
                >
                  {/* Left Column: Header gradient & title (Sticky on Desktop) */}
                  <div className={`w-full md:w-[40%] bg-gradient-to-br ${cap.color} p-10 md:p-16 relative overflow-hidden flex flex-col justify-center`}>
                    <div className="absolute -right-12 -top-12 w-96 h-96 bg-white/20 rounded-full blur-3xl mix-blend-overlay" />
                    <div className="absolute -left-8 -bottom-8 w-64 h-64 bg-black/20 rounded-full blur-2xl mix-blend-overlay" />
                    
                    {/* Floating geometric patterns to match the specific capability */}
                    {cap.id === 'web' && <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20"><svg width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg></div>}
                    {cap.id === 'ai' && <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20"><svg width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M22 12h-2"></path><path d="M4 12H2"></path></svg></div>}
                    {cap.id === 'iot' && <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20"><svg width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path></svg></div>}

                    <div className="relative z-10">
                      <p className="text-white/80 text-xs md:text-sm font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                        <span className="w-12 h-[2px] bg-white/50"></span>
                        Core Capability
                      </p>
                      <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.05] mb-6 drop-shadow-lg">{cap.title}</h3>
                      <p className="text-white/90 font-medium text-xl md:text-2xl max-w-xl leading-snug">{cap.tagline}</p>
                    </div>
                  </div>

                  {/* Right Column: Body content (Scrollable) */}
                  <div className="w-full md:w-[60%] overflow-y-auto p-8 md:p-16 bg-[#FAFAFC] relative">
                    <button
                      onClick={() => setSelectedCapability(null)}
                      className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 bg-white hover:bg-neutral-100 shadow-sm border border-neutral-200 rounded-full flex items-center justify-center text-neutral-900 transition-all duration-300 z-20 hover:scale-105"
                    >
                      <X size={20} />
                    </button>

                    <div className="flex flex-col gap-12">
                      {/* Overview */}
                      <div className="relative mt-8 md:mt-0">
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-full bg-gradient-to-b opacity-30" style={{ backgroundImage: `var(--tw-gradient-stops)` }} />
                        <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4 ml-6">Overview</h4>
                        <p className="text-neutral-700 leading-relaxed text-xl font-medium ml-6">{cap.overview}</p>
                      </div>

                      {/* What We Deliver */}
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">What We Deliver</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {cap.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-neutral-200/60 shadow-sm hover:shadow-md transition-shadow">
                              <span className={`mt-0.5 w-7 h-7 rounded-full border border-purple-200/50 flex-shrink-0 flex items-center justify-center relative bg-purple-50`}>
                                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" className="text-purple-600">
                                  <path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </span>
                              <span className="text-neutral-700 text-sm font-semibold leading-snug">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Our Approach */}
                      <div className="w-full bg-neutral-950 rounded-2xl p-8 text-white relative overflow-hidden group">
                        <div className={`absolute inset-0 bg-gradient-to-br ${cap.color} opacity-15 group-hover:opacity-25 transition-opacity duration-500`} />
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-3 relative z-10">Our Approach</h4>
                        <p className="text-white/90 leading-relaxed text-lg relative z-10">{cap.approach}</p>
                      </div>

                      {/* CTA */}
                      <div className="pt-2 border-t border-neutral-200/60 flex items-center gap-4">
                        <button
                          onClick={() => { setSelectedCapability(null); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300); }}
                          className={`bg-gradient-to-r ${cap.color} text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2`}
                        >
                          Start a Project <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          );
        })()}
      </AnimatePresence>

      {/* Leadership */}
      <section id="team" className="py-40 px-6 max-w-[1400px] mx-auto">
        <div className="bg-neutral-950 text-white rounded-[3rem] p-16 md:p-32 relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/30 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-black mb-12 leading-[1.1] tracking-tighter">
              "True digital transformation requires more than just deploying new technology—it demands a foundation of absolute reliability."
            </h2>
            <div className="text-xl font-bold text-purple-400 uppercase tracking-widest">— Amirul Azim, CEO</div>
          </div>
        </div>

        <div className="mt-32 grid md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-6">The Brains</h3>
            <p className="text-neutral-500 text-lg">A syndicate of engineers and strategists building the future.</p>
          </div>
          <div className="md:col-span-8 grid md:grid-cols-2 gap-x-12 gap-y-16">
            {[
              { name: "Amirul Azim", role: "CEO & Product Strategist" },
              { name: "Wan Azimah", role: "CTO & Web Architect" },
              { name: "Ali Hanafiah", role: "AI & Automation" },
              { name: "Aishatul Hani", role: "IoT Systems" },
              { name: "Nurfarhah Sakinah", role: "Lead QA" }
            ].map((member, i) => (
              <div key={i} className="group border-b border-neutral-200 pb-8">
                <h4 className="text-2xl font-bold tracking-tight group-hover:text-purple-600 transition-colors duration-300">{member.name}</h4>
                <p className="text-neutral-500 mt-2">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-neutral-950 text-white pt-40 pb-12 px-6 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-24 mb-32 relative z-10">
            <div>
              <h2 className="text-[12vw] md:text-[8rem] font-black uppercase tracking-tighter leading-[0.8] mb-12">
                Let's<br/>Talk.
              </h2>
              <div className="flex flex-col gap-6 text-xl text-neutral-400">
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-purple-500" />
                  <span>HQ: Tanjong Malim, Perak, Malaysia</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-purple-500" />
                  <span>hello@syncfura.digital</span>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-900 rounded-[2rem] p-12">
              <form className="flex flex-col gap-8">
                <input type="text" placeholder="Name" className="bg-transparent border-b border-neutral-700 pb-4 text-xl focus:outline-none focus:border-purple-500 transition-colors placeholder:text-neutral-600" />
                <input type="email" placeholder="Email" className="bg-transparent border-b border-neutral-700 pb-4 text-xl focus:outline-none focus:border-purple-500 transition-colors placeholder:text-neutral-600" />
                <textarea placeholder="Tell us about the project..." rows={3} className="bg-transparent border-b border-neutral-700 pb-4 text-xl focus:outline-none focus:border-purple-500 transition-colors resize-none placeholder:text-neutral-600" />
                <button className="bg-neutral-950 text-white px-8 py-4 rounded-full font-semibold border border-neutral-800 self-start mt-4 hover:bg-purple-600 transition-colors">
                  Initiate Sync
                </button>
              </form>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-neutral-500 text-sm uppercase tracking-widest border-t border-neutral-800 pt-8 relative z-10">
            <p>© 2026 SyncFura Digital.</p>
            <div className="flex flex-wrap gap-8 font-bold">
              <span>Miezy Tech</span>
              <span>Elvexify</span>
              <span>InteXcore</span>
              <span>IntegAI</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full text-[25vw] font-black text-neutral-900 pointer-events-none select-none text-center leading-[0.7] -mb-[5%]">
          SYNCFURA
        </div>
      </footer>
    </div>
  );
}

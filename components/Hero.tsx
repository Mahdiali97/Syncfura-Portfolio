"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16"
    >
      {/* glows + grid */}
      <div className="absolute inset-0 bg-grid-glow" />
      <div className="absolute inset-0 section-glow" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(circle at 50% 40%, black, transparent 75%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-violet-electric/30 bg-violet-electric/10 px-4 py-1.5 text-sm font-medium text-violet-glow mb-8"
        >
          <Sparkles size={15} className="text-violet-glow" />
          <span className="tracking-wide">From Idea to Digital. Built to Last.</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight"
        >
          <span className="text-gradient">
            We do not just write code.
          </span>
          <br />
          <span className="bg-gradient-to-r from-violet-glow via-violet-electric to-indigo-deep bg-clip-text text-transparent">
            We build the digital backbone
          </span>
          <br />
          <span className="text-white">of the modern enterprise.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-7 text-lg sm:text-xl text-[#b9b2d6] max-w-3xl mx-auto leading-relaxed"
        >
          AVENIQTECH builds the digital backbone through intelligent{" "}
          <span className="text-white font-semibold">Web</span>,{" "}
          <span className="text-white font-semibold">IoT</span>,{" "}
          <span className="text-white font-semibold">AI</span>, and{" "}
          <span className="text-white font-semibold">Automation</span> solutions —
          engineered for reliability, scale, and the future of your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#services"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-electric to-violet-glow px-7 py-3.5 text-base font-semibold text-white shadow-[0_0_30px_-6px_rgba(168,85,247,0.8)] hover:shadow-[0_0_40px_-4px_rgba(168,85,247,1)] transition-all"
          >
            Explore Solutions
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="#team"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/10 hover:border-violet-glow/50 transition-all"
          >
            <Users size={18} />
            Meet the Team
          </a>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-violet-glow/70 text-xs tracking-widest"
      >
        <span className="inline-block animate-float">SCROLL ↓</span>
      </motion.div>
    </section>
  );
}

"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Users, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    mass: 0.5,
  });

  const heroImgY = useTransform(smoothProgress, [0, 1], [0, 200]);
  const heroImgScale = useTransform(smoothProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 bg-[#FAFAFC]"
    >
      {/* 3D Video Asset Layer - Infinite Levitation */}
      <motion.div
        style={{ y: heroImgY, scale: heroImgScale }}
        className="absolute inset-0 z-0 w-full h-full flex items-center justify-center pointer-events-none"
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover mix-blend-multiply opacity-35"
          >
            <source src="/hero-backbone.mp4" type="video/mp4" />
          </video>
        </div>
      </motion.div>

      {/* Transparent Text Layer */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center bg-transparent pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-medium text-ink-soft mb-8 backdrop-blur-[2px]"
        >
          <Sparkles size={15} className="text-accent" />
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
          <span className="bg-gradient-to-r from-accent-deep via-ink-soft to-accent bg-clip-text text-transparent">
            We build the digital backbone
          </span>
          <br />
          <span className="text-ink">of the modern enterprise.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-7 text-lg sm:text-xl text-ink-muted max-w-3xl mx-auto leading-relaxed"
        >
          SyncFura Digital builds the digital backbone through intelligent{" "}
          <span className="text-ink-soft font-semibold">Web</span>,{" "}
          <span className="text-ink-soft font-semibold">IoT</span>,{" "}
          <span className="text-ink-soft font-semibold">AI</span>,{" "}
          <span className="text-ink-soft font-semibold">Automation</span>, and{" "}
          <span className="text-ink-soft font-semibold">Data Analytics</span> solutions —
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
            className="group inline-flex items-center gap-2 rounded-full bg-accent-deep px-7 py-3.5 text-base font-semibold text-white shadow-[0_0_30px_-6px_rgba(170,111,255,0.6)] hover:bg-[#5a4880] transition-all"
          >
            Explore Solutions
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="#team"
            className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-white/70 px-7 py-3.5 text-base font-semibold text-ink-soft hover:border-accent hover:text-accent-deep transition-all"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-accent/70 text-xs tracking-widest pointer-events-none"
      >
        <span className="inline-block animate-float">SCROLL ↓</span>
      </motion.div>
    </section>
  );
}

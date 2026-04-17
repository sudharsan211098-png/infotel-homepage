'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const bgRef = useRef(null);

  // 1. Fixed Parallax Implementation using React (useEffect + useRef)
  useEffect(() => {
    let rafId;

    const handleScroll = () => {
      if (!bgRef.current) return;

      const scrollY = window.scrollY;

      // Optimization: Only animate when hero is in view
      if (scrollY <= window.innerHeight * 2) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          if (bgRef.current) {
            // DEBUG MODE: Strong parallax speed (1.0) so movement is VERY obvious
            bgRef.current.style.transform = `translateY(${scrollY * 1.0}px)`;
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check to correctly position it immediately
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Entrance Animation Variants (Framer Motion)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative flex min-h-[140vh] items-center overflow-hidden bg-slate-900 pb-16 pt-24 font-['Segoe_UI',_system-ui,_-apple-system,_sans-serif] text-slate-100">

      {/* Parallax Background Layer - Fixed sizing and layering for explicit tracking */}
      <div
        ref={bgRef}
        className="pointer-events-none absolute -inset-y-[100%] inset-x-0 z-0"
        style={{ willChange: 'transform' }}
      >
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0a1628]/80 to-[#0a1628]" />

        {/* HIGH-CONTRAST VISUAL FOR DEBUGGING: A glowing orb mapped to the background layer and a sharp grid */}
        <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.6)_0%,_transparent_70%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Hero Content Container - Static structure */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">

        {/* Copy Column */}
        <motion.div
          className="max-w-[680px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-200 backdrop-blur-sm">
              40 Years of IT Excellence
            </span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight text-white lg:text-7xl">
              Bringing Life to <br />
              <span className="bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">
                Your Visions
              </span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="mb-10 max-w-[620px] text-lg leading-relaxed text-slate-300 lg:text-xl">
              We help you unlock the power of advanced technologies and realise your business potential, from legacy transformation to cloud-native innovation and reliable delivery at enterprise scale.
            </p>
          </motion.div>

          {/* CTA Row */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.03,
                boxShadow: '0 12px 24px -6px rgba(37, 99, 235, 0.4)'
              }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex h-12 min-w-[140px] items-center justify-center rounded-lg bg-blue-600 px-8 font-semibold text-white transition-colors duration-200 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Let's Talk
            </motion.a>
            <motion.a
              href="#services"
              whileHover={{
                scale: 1.03,
                backgroundColor: 'rgba(255, 255, 255, 0.08)'
              }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex h-12 min-w-[140px] items-center justify-center rounded-lg border border-white/30 bg-transparent px-8 font-semibold text-white transition-colors duration-200 hover:border-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Our Services
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Visual Element Placeholder (With delayed entrance) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="relative flex min-h-[400px] w-full items-center justify-center overflow-visible rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent shadow-2xl backdrop-blur-sm lg:min-h-[580px]"
        >
          <span className="font-semibold text-slate-400">Enterprise Visual</span>

          {/* Floating Metric Card */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
            className="absolute -bottom-8 -left-6 z-20 max-w-[240px] rounded-xl border border-slate-200 bg-white p-6 shadow-xl"
          >
            <h4 className="mb-2 text-sm font-semibold text-slate-600">Projects Delivered</h4>
            <div className="mb-3 text-4xl font-bold tracking-tight text-[#005091]">500+</div>

            <div className="flex h-12 items-end gap-1.5">
              <div className="h-2/5 w-4 rounded-t-sm bg-gradient-to-t from-[#6ea0c3] to-[#a3d8f7]"></div>
              <div className="h-3/5 w-4 rounded-t-sm bg-gradient-to-t from-[#6ea0c3] to-[#a3d8f7]"></div>
              <div className="h-4/5 w-4 rounded-t-sm bg-gradient-to-t from-[#6ea0c3] to-[#a3d8f7]"></div>
              <div className="h-full w-4 rounded-t-sm bg-gradient-to-t from-[#f58740] to-[#f8b182]"></div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;

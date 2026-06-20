'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Blob from '@/components/animated/Blob';
import { Reveal } from '@/components/animated/Reveal';

export function BlobStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let scrollTimeout: number | undefined;
    let snapTimeout: number | undefined;
    let isSnapping = false;

    const shouldSnap = () => {
      const section = sectionRef.current;
      if (!section || isSnapping) return false;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      const visibleRatio = visibleHeight / Math.min(rect.height, viewportHeight);

      return visibleRatio >= 0.42 && Math.abs(rect.top) > 4 && Math.abs(rect.top) < viewportHeight * 0.7;
    };

    const snapToSection = () => {
      if (!shouldSnap()) return;

      const section = sectionRef.current;
      if (!section) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      isSnapping = true;
      section.scrollIntoView({
        block: 'start',
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });

      snapTimeout = window.setTimeout(() => {
        isSnapping = false;
      }, 650);
    };

    const scheduleSnap = () => {
      window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(snapToSection, 120);
    };

    window.addEventListener('scroll', scheduleSnap, { passive: true });
    window.addEventListener('scrollend', snapToSection);

    return () => {
      window.clearTimeout(scrollTimeout);
      window.clearTimeout(snapTimeout);
      window.removeEventListener('scroll', scheduleSnap);
      window.removeEventListener('scrollend', snapToSection);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-[clamp(80px,12vw,140px)] text-center sm:px-10"
      style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(139,92,246,.22),rgba(82,201,137,.1)_50%,transparent_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_30%_30%_at_50%_42%,rgba(180,140,255,.12),transparent_65%)]" />
      </motion.div>

      <Reveal className="relative z-10 mb-[clamp(20px,3vw,36px)] font-mono text-xs tracking-[0.22em] text-portfolio-green uppercase">
        the work, by feel
      </Reveal>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
        transition={{
          duration: 0.55,
          ease: 'easeOut',
        }}
        className="relative z-10 size-[clamp(300px,44vw,540px)]"
        style={{
          willChange: 'opacity',
        }}
      >
        <div
          className="pointer-events-none absolute inset-[-20%] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,.18) 0%, rgba(82,201,137,.10) 50%, transparent 72%)',
            filter: 'blur(24px)',
          }}
        />

        <motion.div
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="size-full"
          style={{
            filter: 'drop-shadow(0 0 48px rgba(139,92,246,.45)) drop-shadow(0 0 100px rgba(82,201,137,.18))',
          }}
        >
          <Blob />
        </motion.div>
      </motion.div>

      <Reveal delay={0.15}>
        <h2 className="relative z-10 mt-[clamp(28px,4vw,48px)] max-w-[760px] text-[clamp(28px,4.4vw,56px)] leading-[1.04] font-bold tracking-[-0.03em] text-balance text-portfolio-ink">
          Things that feel right.
          <br />
          <span className="text-portfolio-muted">Not just things that work.</span>
        </h2>
      </Reveal>
    </section>
  );
}

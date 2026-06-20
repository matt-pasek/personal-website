'use client';

import { motion } from 'framer-motion';
import { fadeUp, softSpring } from '@/components/animated/Reveal';
import ChromaWaves from '@/components/animated/ChromaWaves';

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#060411]">
        <ChromaWaves
          className="absolute inset-0"
          backgroundColor="#060411"
          color="#7c3aed"
          speed={0.28}
          waveFrequency={0.18}
          waveAmplitude={0.38}
          distortion={1.6}
          chromaShift={0.28}
          noiseLevel={0.04}
          flatness={1.8}
          opacity={0.92}
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_92%_at_50%_28%,transparent_38%,rgba(6,4,17,.72)_100%)]" />
      </div>

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-between gap-8 px-6 pt-28 pb-24 sm:justify-center sm:gap-[clamp(18px,3vw,40px)] sm:px-10 sm:pt-[132px] sm:pb-[120px]"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } } }}
      >
        <motion.div
          variants={fadeUp}
          transition={softSpring}
          className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs tracking-[0.18em] text-portfolio-ink/55 uppercase"
        >
          <span>
            <span className="text-portfolio-purple">portfolio</span> / 2026
          </span>
          <span>
            (<span className="text-portfolio-purple">designer</span>) (
            <span className="text-portfolio-green">developer</span>)
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          transition={softSpring}
          className="max-w-full text-[clamp(84px,18vw,250px)] leading-[0.6] font-extrabold tracking-[-0.04em] text-balance text-portfolio-ink"
        >
          matt
          <br />
          pasek<span className="text-portfolio-green">.</span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          transition={softSpring}
          className="flex flex-col gap-6 sm:mt-10 sm:flex-row sm:items-end sm:justify-between sm:gap-[30px]"
        >
          <p className="m-0 max-w-[440px] text-[15.5px] leading-[1.7] text-pretty text-portfolio-muted">
            Creative developer with an enterprise background. Currently studying in Finland and building things I
            actually care about.
          </p>
          <div className="text-left sm:text-right">
            <div className="text-[clamp(18px,2vw,24px)] font-semibold tracking-[-0.012em] text-portfolio-ink">
              Designer <span className="text-portfolio-purple">by eye</span>, dev{' '}
              <span className="text-portfolio-green">by hand</span>.
            </div>
            <div className="mt-2 font-mono text-[11px] tracking-[0.14em] text-portfolio-muted uppercase">
              available for projects · finland
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5">
        <span className="font-mono text-[10px] tracking-[0.24em] text-portfolio-green/70 uppercase">scroll</span>
        <span className="block size-3.5 animate-[nudge_1.8s_ease-in-out_infinite] border-r-[1.5px] border-b-[1.5px] border-portfolio-green/60" />
      </div>

      <div className="absolute bottom-[26px] left-10 z-10 hidden items-center gap-2 font-mono text-[10.5px] tracking-[0.12em] text-portfolio-faint uppercase md:flex">
        <span className="size-1.5 rounded-full bg-portfolio-green shadow-[0_0_8px_#52c989]" />
        aurora · handmade
      </div>
    </section>
  );
}

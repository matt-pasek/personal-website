'use client';

import { motion } from 'framer-motion';
import { useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SectionLabel } from '@/components/homepageSections/SectionLabel';
import { Reveal } from '@/components/animated/Reveal';

export function MotionSection() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 110, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 110, damping: 18, mass: 0.6 });
  const glowX = useTransform(springX, [-100, 100], ['35%', '65%']);
  const glowY = useTransform(springY, [-100, 100], ['35%', '65%']);
  const magneticBackground = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, #c896ff, #8b5cf6 52%, #3f9d57)`;

  return (
    <section className="mx-auto max-w-[1180px] px-6 py-[clamp(40px,7vw,90px)] pb-[clamp(72px,11vw,130px)] sm:px-10">
      <SectionLabel index="07" title="in motion" />
      <div className="flex flex-wrap items-center gap-[clamp(36px,6vw,72px)]">
        <Reveal className="min-w-[300px] flex-1 basis-[360px]">
          <h2 className="mb-[18px] text-[clamp(28px,3.8vw,46px)] leading-[1.08] font-bold tracking-[-0.03em] text-balance text-portfolio-ink">
            The 20ms that changes <span className="text-portfolio-green">everything.</span>
          </h2>
          <p className="max-w-[460px] text-base leading-[1.78] text-pretty text-portfolio-muted">
            Most of the work is invisible. The easing curve, the few milliseconds of delay, the way a thing settles
            instead of stops. You never notice it, you just trust the interface a little more.
          </p>
          <div className="mt-5 font-mono text-xs tracking-[0.06em] text-portfolio-faint">
            ↳ the dot follows you. spring, not snap.
          </div>
        </Reveal>
        <Reveal className="min-w-[300px] flex-1 basis-[360px]" delay={0.08}>
          <motion.div
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const dx = event.clientX - (rect.left + rect.width / 2);
              const dy = event.clientY - (rect.top + rect.height / 2);
              const distance = Math.hypot(dx, dy);
              const radius = 220;
              if (distance < radius) {
                const force = 0.42 * (1 - distance / radius) + 0.12;
                x.set(dx * force);
                y.set(dy * force);
              } else {
                x.set(0);
                y.set(0);
              }
            }}
            onMouseLeave={() => {
              x.set(0);
              y.set(0);
            }}
            className="relative flex min-h-[clamp(280px,34vw,380px)] items-center justify-center overflow-hidden rounded-[26px] border border-portfolio-faint/20 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,.08),rgba(18,14,28,.5))]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(rgba(76,70,99,.25)_1px,transparent_1px)] bg-size-[26px_26px]" />
            <motion.div
              style={{
                x: springX,
                y: springY,
                background: magneticBackground,
              }}
              className="relative flex size-[clamp(120px,16vw,150px)] items-center justify-center rounded-full shadow-[0_18px_60px_rgba(139,92,246,.4)]"
            >
              <span className="font-mono text-[11px] font-medium tracking-[0.16em] text-portfolio-bg/70 uppercase">
                feel it
              </span>
            </motion.div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

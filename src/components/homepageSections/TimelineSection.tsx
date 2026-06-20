'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionLabel } from '@/components/homepageSections/SectionLabel';

const timeline = [
  {
    accent: 'purple',
    label: '2020',
    title: 'First real lines of code.',
    body: 'Before finishing high school. No plan, just a stubborn need to make the thing work — then make it good.',
  },
  {
    accent: 'green',
    label: 'enterprise · ongoing',
    title: 'Shipped to production. Kept going.',
    body: 'Led the full frontend development of an AI HR platform for the biggest Polish employer. Then stayed. Now developing production-grade solutions for multiple enterprise clients. Real codebases, real stakes.',
  },
  {
    accent: 'purple',
    label: 'now · lahti',
    title: 'Studying, and building on my own terms.',
    body: 'Moved to Finland to study. Picking projects for the craft, not the brief.',
  },
];

function TimelineItem({ item, index }: { item: (typeof timeline)[0]; index: number }) {
  const isGreen = item.accent === 'green';

  return (
    <motion.div
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative pb-[clamp(52px,7vw,88px)] pl-[clamp(32px,5vw,64px)] last:pb-0"
    >
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
        transition={{ duration: 0.4, delay: index * 0.08 + 0.1, ease: 'backOut' }}
        className={`absolute top-[5px] -left-[7px] size-[14px] rounded-full ${
          isGreen
            ? 'bg-portfolio-green shadow-[0_0_0_4px_#0a0613,0_0_14px_4px_rgba(82,201,137,0.5)]'
            : 'bg-portfolio-purple shadow-[0_0_0_4px_#0a0613,0_0_14px_4px_rgba(139,92,246,0.5)]'
        }`}
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: index * 0.08 + 0.18 }}
        className={`mb-3 font-mono text-[11px] tracking-[0.22em] uppercase ${
          isGreen ? 'text-portfolio-green' : 'text-portfolio-purple'
        }`}
      >
        {item.label}
      </motion.div>

      <div className="text-[clamp(20px,2.4vw,28px)] leading-[1.2] font-semibold tracking-[-0.02em] text-portfolio-ink">
        {item.title}
      </div>
      <p className="mt-3 max-w-[520px] text-[15px] leading-[1.75] text-pretty text-portfolio-muted">{item.body}</p>
    </motion.div>
  );
}

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.75', 'end 0.35'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="mx-auto max-w-[1180px] px-6 pb-[clamp(80px,12vw,140px)] sm:px-10">
      <SectionLabel index="02" title="the short version" />

      <div ref={containerRef} className="relative">
        <div className="absolute top-0 bottom-0 left-0 w-px bg-portfolio-faint/20" />
        <motion.div
          style={{ height: lineHeight }}
          className="absolute top-0 left-0 w-px origin-top bg-gradient-to-b from-portfolio-purple via-portfolio-green to-portfolio-purple"
        />

        <div className="flex flex-col pt-1">
          {timeline.map((item, index) => (
            <TimelineItem key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

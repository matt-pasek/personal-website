'use client';

import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/homepageSections/SectionLabel';
import { Reveal } from '@/components/animated/Reveal';

const services = [
  [
    '01',
    'Design',
    'Interfaces and design systems. The hierarchy, the spacing, the part most people skip and everyone feels.',
  ],
  [
    '02',
    'Frontend',
    'React, TypeScript, Next. From architecture down to the last pixel, built to last and built to ship.',
  ],
  [
    '03',
    'Motion & detail',
    'The 20ms that makes a thing feel alive. Easing, timing, the difference between working and right.',
  ],
];

export function ServicesSection() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 pb-[clamp(72px,11vw,130px)] sm:px-10">
      <SectionLabel index="03" title="what I do" />
      <div className="border-t border-portfolio-faint/20">
        {services.map(([number, title, body], index) => (
          <Reveal key={title} delay={index * 0.05}>
            <motion.div
              whileHover={{ x: 14 }}
              transition={{ type: 'spring', stiffness: 180, damping: 24 }}
              className="flex flex-wrap items-baseline gap-6 border-b border-portfolio-faint/20 py-[clamp(24px,3vw,36px)]"
            >
              <span className="w-12 flex-none font-mono text-sm text-portfolio-green">{number}</span>
              <h3 className="m-0 min-w-60 flex-1 text-[clamp(24px,3vw,38px)] font-bold tracking-[-0.02em] text-portfolio-ink">
                {title}
              </h3>
              <p className="m-0 max-w-[440px] min-w-[320px] flex-1 text-[15px] leading-[1.7] text-pretty text-portfolio-muted max-[380px]:min-w-0">
                {body}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

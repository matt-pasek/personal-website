'use client';

import { Reveal } from '@/components/animated/Reveal';
import { SectionLabel } from '@/components/homepageSections/SectionLabel';
import { motion } from 'framer-motion';

const designStack = ['Figma', 'Design systems', 'Motion'];
const buildStack = [
  'TypeScript',
  'React',
  'Vue.js',
  'Astro',
  'Next.js',
  'Tailwind',
  'Framer Motion',
  'Three.js',
  'Node',
  'Git',
];

function StackGroup({
  title,
  tone,
  items,
  wide,
}: {
  title: string;
  tone: 'purple' | 'green';
  items: string[];
  wide?: boolean;
}) {
  const color = tone === 'green' ? 'text-portfolio-green' : 'text-portfolio-purple';
  const border =
    tone === 'green'
      ? 'border-portfolio-green/25 hover:border-portfolio-green/70 hover:bg-portfolio-green/8'
      : 'border-portfolio-violet/25 hover:border-portfolio-purple/70 hover:bg-portfolio-purple/8';

  return (
    <Reveal className={`${wide ? 'basis-[360px]' : 'basis-[260px]'} min-w-60 flex-1`}>
      <div className={`mb-[18px] font-mono text-[11px] tracking-[0.16em] uppercase ${color}`}>{title}</div>
      <div className="flex flex-wrap gap-[9px]">
        {items.map((item) => (
          <motion.span
            key={item}
            whileHover={{ y: -2 }}
            className={`rounded-[10px] border px-[15px] py-[9px] font-mono text-[13px] text-portfolio-ink transition-colors duration-200 ${border}`}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </Reveal>
  );
}

export function StackSection() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 pb-[clamp(72px,11vw,130px)] sm:px-10">
      <SectionLabel index="05" title="stack" aside="what I reach for" />
      <div className="flex flex-wrap gap-[clamp(36px,6vw,80px)]">
        <StackGroup title="design" tone="purple" items={designStack} />
        <StackGroup title="build" tone="green" items={buildStack} wide />
      </div>
    </section>
  );
}

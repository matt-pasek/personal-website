'use client';

import { motion } from 'framer-motion';
import type { CaseStudy } from '@/data/caseStudies';
import { MockupShowcase } from './blocks/MockupShowcase';

interface Props {
  study: CaseStudy;
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function CaseStudyHero({ study }: Props) {
  return (
    <div className="px-6 pt-32 pb-16 sm:px-10 sm:pt-36">
      <div className="mx-auto max-w-5xl">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.div variants={item} className="mb-6 flex items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <p className="font-mono text-sm tracking-[0.18em] text-portfolio-green uppercase">Case Study</p>
              <p className="font-mono text-xs tracking-[0.18em] text-portfolio-ink/50 uppercase">
                {study.client} &nbsp;•&nbsp; {study.year}
              </p>
            </div>

            {study.link && (
              <a
                href={study.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden shrink-0 items-center gap-1.5 rounded-full border border-portfolio-ink/15 px-4 py-1.5 font-mono text-[11px] tracking-[0.12em] text-portfolio-muted uppercase transition-colors hover:border-portfolio-ink/30 hover:text-portfolio-ink sm:flex"
              >
                {study.link.label}
                <span className="text-portfolio-green">↗</span>
              </a>
            )}
          </motion.div>

          <motion.h1
            variants={item}
            className="mb-6 text-[clamp(48px,8vw,88px)] leading-none font-black tracking-[-0.03em] text-portfolio-ink"
          >
            {study.headline}
            <br />
            <span style={{ color: study.accentColor }}>{study.headlineAccent}</span>
          </motion.h1>

          <motion.p variants={item} className="mb-6 max-w-xl text-[17px] leading-[1.7] text-portfolio-muted">
            {study.tagline}
          </motion.p>

          {study.link && (
            <motion.a
              variants={item}
              href={study.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-10 inline-flex w-fit items-center gap-1.5 rounded-full border border-portfolio-ink/15 px-4 py-1.5 font-mono text-[11px] tracking-[0.12em] text-portfolio-muted uppercase transition-colors hover:border-portfolio-ink/30 hover:text-portfolio-ink sm:hidden"
            >
              {study.link.label}
              <span className="text-portfolio-green">↗</span>
            </motion.a>
          )}

          <motion.div
            variants={item}
            className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-portfolio-ink/8 pt-8 sm:grid-cols-4"
          >
            {(
              [
                ['ROLE', study.meta.role],
                ['TIMELINE', study.meta.timeline],
                ['SURFACE', study.meta.surface],
                ['USERS', study.meta.users],
              ] as [string, string][]
            ).map(([label, value]) => (
              <div key={label}>
                <p className="mb-1 font-mono text-[10px] tracking-[0.16em] text-portfolio-muted uppercase">{label}</p>
                <p className="text-[15px] font-semibold text-portfolio-ink">{value}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {study.heroImage && (
          <div className="mt-14">
            <MockupShowcase src={study.heroImage} variant="inset" />
          </div>
        )}

        {study.tags && study.tags.length > 0 && (
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-portfolio-ink/12 px-4 py-1.5 font-mono text-[11px] tracking-[0.14em] text-portfolio-muted uppercase"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/homepageSections/SectionLabel';
import { Reveal } from '@/components/animated/Reveal';
import jain from '@/assets/images/jain.webp';
import Image from 'next/image';

export function WorkSection() {
  return (
    <section id="work" className="mx-auto max-w-[1180px] px-6 pb-[clamp(72px,11vw,130px)] sm:px-10">
      <SectionLabel index="04" title="selected work" aside="more soon" />
      <Reveal>
        <motion.article
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 160, damping: 22 }}
          className="flex flex-wrap overflow-hidden rounded-3xl border border-portfolio-violet/15 bg-portfolio-surface"
        >
          <div className="relative min-h-[300px] min-w-[300px] flex-1 basis-[420px] overflow-hidden">
            <Image src={jain} alt="jAIn 2.0 platform preview" fill className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-r from-transparent from-40% to-portfolio-surface/50" />
            <span className="absolute top-[18px] left-[18px] rounded-lg bg-portfolio-bg/60 px-[11px] py-1.5 font-mono text-xs tracking-[0.14em] text-portfolio-ink backdrop-blur-md">
              001
            </span>
          </div>
          <div className="flex min-w-[300px] flex-1 basis-[380px] flex-col justify-center p-[clamp(28px,3.5vw,48px)]">
            <div className="mb-5 flex flex-wrap gap-2">
              {[
                ['Frontend', 'purple'],
                ['UI Design', 'green'],
                ['Design System', 'purple'],
              ].map(([tag, tone]) => (
                <span
                  key={tag}
                  className={`rounded-full border px-[11px] py-1 font-mono text-[10px] tracking-[0.12em] uppercase ${
                    tone === 'green'
                      ? 'border-portfolio-green/30 text-portfolio-green'
                      : 'border-portfolio-violet/30 text-portfolio-purple'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="mb-3.5 text-[clamp(26px,3vw,38px)] font-bold tracking-[-0.02em] text-portfolio-ink">
              jAIn 2.0
            </h3>
            <p className="mb-[26px] max-w-[440px] text-[15px] leading-[1.72] text-pretty text-portfolio-muted">
              Solo frontend developer and UI designer on an AI-powered HR platform built for Jeronimo Martins. The full
              frontend layer: architecture, design system and every user-facing feature. Now in active use across the
              organisation.
            </p>
            <motion.a
              href="https://bluesoft.com/project/jain-ai-platform-supporting-leadership-development-at-biedronka"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.96 }}
              className="inline-flex min-h-10 items-center gap-2.5 font-mono text-[13px] tracking-[0.06em] text-portfolio-green transition-[gap] duration-200 hover:gap-[15px]"
            >
              view case study <span>→</span>
            </motion.a>
          </div>
        </motion.article>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="mt-[18px] flex items-center gap-5 rounded-[18px] border border-dashed border-portfolio-faint/40 px-[clamp(24px,3.5vw,48px)] py-6 font-mono text-[13px] tracking-[0.06em] text-portfolio-faint">
          <span>002</span>
          <span className="flex-1 text-[11px] tracking-[0.14em] uppercase">next case study · in progress</span>
          <span className="size-[7px] animate-pulse rounded-full bg-portfolio-faint" />
        </div>
      </Reveal>
    </section>
  );
}

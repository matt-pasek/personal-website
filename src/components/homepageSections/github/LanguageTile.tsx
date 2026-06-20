'use client';

import { Reveal } from '@/components/animated/Reveal';
import { motion } from 'framer-motion';

export function LanguageTile({ language }: { language: string }) {
  return (
    <Reveal className="min-h-[200px] min-w-[300px] flex-1 basis-[300px]">
      <div className="flex h-full flex-col justify-between rounded-[22px] border border-portfolio-green/20 bg-portfolio-surface-2 p-[clamp(24px,3vw,34px)]">
        <span className="font-mono text-[11px] tracking-[0.16em] text-portfolio-muted uppercase">top language</span>
        <div>
          <div className="mb-3.5 text-[clamp(26px,3.4vw,40px)] font-bold tracking-[-0.02em] text-portfolio-ink">
            {language}
          </div>
          <div className="h-2 overflow-hidden rounded-[5px] bg-portfolio-faint/25">
            <motion.div
              initial={{ width: '0%' }}
              whileInView={{ width: '71%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
              className="h-full rounded-[5px] bg-linear-to-r from-portfolio-green-dark to-portfolio-green"
            />
          </div>
          <div className="mt-2 font-mono text-xs text-portfolio-green">71% of everything</div>
        </div>
      </div>
    </Reveal>
  );
}

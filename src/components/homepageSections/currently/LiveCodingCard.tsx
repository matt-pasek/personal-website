'use client';

import { NowCodingResponse } from '@/types/now-coding';
import { Reveal } from '@/components/animated/Reveal';
import { motion } from 'framer-motion';

interface LiveCodingCardProps {
  data: NowCodingResponse | null;
  active: boolean;
}

export function LiveCodingCard({ data, active }: LiveCodingCardProps) {
  return (
    <Reveal className="flex min-w-[300px] flex-1 basis-[360px]" delay={0.08}>
      <motion.div
        whileHover={{ y: -3 }}
        className="w-full rounded-[22px] border border-portfolio-green/20 bg-linear-to-br from-portfolio-green/10 to-[#1a1525]/50 p-[clamp(24px,3vw,32px)]"
      >
        <div className="mb-[22px] flex items-center justify-between">
          <span className="flex items-center gap-[9px] font-mono text-[11px] tracking-[0.16em] text-portfolio-green uppercase">
            <span className="size-[7px] animate-pulse rounded-full bg-portfolio-green shadow-[0_0_8px_#52c989]" />
            now coding
          </span>
          <span className="font-mono text-[10px] tracking-[0.12em] text-portfolio-faint uppercase">wakatime</span>
        </div>
        <div className="mb-5 font-mono text-[13px] leading-[1.7] text-portfolio-muted">
          <div>
            <span className="text-portfolio-green">const</span> focus <span className="text-portfolio-purple">=</span>{' '}
            <span className="text-portfolio-ink">&quot;{data?.topProject ?? 'this site'}&quot;</span>;
          </div>
          <div>
            <span className="text-portfolio-green">const</span> stack <span className="text-portfolio-purple">=</span> [
            <span className="text-portfolio-ink">&quot;{data?.topLanguage ?? 'TS'}&quot;</span>,{' '}
            <span className="text-portfolio-ink">&quot;React&quot;</span>];
          </div>
        </div>
        <div className="mb-3.5 flex h-[46px] items-end gap-1">
          {[40, 62, 30, 80, 100, 54, 46].map((height, index) => (
            <motion.span
              key={index}
              initial={{ height: '12%' }}
              whileInView={{ height: `${height}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className={`flex-1 rounded-t-[3px] ${index === 4 ? 'bg-portfolio-green' : 'bg-portfolio-green/40'}`}
            />
          ))}
        </div>
        <div className="flex items-baseline gap-2.5">
          <span className="font-mono text-[28px] font-medium text-portfolio-ink tabular-nums">
            {active ? data?.totalText : '0m'}
          </span>
          <span className="font-mono text-[11px] tracking-[0.12em] text-portfolio-muted uppercase">today · live</span>
        </div>
      </motion.div>
    </Reveal>
  );
}

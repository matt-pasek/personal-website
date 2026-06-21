'use client';

import { NowCodingResponse } from '@/types/now-coding';
import { Reveal } from '@/components/animated/Reveal';
import { motion } from 'framer-motion';

interface LiveCodingCardProps {
  data: NowCodingResponse | null;
  active: boolean;
}

export function LiveCodingCard({ data, active }: LiveCodingCardProps) {
  const dailyTotals = data?.dailyTotals ?? [];
  const maxDailyTotal = Math.max(0, ...dailyTotals.map((day) => day.totalSeconds));
  const stackItems = [data?.topLanguage, data?.topEditor].filter(Boolean);

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
            {stackItems.length > 0 ? (
              stackItems.map((item, index) => (
                <span key={item}>
                  <span className="text-portfolio-ink">&quot;{item}&quot;</span>
                  {index < stackItems.length - 1 ? ', ' : null}
                </span>
              ))
            ) : (
              <span className="text-portfolio-ink">&quot;-&quot;</span>
            )}
            ];
          </div>
        </div>
        <div className="mb-3.5 flex h-[46px] items-end gap-1">
          {dailyTotals.map((day, index) => {
            const height = maxDailyTotal > 0 ? (day.totalSeconds / maxDailyTotal) * 100 : 0;
            const isToday = index === dailyTotals.length - 1;

            return (
              <motion.span
                key={day.date}
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className={`flex-1 rounded-t-[3px] ${isToday ? 'bg-portfolio-green' : 'bg-portfolio-green/40'}`}
                title={`${day.date}: ${Math.round(day.totalSeconds / 60)} mins`}
              />
            );
          })}
        </div>
        <div className="flex flex-wrap-reverse items-baseline gap-2.5">
          <span className="font-mono text-[28px] font-medium text-portfolio-ink tabular-nums">
            {active ? data?.totalText : '0m'}
          </span>
          <span className="font-mono text-[11px] tracking-[0.12em] text-portfolio-muted uppercase">today · live</span>
        </div>
      </motion.div>
    </Reveal>
  );
}

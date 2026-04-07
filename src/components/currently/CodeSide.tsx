'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { NowCodingResponse } from '@/types/now-coding';
import { Mode } from './types';

function formatTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  return `${h}:${String(m).padStart(2, '0')}`;
}

const fadeSlide = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4 },
};

interface CodeSideProps {
  data: NowCodingResponse | null;
  mode: Mode;
}

export default function CodeSide({ data, mode }: CodeSideProps) {
  const active = mode === 'coding' || mode === 'both';

  return (
    <div className="flex w-full min-w-0 flex-col justify-center md:w-[340px] md:shrink-0">
      <AnimatePresence mode="wait">
        {active && data ? (
          <motion.div key="active" {...fadeSlide}>
            <div className="mb-3 font-mono text-[0.72rem] tracking-wide text-[#50C8FF]/35">{'// now_coding'}</div>
            <div className="mb-1 text-[1.5rem] leading-tight font-bold tracking-[-0.03em] wrap-break-word text-white">
              {data.topProject ?? '—'}
            </div>
            <div className="mb-6 text-[0.78rem] text-[#50C8FF]/55">
              {[data.topLanguage, data.topEditor].filter(Boolean).join(' · ')}
            </div>
            <div className="-ml-1 text-[2.8rem] leading-none font-bold tracking-[-0.04em] text-white tabular-nums">
              {formatTime(data.totalSeconds)}
            </div>
            <div className="mt-1.5 text-[0.75rem] text-white/30">today</div>
          </motion.div>
        ) : (
          <motion.div key="idle" {...fadeSlide}>
            <div className="mb-4 font-mono text-[0.78rem] tracking-wide text-white/20">{'// not coding yet'}</div>
            <div className="mb-4 text-white/15">—</div>
            <div className="font-mono text-[0.78rem] text-white/15 italic">no active session</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

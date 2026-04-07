'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NowPlayingResponse } from '@/types/now-playing';
import { NowCodingResponse } from '@/types/now-coding';
import { Mode } from './types';
import ParticleField from './ParticleField';
import MusicCard from './MusicCard';
import CodeSide from './CodeSide';

function deriveMode(track: NowPlayingResponse | null, coding: NowCodingResponse | null): Mode {
  const isNowPlaying = track?.nowPlaying === true;
  const hasCoding = (coding?.totalSeconds ?? 0) > 0;
  if (isNowPlaying && hasCoding) return 'both';
  if (isNowPlaying) return 'music';
  if (hasCoding) return 'coding';
  return 'idle';
}

const PURPLE_OPACITY: Record<Mode, number> = { idle: 0.015, music: 0.06, coding: 0.01, both: 0.08 };
const CYAN_OPACITY: Record<Mode, number> = { idle: 0.0, music: 0.0, coding: 0.05, both: 0.07 };

const DIVIDER_PURPLE: Record<Mode, string> = {
  idle: 'rgba(140,80,255,0.06)',
  music: 'rgba(140,80,255,0.18)',
  coding: 'rgba(140,80,255,0.04)',
  both: 'rgba(140,80,255,0.22)',
};
const DIVIDER_CYAN: Record<Mode, string> = {
  idle: 'rgba(80,200,255,0.0)',
  music: 'rgba(80,200,255,0.0)',
  coding: 'rgba(80,200,255,0.2)',
  both: 'rgba(80,200,255,0.2)',
};

export default function CurrentlySection() {
  const [track, setTrack] = useState<NowPlayingResponse | null>(null);
  const [codingData, setCodingData] = useState<NowCodingResponse | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    void Promise.all([
      fetch('/api/now-playing')
        .then((r) => r.json() as Promise<NowPlayingResponse>)
        .catch(() => null),
      fetch('/api/now-coding')
        .then((r) => r.json() as Promise<NowCodingResponse>)
        .catch(() => null),
    ]).then(([np, nc]) => {
      setTrack(np);
      setCodingData(nc);
      setLoaded(true);
    });
  }, []);

  const mode: Mode = loaded ? deriveMode(track, codingData) : 'idle';
  // TODO: rethink mobile positioning
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute"
        style={{ width: '140%', height: '220%', top: '-60%', left: '-20%' }}
      >
        <ParticleField mode={mode} />
      </div>

      <div className="mb-3">
        <h2 className="mb-3 text-[1.85rem] leading-[1.2] font-bold tracking-[-0.02em] text-white">
          This is what right now looks like
        </h2>
        <p className="max-w-lg text-[0.95rem] leading-[1.75] text-white/60">
          A Tuesday at 11pm — something good in the headphones, something half-finished in the editor. Both pulled live.
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
        <div className="relative w-[400px] shrink-0 self-stretch">
          <motion.div
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              height: 600,
              background: 'radial-gradient(circle, rgba(155,100,255,1) 0%, rgba(120,70,240,0.25) 45%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{ opacity: PURPLE_OPACITY[mode] }}
            transition={{ duration: 1.4 }}
          />
        </div>

        <div style={{ width: 1, margin: '0 36px', flexShrink: 0 }} />

        <div className="relative w-[340px] shrink-0 self-stretch">
          <motion.div
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              height: 600,
              background: 'radial-gradient(circle, rgba(90,190,235,1) 0%, rgba(50,150,215,0.2) 45%, transparent 70%)',
              filter: 'blur(70px)',
            }}
            animate={{ opacity: CYAN_OPACITY[mode] }}
            transition={{ duration: 1.4 }}
          />
        </div>
      </div>

      <div className="relative flex flex-col items-center gap-8 md:flex-row md:gap-0">
        <MusicCard track={track} mode={mode} />

        <div className="relative hidden md:block" style={{ width: 1, height: 88, flexShrink: 0, margin: '0 36px' }}>
          <motion.div
            className="absolute inset-0"
            animate={{ background: `linear-gradient(to bottom, ${DIVIDER_PURPLE[mode]}, ${DIVIDER_CYAN[mode]})` }}
            transition={{ duration: 0.9 }}
          />
        </div>

        <CodeSide data={codingData} mode={mode} />
      </div>
    </div>
  );
}

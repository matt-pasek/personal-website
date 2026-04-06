'use client';

import { useState, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { NowPlayingResponse } from '@/types/now-playing';

const POLL_INTERVAL_MS = 2 * 60 * 1000;

const cardVariants: Variants = {
  initial: {
    opacity: 0,
    filter: 'blur(16px) saturate(1.6) brightness(1.2)',
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    filter: 'blur(0px) saturate(1) brightness(1)',
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    filter: 'blur(10px) saturate(0.8)',
    scale: 0.97,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export default function NowPlaying() {
  const [data, setData] = useState<NowPlayingResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () =>
      fetch('/api/now-playing')
        .then((res) => res.json())
        .then((json: NowPlayingResponse) => setData(json))
        .catch(() => setData(null))
        .finally(() => setLoading(false));

    void fetchData();
    const interval = setInterval(fetchData, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) return null;

  return (
    <AnimatePresence mode="wait">
      {data.nowPlaying ? <NowPlayingLive key={data.name} data={data} /> : <LastPlayed key={data.name} data={data} />}
    </AnimatePresence>
  );
}

function AlbumCover({ url, alt }: { url: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  if (!url) {
    return (
      <div
        className="flex size-[52px] shrink-0 items-center justify-center rounded-md text-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(140,80,255,0.3), rgba(60,30,150,0.4))',
          border: '1px solid rgba(200,150,255,0.15)',
        }}
      >
        ♪
      </div>
    );
  }

  return (
    <div
      className="relative size-[52px] shrink-0 overflow-hidden rounded-md"
      style={{ border: '1px solid rgba(200,150,255,0.15)' }}
    >
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: 'linear-gradient(135deg, rgba(140,80,255,0.2), rgba(60,30,150,0.3))' }}
        />
      )}
      <Image
        src={url}
        alt={alt}
        fill
        priority
        className="object-cover transition-opacity duration-300"
        style={{ opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
      />
      <div className="absolute inset-0" style={{ background: 'rgba(140,80,255,0.25)', mixBlendMode: 'color' }} />
    </div>
  );
}

interface PlayerCardProps {
  data: NowPlayingResponse;
  statusPill: ReactNode;
  eqBars: ReactNode;
  footer?: ReactNode;
  glowActive: boolean;
}

function PlayerCard({ data, statusPill, eqBars, footer, glowActive }: PlayerCardProps) {
  return (
    <motion.a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block w-full shrink-0 overflow-hidden rounded-xl md:w-[400px]"
      style={{ background: '#0a0318' }}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        {data.imageUrl && (
          <Image
            unoptimized
            src={data.imageUrl}
            alt=""
            fill
            className="scale-110 object-cover"
            style={{ filter: 'blur(18px) saturate(0.6)', opacity: 0.3 }}
          />
        )}
        <div className="absolute inset-0" style={{ background: 'rgba(140,80,255,0.15)', mixBlendMode: 'color' }} />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(10,3,24,0.85), rgba(10,3,24,0.7))' }}
        />
      </div>

      <div
        className="pointer-events-none absolute -top-10 -left-8 h-52 w-52 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(140,80,255,0.22) 0%, transparent 70%)',
          animation: glowActive ? 'np-bloom 3s ease-in-out infinite' : 'none',
          opacity: glowActive ? undefined : 0.3,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 rounded-xl border"
        style={{
          animation: glowActive ? 'np-border-glow 3s ease-in-out infinite' : 'none',
          borderColor: glowActive ? undefined : 'rgba(200,150,255,0.08)',
        }}
      />

      <div className="relative p-4">
        {statusPill}

        <div className="flex items-center gap-3">
          <AlbumCover url={data.thumbnailUrl} alt={data.album} />
          <div className="min-w-0 flex-1">
            <div className="flex items-end justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate text-[0.88rem] leading-tight font-bold tracking-[-0.02em] text-white">
                  {data.name}
                </div>
                <div className="mt-0.5 truncate text-[0.72rem] text-white/40">{data.artist}</div>
              </div>
              {eqBars}
            </div>
            <div className="mt-2">
              <span className="rounded-full border border-[#C896FF]/10 px-2 py-0.5 text-[0.6rem] tracking-[0.1em] text-[#C896FF]/25 uppercase">
                {(parseInt(data.scrobbledSongs, 10) || 0).toLocaleString()} scrobbles
              </span>
            </div>
            {footer}
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function NowPlayingLive({ data }: { data: NowPlayingResponse }) {
  const statusPill = (
    <div
      className="mb-3 inline-flex items-center gap-2.5 rounded-full border px-2.5 py-1"
      style={{
        background: 'rgba(200,150,255,0.08)',
        borderColor: 'rgba(200,150,255,0.2)',
      }}
    >
      <span
        className="size-1.5 shrink-0 rounded-full bg-[#C896FF]"
        style={{ animation: 'np-dot-glow 1.5s ease-in-out infinite' }}
      />
      <span className="text-[0.6rem] tracking-[0.15em] text-[#C896FF]/85 uppercase">Now Playing</span>
    </div>
  );

  const eqBars = (
    <div className="flex shrink-0 items-end gap-[3px]" style={{ height: 22, paddingBottom: 2 }}>
      {(['np-b1', 'np-b2', 'np-b3', 'np-b4', 'np-b5'] as const).map((anim, i) => (
        <div
          key={anim}
          className="w-[2px] rounded-sm"
          style={{
            background: 'linear-gradient(to top, #8C50FF, #C896FF)',
            animation: `${anim} ${[0.7, 0.5, 0.9, 0.6, 0.8][i]}s ease infinite alternate`,
          }}
        />
      ))}
    </div>
  );

  return <PlayerCard data={data} statusPill={statusPill} eqBars={eqBars} glowActive={true} />;
}

function LastPlayed({ data }: { data: NowPlayingResponse }) {
  const statusPill = (
    <div
      className="mb-3 inline-flex items-center gap-2.5 rounded-full border px-2.5 py-1"
      style={{
        background: 'rgba(200,150,255,0.04)',
        borderColor: 'rgba(200,150,255,0.1)',
      }}
    >
      <span className="size-1.5 shrink-0 rounded-full bg-[#C896FF]/30" />
      <span className="text-[0.6rem] tracking-[0.15em] text-[#C896FF]/40 uppercase">Last Played</span>
    </div>
  );

  const eqBars = (
    <div className="flex shrink-0 items-end gap-[3px] opacity-25" style={{ height: 22, paddingBottom: 2 }}>
      {[40, 70, 30, 55, 45].map((h, i) => (
        <div key={i} className="w-[2px] rounded-sm bg-[#C896FF]" style={{ height: `${h}%` }} />
      ))}
    </div>
  );

  const footer = data.playedDate ? (
    <div className="mt-1.5 font-mono text-[0.6rem] text-white/20">{data.playedDate}</div>
  ) : null;

  return <PlayerCard data={data} statusPill={statusPill} eqBars={eqBars} footer={footer} glowActive={false} />;
}

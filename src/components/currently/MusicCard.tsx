'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { NowPlayingResponse } from '@/types/now-playing';
import { Mode } from './types';

function AlbumCover({ url, alt }: { url: string; alt: string }) {
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
      <Image src={url} alt={alt} width={52} height={52} unoptimized priority className="size-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'rgba(140,80,255,0.25)', mixBlendMode: 'color' }} />
    </div>
  );
}

function relativeTime(dateStr: string): string {
  const date = new Date(dateStr.replace(',', ''));
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

function StatusBadge({ track }: { track: NowPlayingResponse | null }) {
  if (track?.nowPlaying) {
    return (
      <div
        className="mb-3 inline-flex items-center gap-2.5 rounded-full border px-2.5 py-1"
        style={{ background: 'rgba(200,150,255,0.08)', borderColor: 'rgba(200,150,255,0.2)' }}
      >
        <span
          className="size-1.5 shrink-0 rounded-full bg-[#C896FF]"
          style={{ animation: 'np-dot-glow 1.5s ease-in-out infinite' }}
        />
        <span className="text-[0.6rem] tracking-[0.15em] text-[#C896FF]/85 uppercase">Now Playing</span>
      </div>
    );
  }
  if (track) {
    return (
      <div
        className="mb-3 inline-flex items-center gap-2.5 rounded-full border px-2.5 py-1"
        style={{ background: 'rgba(200,150,255,0.04)', borderColor: 'rgba(200,150,255,0.1)' }}
      >
        <span className="size-1.5 shrink-0 rounded-full bg-[#C896FF]/30" />
        <span className="text-[0.6rem] tracking-[0.15em] text-[#C896FF]/40 uppercase">
          Last Played{track.playedDate ? ` · ${relativeTime(track.playedDate)}` : ''}
        </span>
      </div>
    );
  }
  return (
    <div
      className="mb-3 inline-flex items-center gap-2.5 rounded-full border px-2.5 py-1"
      style={{ background: 'rgba(200,150,255,0.03)', borderColor: 'rgba(200,150,255,0.07)' }}
    >
      <span className="size-1.5 shrink-0 rounded-full bg-[#C896FF]/15" />
      <span className="text-[0.6rem] tracking-[0.15em] text-[#C896FF]/25 uppercase">Nothing On</span>
    </div>
  );
}

function EqBars({ active }: { active: boolean }) {
  if (active) {
    return (
      <div className="flex shrink-0 items-end gap-[3px]" style={{ height: 22, paddingBottom: 2 }}>
        {(['np-b1', 'np-b2', 'np-b3', 'np-b4', 'np-b5'] as const).map((anim, i) => (
          <div
            key={anim}
            className="w-0.5 rounded-sm"
            style={{
              background: 'linear-gradient(to top, #8C50FF, #C896FF)',
              animation: `${anim} ${[0.7, 0.5, 0.9, 0.6, 0.8][i]}s ease infinite alternate`,
            }}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="flex shrink-0 items-end gap-[3px] opacity-20" style={{ height: 22, paddingBottom: 2 }}>
      {[40, 70, 30, 55, 45].map((h, i) => (
        <div key={i} className="w-0.5 rounded-sm bg-[#C896FF]" style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}

interface MusicCardProps {
  track: NowPlayingResponse | null;
  mode: Mode;
}

export default function MusicCard({ track, mode }: MusicCardProps) {
  const isNowPlaying = track?.nowPlaying === true;
  const isCodingOnly = mode === 'coding';

  const cardInner = (
    <>
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        {track?.imageUrl && (
          <Image
            unoptimized
            src={track.imageUrl}
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
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 12% 62%, rgba(139, 92, 246, 0.15) 0%, transparent 55%)',
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute -top-10 -left-8 h-52 w-52 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(140,80,255,0.22) 0%, transparent 70%)',
          animation: isNowPlaying ? 'np-bloom 3s ease-in-out infinite' : 'none',
          opacity: isNowPlaying ? undefined : 0.3,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 rounded-xl border"
        style={{
          animation: mode === 'both' ? 'np-border-glow 3s ease-in-out infinite' : 'none',
          borderColor: isNowPlaying ? undefined : 'rgba(200,150,255,0.08)',
        }}
      />

      <div className="relative p-4">
        <StatusBadge track={track} />
        <div className="flex items-center gap-3">
          <AlbumCover url={track?.thumbnailUrl ?? ''} alt={track?.album ?? ''} />
          <div className="min-w-0 flex-1">
            <div className="flex items-end justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate text-[0.88rem] leading-tight font-bold tracking-[-0.02em] text-white">
                  {track?.name ?? '—'}
                </div>
                <div className="mt-0.5 truncate text-[0.72rem] text-white/40">{track?.artist ?? ''}</div>
              </div>
              <EqBars active={isNowPlaying} />
            </div>
            {track && (
              <div className="mt-2">
                <span className="rounded-full border border-[#C896FF]/10 px-2 py-0.5 text-[0.6rem] tracking-widest text-[#C896FF]/25 uppercase">
                  {(parseInt(track.scrobbledSongs, 10) || 0).toLocaleString()} scrobbles
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const sharedProps = {
    className: 'relative block shrink-0 rounded-xl w-full md:w-[400px]',
    style: { background: '#0a0318' } as React.CSSProperties,
    animate: { opacity: isCodingOnly ? 0.65 : 1 },
    transition: { duration: 0.4 },
  };

  if (track?.songUrl) {
    return (
      <motion.a href={track.songUrl} target="_blank" rel="noopener noreferrer" {...sharedProps}>
        {cardInner}
      </motion.a>
    );
  }

  return <motion.div {...sharedProps}>{cardInner}</motion.div>;
}

'use client';

import { motion } from 'framer-motion';
import { NowPlayingResponse } from '@/types/now-playing';
import { Reveal } from '@/components/animated/Reveal';
import Image from 'next/image';

interface LiveMusicCardProps {
  track: NowPlayingResponse | null;
  isPlaying: boolean;
}

export function LiveMusicCard({ track, isPlaying }: LiveMusicCardProps) {
  const content = (
    <motion.div
      whileHover={{ y: -3 }}
      className="min-w-[300px] flex-1 basis-[360px] rounded-[22px] border border-portfolio-violet/20 bg-linear-to-br from-portfolio-violet/15 to-[#1a1525]/50 p-[clamp(24px,3vw,32px)]"
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="flex items-center gap-[9px] font-mono text-[11px] tracking-[0.16em] text-portfolio-purple uppercase">
          <span className="size-[7px] animate-pulse rounded-full bg-portfolio-purple shadow-[0_0_8px_#a78bfa]" />
          {isPlaying ? 'now playing' : 'last played'}
        </span>
        <span className="font-mono text-[10px] tracking-[0.12em] text-portfolio-faint uppercase">last.fm</span>
      </div>
      <div className="mb-[22px] flex items-center gap-4">
        <div className="relative flex size-16 shrink-0 items-end justify-center overflow-hidden rounded-xl bg-linear-to-br from-portfolio-violet to-portfolio-green-dark p-2.5">
          {track?.thumbnailUrl ? (
            <Image src={track.thumbnailUrl} alt={track.album || track.name} fill unoptimized className="object-cover" />
          ) : (
            <div className="flex h-[26px] items-end gap-[3px]">
              {[0.6, 0.82, 0.5, 0.72].map((duration) => (
                <span
                  key={duration}
                  className="h-full w-1 origin-bottom animate-[eq_var(--eq-duration)_ease-in-out_infinite_alternate] rounded-sm bg-white/85"
                  style={{ '--eq-duration': `${duration}s` } as React.CSSProperties}
                />
              ))}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <div className="truncate text-[19px] font-semibold tracking-[-0.01em] text-portfolio-ink">
            {track?.name ?? 'Track title'}
          </div>
          <div className="mt-[3px] truncate text-sm text-portfolio-muted">{track?.artist ?? 'Artist'}</div>
        </div>
      </div>
      <div className="flex items-center gap-2.5 font-mono text-[11px] text-portfolio-muted">
        <span>{isPlaying ? 'live' : 'recent'}</span>
        <span className="h-1 flex-1 overflow-hidden rounded-[3px] bg-portfolio-faint/30">
          <span className="block h-full animate-[progress_6s_ease-in-out_infinite] rounded-[3px] bg-linear-to-r from-portfolio-violet to-[#c896ff]" />
        </span>
        <span className="text-portfolio-faint">{track?.scrobbledSongs ? `${track.scrobbledSongs} plays` : 'live'}</span>
      </div>
    </motion.div>
  );

  if (track?.songUrl) {
    return (
      <Reveal className="flex min-w-[300px] flex-1 basis-[360px]">
        <a href={track.songUrl} target="_blank" rel="noopener noreferrer" className="flex w-full">
          {content}
        </a>
      </Reveal>
    );
  }

  return <Reveal className="flex min-w-[300px] flex-1 basis-[360px]">{content}</Reveal>;
}

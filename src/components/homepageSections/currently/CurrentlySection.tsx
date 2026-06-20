'use client';

import { NowPlayingResponse } from '@/types/now-playing';
import { useEffect, useState } from 'react';
import { NowCodingResponse } from '@/types/now-coding';
import { SectionLabel } from '@/components/homepageSections/SectionLabel';
import { Reveal } from '@/components/animated/Reveal';
import { LiveMusicCard } from '@/components/homepageSections/currently/LiveMusicCard';
import { LiveCodingCard } from '@/components/homepageSections/currently/LiveCodingCard';

export function CurrentlySectionRedesign() {
  const [track, setTrack] = useState<NowPlayingResponse | null>(null);
  const [coding, setCoding] = useState<NowCodingResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    void Promise.all([
      fetch('/api/now-playing')
        .then((response) => response.json() as Promise<NowPlayingResponse>)
        .catch(() => null),
      fetch('/api/now-coding')
        .then((response) => response.json() as Promise<NowCodingResponse>)
        .catch(() => null),
    ]).then(([trackData, codingData]) => {
      if (!cancelled) {
        setTrack(trackData);
        setCoding(codingData);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const isPlaying = track?.nowPlaying === true;
  const codingActive = (coding?.totalSeconds ?? 0) > 0;

  return (
    <section id="currently" className="mx-auto max-w-[1180px] px-6 pb-[clamp(72px,11vw,130px)] sm:px-10">
      <SectionLabel index="08" title="currently" />
      <Reveal>
        <div className="mb-[clamp(28px,4vw,44px)]">
          <h2 className="mb-3 text-[clamp(26px,3.4vw,42px)] leading-[1.1] font-bold tracking-[-0.025em] text-portfolio-ink">
            What right now sounds like.
          </h2>
          <p className="max-w-[520px] text-[15.5px] leading-[1.72] text-pretty text-portfolio-muted">
            Late night. Something good in the headphones, something half-finished in the editor. Both pulled live.
          </p>
        </div>
      </Reveal>
      <div className="flex flex-wrap gap-4">
        <LiveMusicCard track={track} isPlaying={isPlaying} />
        <LiveCodingCard data={coding} active={codingActive} />
      </div>
    </section>
  );
}

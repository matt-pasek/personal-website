'use client';

import { useEffect, useMemo, useState } from 'react';
import { GithubStatsResponse } from '@/types/github-stats';
import { StatTile } from './StatTitle';
import { buildHeatmap } from './util/buildHeatmap.util';
import { SectionLabel } from '@/components/homepageSections/SectionLabel';
import { Reveal } from '@/components/animated/Reveal';
import { LanguageTile } from './LanguageTile';

const fallbackStats: GithubStatsResponse = {
  memberSince: '———',
  publicRepos: '———',
  totalCommits: '———',
  thisYear: '———',
  topLanguage: 'TypeScript',
  longestStreak: '———',
  mostActive: 'Tuesdays, late.',
  abandonedRepos: '9',
};

export function GitHubSection() {
  const [stats, setStats] = useState<GithubStatsResponse>(fallbackStats);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/github-stats')
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub stats API error: ${res.status}`);
        return res.json() as Promise<GithubStatsResponse>;
      })
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {
        if (!cancelled) setStats(fallbackStats);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const heatmapCells = useMemo(() => buildHeatmap(), []);

  return (
    <section className="mx-auto max-w-[1180px] px-6 pb-[clamp(72px,11vw,130px)] sm:px-10">
      <SectionLabel index="06" title="by the numbers" />
      <p className="mb-[clamp(28px,4vw,40px)] max-w-[520px] text-[15px] leading-[1.7] text-pretty text-portfolio-muted">
        Pulled live from GitHub. Quality &gt; quantity, but the receipts are fun.
      </p>
      <div className="flex flex-wrap gap-4">
        <Reveal className="basis-full">
          <div className="rounded-[22px] border border-portfolio-green/20 bg-linear-to-br from-portfolio-green/8 to-portfolio-surface-2/60 p-[clamp(24px,3vw,34px)]">
            <div className="mb-[22px] flex flex-wrap items-baseline justify-between gap-2.5">
              <span className="font-mono text-xs tracking-[0.16em] text-portfolio-green uppercase">
                the last 12 months
              </span>
              <span className="font-mono text-xs text-portfolio-faint">{'// mostly nights'}</span>
            </div>
            <div className="grid w-full grid-flow-col grid-rows-7 gap-[3px] overflow-hidden">
              {heatmapCells.map((level, index) => (
                <span key={index} className={`aspect-square rounded-xs ${level}`} />
              ))}
            </div>
            <div className="mt-3.5 flex items-center gap-2 font-mono text-[11px] text-portfolio-muted">
              <span>less</span>
              {[
                'bg-portfolio-faint/15',
                'bg-portfolio-green/30',
                'bg-portfolio-green/50',
                'bg-portfolio-green/75',
                'bg-portfolio-green',
              ].map((color) => (
                <span key={color} className={`size-[11px] rounded-xs ${color}`} />
              ))}
              <span>more</span>
            </div>
          </div>
        </Reveal>

        <StatTile
          label="total commits"
          value={stats.totalCommits}
          note="give or take a force-push"
          featured
          tone="purple"
        />
        <LanguageTile language={stats.topLanguage} />
        <StatTile label="public repos" value={stats.publicRepos} />
        <StatTile label="longest streak" value={stats.longestStreak} note="before life happened" tone="green" />
        <StatTile label="most active" value={stats.mostActive} />
        <StatTile label="abandoned repos" value={stats.abandonedRepos} note="we don't talk about those" tone="purple" />
      </div>
    </section>
  );
}

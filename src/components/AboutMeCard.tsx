'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { GithubStatsResponse } from '@/types/github-stats';

const fallbackStats: GithubStatsResponse = {
  memberSince: '———',
  publicRepos: '———',
  totalCommits: '———',
  thisYear: '———',
  topLanguage: '———',
  longestStreak: '———',
  mostActive: '———',
  abandonedRepos: '———',
};

export const AboutMeCard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [githubStats, setGithubStats] = useState<GithubStatsResponse>(fallbackStats);
  const [rotation, setRotation] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [canTrackCursor, setCanTrackCursor] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const tiltX = useTransform(mouseYSpring, [-0.5, 0.5], ['-10deg', '10deg']);
  const tiltY = useTransform(mouseXSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ['-5px', '5px']);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ['5px', '-5px']);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.05) 0%, transparent 62%)`;

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateTracking = () => {
      const enabled = query.matches;
      setCanTrackCursor(enabled);

      if (!enabled) {
        x.set(0);
        y.set(0);
      }
    };

    updateTracking();
    query.addEventListener('change', updateTracking);

    return () => query.removeEventListener('change', updateTracking);
  }, [x, y]);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/github-stats')
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub stats API error: ${res.status}`);
        return res.json() as Promise<GithubStatsResponse>;
      })
      .then((data) => {
        if (!cancelled) {
          setGithubStats(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setGithubStats(fallbackStats);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canTrackCursor) return;
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [canTrackCursor, x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setFlipping(true);
      const rect = ref.current.getBoundingClientRect();
      const isRightSide = canTrackCursor ? (e.clientX - rect.left) / rect.width >= 0.5 : true;
      const delta = isRightSide ? 180 : -180;

      setRotation((prev) => prev + delta);

      timeoutRef.current = setTimeout(() => {
        setFlipping(false);
        timeoutRef.current = null;
      }, 750);
    },
    [canTrackCursor],
  );

  const faceBase = 'absolute inset-0 rounded-2xl backface-hidden';

  return (
    <div className="my-10 w-full max-w-[628px] px-6 sm:max-w-[580px] sm:px-0" style={{ perspective: '1200px' }}>
      <motion.div
        ref={ref}
        onMouseMove={canTrackCursor ? handleMouseMove : undefined}
        onMouseLeave={canTrackCursor ? handleMouseLeave : undefined}
        onClick={handleClick}
        style={{
          rotateX: canTrackCursor ? tiltX : '0deg',
          rotateY: canTrackCursor ? tiltY : '0deg',
          translateX: canTrackCursor ? translateX : 0,
          translateY: canTrackCursor ? translateY : 0,
        }}
        className="relative block w-full cursor-pointer rounded-2xl p-px transform-3d"
        whileHover={canTrackCursor ? { scale: 1.03, transition: { duration: 0.2 } } : undefined}
      >
        <motion.div
          className="relative h-[21.5rem] w-full rounded-2xl transform-3d sm:h-64"
          animate={{ rotateY: rotation }}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background:
              'linear-gradient(135deg, rgba(139,92,246,0.55) 0%, rgba(80,30,150,0.18) 45%, rgba(255,255,255,0.04) 100%)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 60px rgba(139,92,246,0.08), 0 0 0 0.5px rgba(139,92,246,0.06)',
          }}
        >
          <div className={'flex flex-col justify-between bg-[#100c24] px-5 py-6 sm:px-7 sm:py-8 ' + faceBase}>
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-radial from-[rgba(139,92,246,0.07)] to-transparent" />
            <div className="relative flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[1.7rem] leading-tight font-medium tracking-tight text-wrap text-white/92 sm:text-2xl">
                  Matt Pasek
                </div>
                <div className="font-mono text-xs text-[#8b5cf6]/70">{'// creative dev'}</div>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-mono text-xs text-white/30">coding since</div>
                <div className="font-mono text-lg font-medium tracking-tight text-white/50">2020</div>
              </div>
            </div>
            <div className="relative flex flex-col gap-1">
              <div className="text-[14px] leading-relaxed text-pretty text-white/35">
                {githubStats.publicRepos} public repos.{' '}
                <span className="text-white/85!">Most of them mundane stuff.</span>
              </div>
              <div className="text-[14px] leading-relaxed text-pretty text-white/35">One of them is this site.</div>
              <div className="mt-2 font-mono text-[10px] text-[#8b5cf6]/35">click to see the numbers →</div>
            </div>
          </div>

          <div
            className={
              'flex rotate-y-180 flex-col justify-between border-[0.5px] border-white/5 bg-[#0c1018] px-5 py-5 sm:px-8 sm:py-6 ' +
              faceBase
            }
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b-[0.5px] border-dashed border-white/10 pb-3.5">
              <div className="font-mono text-[11px] tracking-widest text-white/25">GITHUB · RECEIPT</div>
              <div className="font-mono text-[11px] text-[#8B5CF6]/50">#matt-pasek</div>
            </div>

            <div className="grid flex-1 grid-cols-1 gap-1.5 py-3 sm:grid-cols-2 sm:gap-0 sm:py-3.5">
              <div className="flex flex-col gap-1.5 border-b-[0.5px] border-white/10 pb-2.5 sm:my-auto sm:gap-2.5 sm:border-r-[0.5px] sm:border-b-0 sm:pr-6 sm:pb-0">
                {(
                  [
                    ['member since', githubStats.memberSince, false],
                    ['public repos', githubStats.publicRepos, false],
                    ['total commits', githubStats.totalCommits, true],
                    ['this year', githubStats.thisYear, true],
                  ] as const
                ).map(([label, val, accent]) => (
                  <div key={label} className="flex min-w-0 items-baseline justify-between gap-3">
                    <span className="min-w-0 font-mono text-[11px] leading-snug text-pretty text-white/25">
                      {label}
                    </span>
                    <span
                      className="shrink-0 text-right font-mono text-xs"
                      style={{
                        color: accent ? 'rgba(139,92,246,0.8)' : 'rgba(255,255,255,0.8)',
                      }}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1.5 pt-2 sm:my-auto sm:gap-2.5 sm:pt-0 sm:pl-6">
                {(
                  [
                    ['top language', githubStats.topLanguage, false],
                    ['longest streak', githubStats.longestStreak, true],
                    ['most active', githubStats.mostActive, false],
                    ['abandoned repos', githubStats.abandonedRepos, false],
                  ] as const
                ).map(([label, val, accent]) => (
                  <div key={label} className="flex min-w-0 items-baseline justify-between gap-3">
                    <span className="min-w-0 font-mono text-[11px] leading-snug text-pretty text-white/25">
                      {label}
                    </span>
                    <span
                      className="shrink-0 text-right font-mono text-xs"
                      style={{
                        color: accent ? 'rgba(139,92,246,0.8)' : 'rgba(255,255,255,0.8)',
                      }}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t-[0.5px] border-white/10 pt-3">
              <div className="font-mono text-[10px] text-white/15">
                pulled live · github api
                <br />
                quality &gt; quantity
              </div>
              <div className="text-right font-mono text-[10px] text-white/10">
                matt-pasek.dev
                <br />* * * * *
              </div>
            </div>
          </div>
        </motion.div>

        {canTrackCursor && (
          <motion.div
            style={{ background: glareBg }}
            className={`pointer-events-none absolute inset-0 z-10 rounded-2xl ${flipping ? 'hidden' : ''}`}
          />
        )}
      </motion.div>
    </div>
  );
};

'use client';
import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

export const AboutMeCard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [rotation, setRotation] = useState(0);
  const [flipping, setFlipping] = useState(false);

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

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setFlipping(true);
    const rect = ref.current.getBoundingClientRect();
    const isRightSide = (e.clientX - rect.left) / rect.width >= 0.5;
    const delta = isRightSide ? 180 : -180;

    setRotation((prev) => prev + delta);

    timeoutRef.current = setTimeout(() => {
      setFlipping(false);
      timeoutRef.current = null;
    }, 750);
  }, []);

  const faceBase = 'absolute inset-0 rounded-2xl backface-hidden';

  return (
    <div className="my-10" style={{ perspective: '1200px' }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          translateX,
          translateY,
        }}
        className="relative inline-block cursor-pointer rounded-2xl p-px transform-3d"
        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      >
        <motion.div
          className="relative h-64 w-[580px] rounded-2xl transform-3d"
          animate={{ rotateY: rotation }}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background:
              'linear-gradient(135deg, rgba(139,92,246,0.55) 0%, rgba(80,30,150,0.18) 45%, rgba(255,255,255,0.04) 100%)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 60px rgba(139,92,246,0.08), 0 0 0 0.5px rgba(139,92,246,0.06)',
          }}
        >
          <div className={'flex flex-col justify-between bg-[#100c24] px-7 py-8 ' + faceBase}>
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-radial from-[rgba(139,92,246,0.07)] to-transparent" />
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl font-medium tracking-tight text-white/92">Matt Pasek</div>
                <div className="font-mono text-xs text-[#8b5cf6]/70">{'// creative dev'}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="font-mono text-xs text-white/30">coding since</div>
                <div className="font-mono text-lg font-medium tracking-tight text-white/50">2020</div>
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-[14px] text-white/35">
                11 public repos. <span className="text-white/85!">Most of them mundane stuff.</span>
              </div>
              <div className="text-[14px] text-white/35">One of them is this site.</div>
              <div className="mt-2 font-mono text-[10px] text-[#8b5cf6]/35">click to see the numbers →</div>
            </div>
          </div>

          <div
            className={
              'flex rotate-y-180 flex-col justify-between border-[0.5px] border-white/5 bg-[#0c1018] px-8 py-6 ' +
              faceBase
            }
          >
            <div className="flex items-center justify-between border-b-[0.5px] border-dashed border-white/10 pb-3.5">
              <div className="font-mono text-[11px] tracking-widest text-white/25">GITHUB · RECEIPT</div>
              <div className="font-mono text-[11px] text-[#8B5CF6]/50">#matt-pasek</div>
            </div>

            <div className="grid flex-1 grid-cols-2 gap-0 py-3.5">
              <div className="my-auto flex flex-col gap-2.5 border-r-[0.5px] border-white/10 pr-6">
                {(
                  [
                    ['member since', '2020', false],
                    ['public repos', '11', false],
                    ['total commits', '———', true],
                    ['this year', '———', true],
                  ] as const
                ).map(([label, val, accent]) => (
                  <div key={label} className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-[11px] whitespace-nowrap text-white/25">{label}</span>
                    <span
                      className="text-right font-mono text-xs"
                      style={{
                        color: accent ? 'rgba(139,92,246,0.8)' : 'rgba(255,255,255,0.8)',
                      }}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>
              <div className="my-auto flex flex-col gap-2.5 pl-6">
                {(
                  [
                    ['top language', 'TypeScript', false],
                    ['longest streak', '——— days', true],
                    ['most active', 'late nights', false],
                    ['abandoned repos', 'honestly, most', false],
                  ] as const
                ).map(([label, val, accent]) => (
                  <div key={label} className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-[11px] whitespace-nowrap text-white/25">{label}</span>
                    <span
                      className="text-right font-mono text-xs"
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

            <div className="flex items-center justify-between border-t-[0.5px] border-white/10 pt-3">
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

        <motion.div
          style={{ background: glareBg }}
          className={`pointer-events-none absolute inset-0 z-10 rounded-2xl ${flipping ? 'hidden' : ''}`}
        />
      </motion.div>
    </div>
  );
};

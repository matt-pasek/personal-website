'use client';
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

export const AboutMeCard = () => {
  const ref = useRef<HTMLDivElement>(null);

  const ROTATE_DEPTH = 10;
  const TRANSLATE_DEPTH = 5;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`-${ROTATE_DEPTH}deg`, `${ROTATE_DEPTH}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`${ROTATE_DEPTH}deg`, `-${ROTATE_DEPTH}deg`]);

  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [`-${TRANSLATE_DEPTH}px`, `${TRANSLATE_DEPTH}px`]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [`${TRANSLATE_DEPTH}px`, `-${TRANSLATE_DEPTH}px`]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.7) 10%, rgba(255, 255, 255, 0.55) 20%, rgba(255, 255, 255, 0) 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="perspective-distant transform-3d">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
          translateX,
          translateY,
        }}
        initial={{ scale: 1, z: 0 }}
        whileHover={{
          scale: 1.05,
          z: 50,
          transition: { duration: 0.2 },
        }}
        className="relative rounded-2xl"
      >
        <div
          className="my-10 flex min-w-2xl cursor-pointer flex-col items-stretch gap-10 rounded-2xl border border-[#342464] bg-linear-60 from-[#130F2C] to-[#140F2E] p-8"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'none',
            opacity: 1,
          }}
        >
          <div className="flex shrink-0 items-center justify-between text-white">
            <div className="flex flex-col">
              <span className="text-2xl font-semibold tracking-tight">Mateusz Pasek</span>
              <span className="font-mono text-sm tracking-tighter text-[#C896FF]">{'// creative dev'}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm text-gray-300/20">coding since</span>
              <span className="font-mono text-lg font-medium opacity-60">2020</span>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-lg text-white/50">
              11 public repos. <span className="text-white">Most of them mundane stuff.</span>
            </p>
            <p className="text-lg text-white/50">One of them is this site.</p>
            <span className="mt-4 font-mono text-xs text-[#C896FF]/30">click to see the numbers</span>
          </div>
        </div>
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 h-full w-full rounded-2xl mix-blend-overlay"
          style={{
            background: glareBackground,
            opacity: 0.6,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </div>
  );
};

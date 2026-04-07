'use client';

import { useEffect, useRef } from 'react';
import { Mode } from './types';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  baseOpacity: number;
  phase: number;
  radius: number;
}

const PURPLE = '#8C50FF';
const CYAN = '#50C8FF';

const MODE_CONFIG: Record<Mode, { count: number; colors: string[]; opacityRange: [number, number]; speed: number }> = {
  idle: { count: 8, colors: [PURPLE], opacityRange: [0.04, 0.1], speed: 0.08 },
  music: { count: 16, colors: [PURPLE], opacityRange: [0.08, 0.18], speed: 0.15 },
  coding: { count: 16, colors: [CYAN], opacityRange: [0.08, 0.18], speed: 0.15 },
  both: { count: 28, colors: [PURPLE, CYAN], opacityRange: [0.1, 0.22], speed: 0.22 },
};

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function ParticleField({ mode }: { mode: Mode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const config = MODE_CONFIG[mode];
    let animId: number;
    let time = 0;

    const applySize = () => {
      const dpr = window.devicePixelRatio ?? 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    applySize();

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    const particles: Particle[] = Array.from({ length: config.count }, () => {
      const angle = Math.random() * Math.PI * 2;
      return {
        x: rand(0, w),
        y: rand(0, h),
        vx: Math.cos(angle) * config.speed * rand(0.5, 1.5),
        vy: Math.sin(angle) * config.speed * rand(0.5, 1.5),
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        baseOpacity: rand(config.opacityRange[0], config.opacityRange[1]),
        phase: Math.random() * Math.PI * 2,
        radius: rand(1.5, 2.5),
      };
    });

    const draw = () => {
      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      ctx.clearRect(0, 0, cw, ch);
      time += 0.016;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = cw;
        if (p.x > cw) p.x = 0;
        if (p.y < 0) p.y = ch;
        if (p.y > ch) p.y = 0;

        const alpha = p.baseOpacity * (0.6 + 0.4 * Math.sin(time * 0.8 + p.phase));
        const hex = Math.round(alpha * 255)
          .toString(16)
          .padStart(2, '0');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + hex;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    const observer = new ResizeObserver(() => applySize());
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [mode]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ pointerEvents: 'none' }} />;
}

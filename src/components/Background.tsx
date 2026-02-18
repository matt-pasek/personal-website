'use client';

import { useEffect, useRef } from 'react';
import { useBlobState } from '@/contexts/BlobStateContext';

export default function DynamicBackground() {
  const { stateRef } = useBlobState();
  const primaryRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const update = () => {
      const { intensity, processing } = stateRef.current;

      const pulseScale = 80 + intensity * 20;
      const primaryOpacity = 0.3 + intensity * 0.15;
      const glowIntensity = processing * 0.2;

      if (primaryRef.current) {
        primaryRef.current.style.background = `radial-gradient(
          ellipse ${pulseScale}% ${pulseScale * 0.8}% at 50% 50%,
          rgba(100, 50, 200, ${primaryOpacity}) 0%,
          rgba(70, 30, 160, ${primaryOpacity * 0.7}) 30%,
          rgba(40, 15, 100, ${primaryOpacity * 0.4}) 60%,
          transparent 100%
        )`;
      }

      if (glowRef.current) {
        glowRef.current.style.opacity = String(glowIntensity);
      }

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [stateRef]);

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#0a0515]" />
      <div ref={primaryRef} className="absolute inset-0" />
      <div
        ref={glowRef}
        className="absolute inset-0 mix-blend-screen"
        style={{
          background: `radial-gradient(
            circle at 50% 50%,
            rgba(160, 100, 255, 0.3) 0%,
            transparent 80%
          )`,
        }}
      />
    </div>
  );
}

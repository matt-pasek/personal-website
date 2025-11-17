'use client';

import { useBlobState } from '@/contexts/BlobStateContext';

export default function DynamicBackground() {
  const { state } = useBlobState();
  const { intensity, processing } = state;

  const pulseScale = 80 + intensity * 20;
  const primaryOpacity = 0.6 + intensity * 0.2;
  const glowIntensity = processing * 0.4;

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#0a0515]" />

      <div
        className="absolute inset-0 transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(
            ellipse ${pulseScale}% ${pulseScale * 0.8}% at 50% 60%,
            rgba(140, 80, 255, ${primaryOpacity}) 0%,
            rgba(100, 50, 220, 0.8) 25%,
            rgba(60, 30, 150, 0.9) 50%,
            rgba(30, 15, 80, 0.95) 75%,
            #0a0515 100%
          )`,
        }}
      />

      <div
        className="absolute inset-0 mix-blend-screen transition-opacity duration-700"
        style={{
          opacity: glowIntensity,
          background: `radial-gradient(
            circle at 50% 50%,
            rgba(160, 100, 255, 0.3) 0%,
            transparent 60%
          )`,
        }}
      />
    </div>
  );
}

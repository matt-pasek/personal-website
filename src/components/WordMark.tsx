'use client';

import dynamic from 'next/dynamic';

const FogSphere = dynamic(() => import('@/components/animated/FogSphere'), { ssr: false });

type Size = 'sm' | 'lg';

const config: Record<Size, { orbPx: number; textClass: string }> = {
  sm: { orbPx: 48, textClass: 'text-xl font-extrabold' },
  lg: { orbPx: 80, textClass: 'text-4xl font-bold' },
};

interface WordMarkProps {
  size?: Size;
  bgColor?: string;
}

export function WordMark({ size = 'lg' }: WordMarkProps) {
  const { orbPx, textClass } = config[size];
  return (
    <div className={`flex items-center gap-0.5 pr-1`}>
      <FogSphere
        width={orbPx}
        height={orbPx}
        coreColor="#52c989"
        glowColor="#0d2010"
        backgroundColor="#000000"
        densityGradient
        axisTilt={0.32}
        wobbleSpeed={0.05}
        speed={0.6}
        rotationSpeed={0.08}
        rayMarchSteps={24}
        turbulenceAmplitude={2.2}
        turbulenceFrequency={6.5}
        sphereRadius={2.8}
        passthrough={0.07}
        brightness={0.0006}
        colorMix={0.3}
        blur={0.5}
        blurResolution={1}
        opacity={1}
        dpr={2.5}
      />
      <span className={`tracking-[-0.03em] whitespace-nowrap text-portfolio-ink ${textClass}`}>matt pasek</span>
    </div>
  );
}

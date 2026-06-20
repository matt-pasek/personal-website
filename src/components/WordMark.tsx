'use client';

import dynamic from 'next/dynamic';

const FogSphere = dynamic(() => import('@/components/animated/FogSphere'), { ssr: false });

type Size = 'sm' | 'lg';
type Variant = 'inline' | 'stacked';

const config: Record<Size, { orbPx: number; inlineTextClass: string; stackedTextClass: string }> = {
  sm: { orbPx: 48, inlineTextClass: 'text-xl font-extrabold', stackedTextClass: 'text-[52px] font-extrabold' },
  lg: {
    orbPx: 80,
    inlineTextClass: 'text-4xl font-bold',
    stackedTextClass: 'text-[clamp(48px,7vw,72px)] font-extrabold',
  },
};

interface WordMarkProps {
  size?: Size;
  variant?: Variant;
  bgColor?: string;
}

export function WordMark({ size = 'lg', variant = 'inline', bgColor = '#000000' }: WordMarkProps) {
  const { orbPx, inlineTextClass, stackedTextClass } = config[size];
  const isStacked = variant === 'stacked';
  const orbSize = orbPx * (isStacked ? 1.5 : 1);

  return (
    <div className={`flex items-center gap-0.5 pr-1`}>
      <FogSphere
        width={orbSize}
        height={orbSize}
        coreColor="#52c989"
        glowColor="#0d2010"
        backgroundColor={bgColor}
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
      {isStacked ? (
        <span
          className={`flex flex-col leading-[0.6] tracking-normal whitespace-nowrap text-portfolio-ink ${stackedTextClass}`}
        >
          <span>matt</span>
          <span>
            pasek<span className="text-portfolio-green">.</span>
          </span>
        </span>
      ) : (
        <span className={`tracking-[-0.03em] whitespace-nowrap text-portfolio-ink ${inlineTextClass}`}>matt pasek</span>
      )}
    </div>
  );
}

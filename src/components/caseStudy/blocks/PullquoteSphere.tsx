'use client';

import dynamic from 'next/dynamic';

const FogSphere = dynamic(() => import('@/components/animated/FogSphere'), { ssr: false });

export function PullquoteSphere() {
  return (
    <div className="mx-auto mb-4 h-20 w-20">
      <FogSphere
        width="100%"
        height="100%"
        className="!mix-blend-normal"
        coreColor="#52c989"
        glowColor="#1e6b3a"
        backgroundColor="#0c0915"
        speed={0.35}
        rotationSpeed={0.04}
        turbulenceAmplitude={1.8}
        turbulenceFrequency={5.5}
        turbulenceIters={7}
        sphereRadius={2.6}
        brightness={0.0007}
        passthrough={0.06}
        colorMix={0.4}
        blur={1.5}
        blurResolution={0.8}
        densityGradient
        axisTilt={0.18}
        wobbleSpeed={0.03}
        opacity={0.92}
        dpr={1.5}
      />
    </div>
  );
}

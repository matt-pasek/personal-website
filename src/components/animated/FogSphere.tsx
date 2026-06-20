'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

export interface FogSphereProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  children?: ReactNode;
  speed?: number;
  rotationSpeed?: number;
  rayMarchSteps?: number;
  turbulenceIters?: number;
  turbulenceAmplitude?: number;
  turbulenceFrequency?: number;
  turbulenceExponent?: number;
  sphereRadius?: number;
  passthrough?: number;
  brightness?: number;
  coreColor?: string;
  glowColor?: string;
  backgroundColor?: string;
  colorMix?: number;
  invertForLight?: boolean;
  opacity?: number;
  dpr?: number;
  blur?: number;
  blurResolution?: number;
  axisTilt?: number;
  wobbleSpeed?: number;
  densityGradient?: boolean;
}

const screenVertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fogFragment = `
precision highp float;

varying vec2 vUv;

uniform float uTime;
uniform vec2  uRes;

uniform float uSpeed;
uniform float uRotSpeed;
uniform float uSteps;
uniform float uTurbN;
uniform float uTurbAmp;
uniform float uTurbFreq;
uniform float uTurbExp;

uniform float uRadius;
uniform float uPassthrough;
uniform float uBrightness;

uniform vec3  uCore;
uniform vec3  uGlow;
uniform float uColorMix;

uniform vec3  uBg;
uniform float uInvert;
uniform float uAlpha;
uniform float uAxisTilt;
uniform float uDensityGrad;

const int MAX_STEPS = 32;
const int MAX_TURB  = 10;

mat2 rot2(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

float hash(vec2 p) {
  return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
}

vec3 warpField(vec3 p, float t) {
  float freq  = uTurbFreq;
  float amp   = uTurbAmp;
  float phase = uSpeed * t;

  for (int i = 0; i < MAX_TURB; i++) {
    if (float(i) >= uTurbN) break;

    if (i >= 2 && i <= 4) {
      freq *= uTurbExp;
      continue;
    }

    float a = freq * p.y + phase;
    float s = sin(a) * amp / freq;

    vec3 dir;
    int m = i - (i / 3) * 3;
    if (m == 0)      dir = vec3(0.8, 0.0, 0.6);
    else if (m == 1) dir = vec3(0.0, 0.6, 0.8);
    else             dir = vec3(0.6, 0.8, 0.0);

    p += dir * s;
    p.xz = rot2(0.6) * p.xz;
    p.xy = rot2(0.4) * p.xy;

    freq *= uTurbExp;
  }

  return p;
}

float densityShell(vec3 p) {
  float d = length(p) - uRadius;
  if (d < 0.0) return -d * 0.7 + uPassthrough;
  return d * 0.7 + uPassthrough * 2.0;
}

void main() {
  vec2 uv = (vUv - 0.5);
  uv.x *= uRes.x / uRes.y;

  vec3 dir = normalize(vec3(uv * 2.0, 1.0));
  vec3 pos = vec3(0.0, 0.0, -5.0);

  float jitter = hash(gl_FragCoord.xy) - 0.5;
  pos += dir * jitter * 0.4;

  pos.yz = rot2(uAxisTilt) * pos.yz;
  dir.yz = rot2(uAxisTilt) * dir.yz;

  float orbit = uTime * uRotSpeed * uSpeed;
  pos.xz = rot2(orbit) * pos.xz;
  dir.xz = rot2(orbit) * dir.xz;

  vec3 accum = vec3(0.0);
  vec3 baseTint = mix(uCore, uGlow, clamp(uColorMix, 0.0, 1.0));

  for (int i = 0; i < MAX_STEPS; i++) {
    if (float(i) >= uSteps) break;
    float vol = densityShell(warpField(pos, uTime));
    vec3 tint;
    if (uDensityGrad > 0.5) {
      float volNorm = clamp((vol - uPassthrough) / (uRadius * 0.5), 0.0, 1.0);
      tint = mix(uCore, uGlow, volNorm);
    } else {
      tint = baseTint;
    }
    pos += dir * (vol / 2.5);
    accum += tint / vol;
  }

  vec3 col = tanh(uBrightness * sqrt(accum * accum * accum));

  if (uInvert > 0.5) {
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(uBg, baseTint * 0.85, lum);
  } else {
    col = mix(uBg, col + uBg * (1.0 - clamp(dot(col, vec3(1.0)), 0.0, 1.0)), 1.0);
  }

  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  float fogAlpha = clamp(lum * 2.2, 0.0, 1.0) * uAlpha;
  gl_FragColor = vec4(col, fogAlpha);
}
`;

const blurFragment = `
precision highp float;

varying vec2 vUv;

uniform sampler2D uTex;
uniform vec2  uDir;
uniform float uRadiusPx;

void main() {
  const float w0 = 0.2270270270;
  const float w1 = 0.1945945946;
  const float w2 = 0.1216216216;
  const float w3 = 0.0540540541;
  const float w4 = 0.0162162162;

  vec2 o1 = uDir * uRadiusPx * 1.0;
  vec2 o2 = uDir * uRadiusPx * 2.0;
  vec2 o3 = uDir * uRadiusPx * 3.0;
  vec2 o4 = uDir * uRadiusPx * 4.0;

  vec4 c = texture2D(uTex, vUv) * w0;
  c += texture2D(uTex, vUv + o1) * w1;
  c += texture2D(uTex, vUv - o1) * w1;
  c += texture2D(uTex, vUv + o2) * w2;
  c += texture2D(uTex, vUv - o2) * w2;
  c += texture2D(uTex, vUv + o3) * w3;
  c += texture2D(uTex, vUv - o3) * w3;
  c += texture2D(uTex, vUv + o4) * w4;
  c += texture2D(uTex, vUv - o4) * w4;

  gl_FragColor = c;
}
`;

const copyFragment = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
void main() { gl_FragColor = texture2D(uTex, vUv); }
`;

const HEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

function hexToRgb(hex: string): [number, number, number] {
  const m = HEX.exec(hex);
  if (!m) return [0, 0, 0];
  return [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255];
}

type PipelineProps = Required<Omit<FogSphereProps, 'width' | 'height' | 'className' | 'children' | 'dpr'>>;

interface PipelineRefs {
  fogMat: THREE.ShaderMaterial;
  blurMat: THREE.ShaderMaterial;
  copyMat: THREE.ShaderMaterial;
  screenGeom: THREE.PlaneGeometry;
  passScene: THREE.Scene;
  passMesh: THREE.Mesh;
  passCam: THREE.OrthographicCamera;
  drawSize: THREE.Vector2;
  targets: {
    a: THREE.WebGLRenderTarget;
    b: THREE.WebGLRenderTarget;
    width: number;
    height: number;
  } | null;
}

function createRefs(): PipelineRefs {
  const screenGeom = new THREE.PlaneGeometry(2, 2);

  const fogMat = new THREE.ShaderMaterial({
    vertexShader: screenVertex,
    fragmentShader: fogFragment,
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uSpeed: { value: 1 },
      uRotSpeed: { value: 0.1 },
      uSteps: { value: 22 },
      uTurbN: { value: 8 },
      uTurbAmp: { value: 1.4 },
      uTurbFreq: { value: 4 },
      uTurbExp: { value: 2 },
      uRadius: { value: 3 },
      uPassthrough: { value: 0.11 },
      uBrightness: { value: 0.0005 },
      uCore: { value: new THREE.Vector3(0.85, 0.32, 1.0) },
      uGlow: { value: new THREE.Vector3(1.0, 0.45, 0.85) },
      uColorMix: { value: 0.5 },
      uBg: { value: new THREE.Vector3(0, 0, 0) },
      uInvert: { value: 0 },
      uAlpha: { value: 1 },
      uAxisTilt: { value: 0 },
      uDensityGrad: { value: 0 },
    },
  });

  const blurMat = new THREE.ShaderMaterial({
    vertexShader: screenVertex,
    fragmentShader: blurFragment,
    uniforms: {
      uTex: { value: null },
      uDir: { value: new THREE.Vector2(1, 0) },
      uRadiusPx: { value: 1 },
    },
  });

  const copyMat = new THREE.ShaderMaterial({
    vertexShader: screenVertex,
    fragmentShader: copyFragment,
    transparent: true,
    uniforms: { uTex: { value: null } },
  });

  const passScene = new THREE.Scene();
  const passMesh = new THREE.Mesh(screenGeom, fogMat);
  passScene.add(passMesh);

  const passCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  passCam.position.z = 1;

  return {
    fogMat,
    blurMat,
    copyMat,
    screenGeom,
    passScene,
    passMesh,
    passCam,
    drawSize: new THREE.Vector2(),
    targets: null,
  };
}

function ensureTargets(refs: PipelineRefs, w: number, h: number) {
  const cur = refs.targets;
  if (cur && cur.width === w && cur.height === h) return cur;
  if (cur) {
    cur.a.dispose();
    cur.b.dispose();
  }
  const opts: THREE.RenderTargetOptions = {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    wrapS: THREE.ClampToEdgeWrapping,
    wrapT: THREE.ClampToEdgeWrapping,
    type: THREE.UnsignedByteType,
    depthBuffer: false,
    stencilBuffer: false,
  };
  const next = {
    a: new THREE.WebGLRenderTarget(w, h, opts),
    b: new THREE.WebGLRenderTarget(w, h, opts),
    width: w,
    height: h,
  };
  refs.targets = next;
  return next;
}

function FogPipeline(props: PipelineProps) {
  const { gl, size } = useThree();

  const refsContainer = useRef<PipelineRefs | null>(null);
  if (refsContainer.current === null) {
    refsContainer.current = createRefs();
  }

  useEffect(() => {
    return () => {
      const r = refsContainer.current;
      if (!r) return;
      r.fogMat.dispose();
      r.blurMat.dispose();
      r.copyMat.dispose();
      r.screenGeom.dispose();
      if (r.targets) {
        r.targets.a.dispose();
        r.targets.b.dispose();
        r.targets = null;
      }
    };
  }, []);

  useFrame((state) => {
    const r = refsContainer.current;
    if (!r) return;
    const u = r.fogMat.uniforms;
    u.uTime.value = state.clock.elapsedTime;

    gl.getDrawingBufferSize(r.drawSize);
    const drawW = Math.max(1, Math.floor(r.drawSize.x));
    const drawH = Math.max(1, Math.floor(r.drawSize.y));
    u.uRes.value.set(size.width, size.height);
    u.uSpeed.value = props.speed;
    u.uRotSpeed.value = props.rotationSpeed;
    u.uSteps.value = props.rayMarchSteps;
    u.uTurbN.value = props.turbulenceIters;
    u.uTurbAmp.value = props.turbulenceAmplitude;
    u.uTurbFreq.value = props.turbulenceFrequency;
    u.uTurbExp.value = props.turbulenceExponent;
    u.uRadius.value = props.sphereRadius;
    u.uPassthrough.value = props.passthrough;
    u.uBrightness.value = props.brightness;
    u.uColorMix.value = props.colorMix;
    u.uAlpha.value = props.opacity;
    u.uInvert.value = props.invertForLight ? 1 : 0;
    u.uAxisTilt.value = Math.sin(state.clock.elapsedTime * 2 * Math.PI * props.wobbleSpeed) * props.axisTilt;
    u.uDensityGrad.value = props.densityGradient ? 1 : 0;

    const core = hexToRgb(props.coreColor);
    u.uCore.value.set(core[0], core[1], core[2]);
    const glow = hexToRgb(props.glowColor);
    u.uGlow.value.set(glow[0], glow[1], glow[2]);
    const bg = hexToRgb(props.backgroundColor);
    u.uBg.value.set(bg[0], bg[1], bg[2]);

    if (props.blur <= 0) {
      r.passMesh.material = r.fogMat;
      gl.setRenderTarget(null);
      gl.render(r.passScene, r.passCam);
      return;
    }

    const scale = Math.min(1, Math.max(0.25, props.blurResolution));
    const rtW = Math.max(1, Math.floor(drawW * scale));
    const rtH = Math.max(1, Math.floor(drawH * scale));
    const t = ensureTargets(r, rtW, rtH);

    r.passMesh.material = r.fogMat;
    gl.setRenderTarget(t.a);
    gl.render(r.passScene, r.passCam);

    r.passMesh.material = r.blurMat;
    r.blurMat.uniforms.uTex.value = t.a.texture;
    r.blurMat.uniforms.uDir.value.set(1 / rtW, 0);
    r.blurMat.uniforms.uRadiusPx.value = props.blur;
    gl.setRenderTarget(t.b);
    gl.render(r.passScene, r.passCam);

    r.blurMat.uniforms.uTex.value = t.b.texture;
    r.blurMat.uniforms.uDir.value.set(0, 1 / rtH);
    gl.setRenderTarget(t.a);
    gl.render(r.passScene, r.passCam);

    r.passMesh.material = r.copyMat;
    r.copyMat.uniforms.uTex.value = t.a.texture;
    gl.setRenderTarget(null);
    gl.render(r.passScene, r.passCam);
  }, 1);

  return null;
}

export default function FogSphere({
  width = '100%',
  height = '100%',
  className,
  children,
  speed = 1,
  rotationSpeed = 0.1,
  rayMarchSteps = 20,
  turbulenceIters = 10,
  turbulenceAmplitude = 2.5,
  turbulenceFrequency = 7.5,
  turbulenceExponent = 2.1,
  sphereRadius = 2.9,
  passthrough = 0.05,
  brightness = 0.0005,
  coreColor = '#D946EF',
  glowColor = '#F472B6',
  backgroundColor = '#0A0A0A',
  colorMix = 0.5,
  invertForLight = false,
  opacity = 1,
  dpr = 1.5,
  blur = 1,
  blurResolution = 1,
  axisTilt = 0,
  wobbleSpeed = 0.05,
  densityGradient = false,
}: FogSphereProps) {
  return (
    <div className={cn('relative overflow-hidden mix-blend-difference', className)} style={{ width, height }}>
      <Canvas
        className="absolute inset-0"
        dpr={[1, dpr]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1, left: -1, right: 1, top: 1, bottom: -1 }}
      >
        <FogPipeline
          speed={speed}
          rotationSpeed={rotationSpeed}
          rayMarchSteps={rayMarchSteps}
          turbulenceIters={turbulenceIters}
          turbulenceAmplitude={turbulenceAmplitude}
          turbulenceFrequency={turbulenceFrequency}
          turbulenceExponent={turbulenceExponent}
          sphereRadius={sphereRadius}
          passthrough={passthrough}
          brightness={brightness}
          coreColor={coreColor}
          glowColor={glowColor}
          backgroundColor={backgroundColor}
          colorMix={colorMix}
          invertForLight={invertForLight}
          opacity={opacity}
          blur={blur}
          blurResolution={blurResolution}
          axisTilt={axisTilt}
          wobbleSpeed={wobbleSpeed}
          densityGradient={densityGradient}
        />
      </Canvas>
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

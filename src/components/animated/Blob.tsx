'use client';

import { Suspense, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { createNoise3D } from 'simplex-noise';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useBlobState } from '@/contexts/BlobStateContext';

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      const handler = () => callback();
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const vertexShader = `
varying vec3 vNormal;
varying vec3 vWorldPos;

void main() {
  vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float time;
varying vec3 vNormal;
varying vec3 vWorldPos;

void main() {
  vec3 viewDir = normalize(cameraPosition - vWorldPos);
  float fresnel = 1.0 - max(dot(normalize(vNormal), viewDir), 0.0);

  vec3 purple = vec3(0.545, 0.361, 0.965);
  vec3 teal   = vec3(0.322, 0.788, 0.537);
  vec3 core   = vec3(0.88, 0.80, 1.00);

  float f2 = fresnel * fresnel;
  float f5 = f2 * f2 * fresnel;

  vec3 color = mix(core, purple, smoothstep(0.0, 0.45, fresnel));
  color = mix(color, teal, smoothstep(0.35, 1.0, fresnel));

  color += teal * f5 * 1.8;

  float bands = sin(fresnel * 22.0 - time * 0.4) * 0.5 + 0.5;
  float rings = smoothstep(0.55, 0.82, bands) * (1.0 - f2 * f2);
  color += mix(purple, teal, fresnel) * rings * 0.45;

  color += core * pow(1.0 - fresnel, 5.0) * 0.6;

  float alpha = 1.0 - f5 * f5 * 1.8;
  alpha = clamp(alpha, 0.0, 1.0);

  gl_FragColor = vec4(color, alpha);
}
`;

const BlobMesh = ({ isMobile }: { isMobile: boolean }) => {
  const { updateState } = useBlobState();

  const SPEED = 0.001;
  const MIN_PROCESSING = 0.5;
  const BLOB_SIZE = 2;
  const ROTATION_INFLUENCE = 0.01;

  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const noise3D = useRef(createNoise3D()).current;
  const timeRef = useRef(0);

  const segments = isMobile ? 64 : 128;
  const geometry = useMemo(() => new THREE.SphereGeometry(BLOB_SIZE, segments, segments), [segments]);
  const uniforms = useMemo(() => ({ time: { value: 0 } }), []);

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current.x = e.clientX / window.innerWidth;
      targetMouseRef.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    timeRef.current += delta;
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = timeRef.current;
    }

    mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;
    const mouseOffsetX = (mouseX - 0.5) * 2;
    const mouseOffsetY = (mouseY - 0.5) * 2;

    const distanceFromCenter = Math.sqrt(Math.pow(mouseX - 0.5, 2) + Math.pow(mouseY - 0.5, 2));
    const dynamicProcessing = MIN_PROCESSING + 0.5 * (1 - Math.min(distanceFromCenter * 2, 1));

    const time = performance.now() * 0.00001 * SPEED * Math.pow(dynamicProcessing, 3);
    const intensity = distanceFromCenter * 4;
    const spikes = (0.5 + intensity) * dynamicProcessing * 1.2;

    updateState({ intensity, mouseX, mouseY, processing: dynamicProcessing, distanceFromCenter });

    const effectiveSpikes = isMobile ? 1.1 : spikes;
    const effectiveAmplitude = isMobile ? 0.34 : 0.3;

    const positionAttribute = meshRef.current.geometry.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      vertex
        .normalize()
        .multiplyScalar(
          1 +
            effectiveAmplitude *
              noise3D(
                vertex.x * effectiveSpikes + mouseOffsetX,
                vertex.y * effectiveSpikes + mouseOffsetY,
                vertex.z * effectiveSpikes + time,
              ),
        );
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    positionAttribute.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();

    meshRef.current.rotation.x += 0.002 + (mouseY - 0.5) * ROTATION_INFLUENCE;
    meshRef.current.rotation.y += 0.002 + (mouseX - 0.5) * ROTATION_INFLUENCE;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};

const Blob = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isReady, setIsReady] = useState(false);
  const readyFrameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (readyFrameRef.current !== null) {
        cancelAnimationFrame(readyFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-visible">
      <Canvas
        onCreated={() => {
          readyFrameRef.current = requestAnimationFrame(() => {
            readyFrameRef.current = requestAnimationFrame(() => {
              setIsReady(true);
            });
          });
        }}
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
        }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        <Suspense fallback={null}>
          <BlobMesh isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Blob;

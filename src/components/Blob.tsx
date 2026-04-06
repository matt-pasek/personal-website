'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { createNoise3D } from 'simplex-noise';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useBlobState } from '@/contexts/BlobStateContext';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

const BlobMesh = ({ isMobile }: { isMobile: boolean }) => {
  const { updateState } = useBlobState();

  const SPEED = 0.001;
  const MIN_PROCESSING = 0.5;
  const BLOB_SIZE = 2;
  const ROTATION_INFLUENCE = 0.01;

  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const meshRef = useRef<THREE.Mesh>(null);
  const noise3D = useRef(createNoise3D()).current;

  const envMap = useLoader(TextureLoader, '/original_texture.jpeg');
  envMap.setValues({
    mapping: THREE.EquirectangularReflectionMapping,
    colorSpace: THREE.SRGBColorSpace,
  });

  const segments = isMobile ? 64 : 128;
  const geometry = useMemo(() => new THREE.SphereGeometry(BLOB_SIZE, segments, segments), [segments]);

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

  useFrame(() => {
    if (!meshRef.current) return;

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

    updateState({
      intensity,
      mouseX,
      mouseY,
      processing: dynamicProcessing,
      distanceFromCenter,
    });

    const effectiveSpikes = isMobile ? 1.1 : spikes;
    const effectiveAmplitude = isMobile ? 0.34 : 0.3;
    const rotationSpeed = isMobile ? 0.0004 : 0.002;

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

    meshRef.current.rotation.x += rotationSpeed + (mouseY - 0.5) * ROTATION_INFLUENCE;
    meshRef.current.rotation.y += rotationSpeed + (mouseX - 0.5) * ROTATION_INFLUENCE;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhongMaterial
        emissive={0x4a148c}
        emissiveIntensity={0.2}
        color={0xffffff}
        shininess={10000}
        envMap={envMap}
        reflectivity={1.0}
        specular={0xffffff}
      />
    </mesh>
  );
};

const Blob = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div className="h-[600px] w-[600px] shrink-0 overflow-visible md:h-[750px] md:w-[750px]">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <fog attach="fog" args={[0x6932dc, 5, 15]} />
        <directionalLight color={0xc896ff} intensity={0.8} position={[0, 500, 200]} />
        <directionalLight color={0x6932dc} intensity={0.3} position={[0, -500, 400]} />
        <ambientLight color={0xa064f0} intensity={0.4} />

        <Suspense fallback={null}>
          <BlobMesh isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Blob;

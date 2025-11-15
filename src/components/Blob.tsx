'use client';

import { Suspense, useEffect, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';

const BlobMesh = () => {
  const SPEED = 0.0001;
  const PROCESSING = 0.9;
  const BLOB_SIZE = 2;

  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const meshRef = useRef<THREE.Mesh>(null);
  const noise3D = createNoise3D();

  const envMap = useLoader(TextureLoader, '/original_texture.jpeg');
  envMap.setValues({
    mapping: THREE.EquirectangularReflectionMapping,
    colorSpace: THREE.SRGBColorSpace,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current.x = e.clientX / window.innerWidth;
      targetMouseRef.current.y = e.clientY / window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;
    const mouseOffsetX = (mouseX - 0.5) * 2;
    const mouseOffsetY = (mouseY - 0.5) * 2;

    const time = performance.now() * 0.00001 * SPEED * Math.pow(PROCESSING, 3);
    const intensity = Math.sqrt(Math.pow(mouseX - 0.5, 2) + Math.pow(mouseY - 0.5, 2)) * 4;
    const spikes = (0.5 + intensity) * PROCESSING * 1.2;

    const geometry = meshRef.current.geometry;
    const positionAttribute = geometry.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      vertex
        .normalize()
        .multiplyScalar(
          1 +
            0.3 * noise3D(vertex.x * spikes + mouseOffsetX, vertex.y * spikes + mouseOffsetY, vertex.z * spikes + time),
        );
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();

    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[BLOB_SIZE, 128, 128]} />
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
  return (
    <div className="h-[750px] w-[750px]">
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
          <BlobMesh />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Blob;

'use client';
import * as THREE from 'three';
import { useRef, useState } from 'react';
import { animated, useSpring } from '@react-spring/three';
import { Canvas } from '@react-three/fiber';

export default function LandingPage() {
  return (
    <div>
      hello world
      <div className="w-full h-[25rem]    mt-8 z-10 ">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
        </Canvas>
      </div>
    </div>
  );
}

export function NeonWave({
  color,
  size,
  boundary,
}: {
  color: string;
  size: number;
  boundary: { minX: number; maxX: number; minY: number; maxY: number };
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Generate random initial positions within the given boundary
  const initialX =
    boundary.minX + Math.random() * (boundary.maxX - boundary.minX - size);
  const initialY =
    boundary.minY + Math.random() * (boundary.maxY - boundary.minY - size);
  const initialZ = (Math.random() - 0.5) * 2; // Adjust Z position for more noticeable depth

  // Pulsating animation for scale and emissive intensity
  const { scale, emissiveIntensity } = useSpring({
    scale: hovered ? [1.2, 1.2, 1.2] : [1.1, 1.1, 1.1], // Initial scale set to slightly larger
    emissiveIntensity: hovered ? 5 : 2.5, // Initial emissive intensity set to a higher value
    config: { tension: 120, friction: 10 },
    loop: { reverse: true },
    from: {
      scale: [1, 1, 1],
      emissiveIntensity: 1.3,
    },
  });

  // Bouncing animation for floating effect
  const { position } = useSpring({
    position: [
      initialX,
      Math.min(
        Math.max(
          initialY + (hovered ? 0.3 : Math.random() * 0.5 - 0.25),
          boundary.minY
        ),
        boundary.maxY - size
      ),
      initialZ,
    ],
    config: { tension: 120, friction: 10 },
    loop: { reverse: true },
  });

  // Create a wavy curve for the tube geometry
  const waveCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.5, 1, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(1.5, -1, 0),
    new THREE.Vector3(2, 0, 0),
    new THREE.Vector3(2.5, 1, 0),
    new THREE.Vector3(3, 0, 0),
  ]);

  return (
    <animated.mesh
      ref={meshRef}
      // @ts-expect-error
      position={position}
      // @ts-expect-error
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <tubeGeometry args={[waveCurve, 100, size, 16, false]} />
      <animated.meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
        transparent
        opacity={0.9}
      />
    </animated.mesh>
  );
}

// NeonWaveContainer component to handle spawning multiple NeonWaves
export function NeonWaveContainer() {
  // const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const colors = [
    '#ff69b4',
    '#00ffff',
    '#9400d3',
    '#ff4500',
    '#00ff00',
    '#ffff00',
    '#ff1493',
    '#1e90ff',
    '#7fff00',
    '#ff8c00',
  ];

  // Expanded boundary for the waves
  const boundary = {
    minX: -5, // Minimum X position (left edge)
    maxX: 5, // Maximum X position (right edge)
    minY: -3, // Minimum Y position (bottom edge)
    maxY: 3, // Maximum Y position (top edge)
  };

  return (
    <>
      {/* Spawning neon waves within the expanded boundary */}
      {Array.from({ length: 14 }).map((_, index) => (
        // Generate a random color for each wave
        <NeonWave
          key={index}
          color={colors[index % colors.length]}
          size={Math.random() * 0.2 + 0.05} // Size remains between 0.05 and 0.15
          boundary={boundary} // Pass the updated boundary
        />
      ))}
    </>
  );
}

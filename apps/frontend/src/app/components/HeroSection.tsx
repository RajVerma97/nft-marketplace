import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Button } from '@my-org/ui-components';
import * as THREE from 'three';
import { useMemo, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import RenderDinoModel from './RenderDragonModel';
import Image from 'next/image';
import LottieAnimation from './LottieAnimation';
import nftAnimation from '../../../public/nft-animation.json';

export function InteractiveScene() {
  const { mouse } = useThree();
  const [isHovered, setIsHovered] = useState(false);

  const crystals = useMemo(
    () => [
      new THREE.IcosahedronGeometry(2, 0),
      new THREE.DodecahedronGeometry(1.5, 0),
      new THREE.TetrahedronGeometry(1, 0),
    ],
    []
  );

  return (
    <group>
      <Float
        speed={isHovered ? 6 : 2}
        rotationIntensity={1.5}
        floatIntensity={3}
      >
        {crystals.map((geometry, index) => (
          <InteractiveCrystal
            key={index}
            geometry={geometry}
            mouse={mouse}
            onHoverChange={setIsHovered}
          />
        ))}
      </Float>
      <InteractiveEnergyCore isHovered={isHovered} />
    </group>
  );
}

function InteractiveCrystal({ geometry, mouse, onHoverChange }) {
  const crystalRef = useRef();
  const [isHovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    crystalRef.current.rotation.y = t * 0.5 + mouse.x * Math.PI;
    crystalRef.current.rotation.x = t * 0.3 + mouse.y * Math.PI;

    const emissiveColor = crystalRef.current.material.emissive;
    emissiveColor.setHSL(0.5 + 0.5 * Math.sin(t), 0.9, isHovered ? 0.7 : 0.5);
  });

  const { scale } = useSpring({
    scale: isHovered ? 1.2 : 1,
    config: { mass: 5, tension: 400, friction: 50 },
  });

  return (
    <a.mesh
      ref={crystalRef}
      geometry={geometry}
      scale={scale}
      onPointerOver={() => {
        setHovered(true);
        onHoverChange(true);
      }}
      onPointerOut={() => {
        setHovered(false);
        onHoverChange(false);
      }}
    >
      <meshStandardMaterial
        color={[0.2, 0.9, 1]}
        metalness={0.6}
        roughness={0.1}
        emissive={new THREE.Color(0.1, 0.5, 0.7)}
        emissiveIntensity={1}
      />
    </a.mesh>
  );
}

function InteractiveEnergyCore({ isHovered }) {
  const coreRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scale = 1 + Math.sin(t * 2) * 0.1;
    coreRef.current.scale.set(scale, scale, scale);
    coreRef.current.rotation.y = t * 0.5;
  });

  return (
    <group ref={coreRef}>
      <Sphere args={[1, 32, 32]}>
        <meshBasicMaterial
          color={isHovered ? 'hotpink' : [5, 0.8, 2]}
          toneMapped={false}
        />
      </Sphere>
      <EnergyRays isHovered={isHovered} />
    </group>
  );
}

function EnergyRays({ isHovered }) {
  const rayRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    rayRef.current.rotation.y = t * 0.3;
  });

  const rayGeometry = useMemo(() => new THREE.ConeGeometry(0.1, 5, 8), []);

  return (
    <group ref={rayRef}>
      {[...Array(8)].map((_, index) => (
        <mesh
          key={index}
          geometry={rayGeometry}
          position={[Math.sin(index) * 2, Math.cos(index) * 2, 0]}
          rotation={[Math.PI / 2, index * 0.2, index * 0.4]}
          scale={isHovered ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        >
          <meshBasicMaterial color={[0.5, 1, 0.8]} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row w-full h-[75vh] p-8 bg-gradient-to-r  border border-gray-700 rounded-lg shadow-2xl mt-8">
      <div className="w-full md:w-1/2 flex justify-center items-center order-2">
        <LottieAnimation animationData={nftAnimation} />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center text-white px-10 md:px-16 py-6 md:py-0 space-y-6">
        <h1 className="text-5xl font-extrabold bg-transparent whitespace-nowrap  leading-tight">
          Crafting Art
        </h1>
        <p className="mt-4 text-lg md:text-lg text-gray-300">
          Explore a groundbreaking collection of NFTs that redefine creativity
          and celebrate the fusion of digital artistry and innovative
          technology.
        </p>
        <Button
          variant={'default'}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg text-lg shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

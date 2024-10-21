import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { BufferGeometry, Mesh, MeshStandardMaterial } from 'three';

interface InteractiveCrystalProps {
  geometry: BufferGeometry;
  mouse: { x: number; y: number };
  onHoverChange: (hovered: boolean) => void;
}

export default function InteractiveCrystal({
  geometry,
  mouse,
  onHoverChange,
}: InteractiveCrystalProps) {
  const crystalRef = useRef<Mesh>(null);
  const [isHovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (crystalRef.current) {
      crystalRef.current.rotation.y = t * 0.5 + mouse.x * Math.PI;
      crystalRef.current.rotation.x = t * 0.3 + mouse.y * Math.PI;

      const material = crystalRef.current.material as MeshStandardMaterial;
      const emissiveColor = material.emissive;
      emissiveColor.setHSL(0.5 + 0.5 * Math.sin(t), 0.9, isHovered ? 0.7 : 0.5);
    }
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

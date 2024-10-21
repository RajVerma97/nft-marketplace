import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import EnergyRays from './EnergyRays';
import { Mesh } from 'three';

interface EnergyRaysProps {
  isHovered: boolean;
}

export default function InteractiveEnergyCore({ isHovered }: EnergyRaysProps) {
  const coreRef = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scale = 1 + Math.sin(t * 2) * 0.1;
    if (coreRef.current) {
      coreRef.current.scale.set(scale, scale, scale);
      coreRef.current.rotation.y = t * 0.5;
    }
  });

  const coreGeometry = useMemo(() => new THREE.SphereGeometry(1, 32, 32), []);

  return (
    <mesh ref={coreRef} geometry={coreGeometry}>
      <meshBasicMaterial
        color={isHovered ? 'hotpink' : new THREE.Color(5, 0.8, 2)}
        toneMapped={false}
      />
      <EnergyRays isHovered={isHovered} />
    </mesh>
  );
}

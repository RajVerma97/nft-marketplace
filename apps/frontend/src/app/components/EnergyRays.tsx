import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Group } from 'three';

interface EnergyRaysProps {
  isHovered: boolean;
}
export default function EnergyRays({ isHovered }: EnergyRaysProps) {
  const rayRef = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (rayRef.current) {
      if (rayRef.current.rotation) {
        rayRef.current.rotation.y = t * 0.3;
      }
    }
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

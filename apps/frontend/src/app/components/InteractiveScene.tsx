import { Float } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useMemo, useState } from 'react';
import * as THREE from 'three';
import InteractiveCrystal from './InteractiveCrystal';
import InteractiveEnergyCore from './InteractiveEnergyCore';

const InteractiveScene = () => {
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
};

export default InteractiveScene;

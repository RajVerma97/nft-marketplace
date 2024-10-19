import { useGLTF } from '@react-three/drei';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { MeshProps } from '@react-three/fiber';
import React from 'react';

interface PrismProps extends MeshProps {
  onRayOver?: (event: THREE.Event) => void; // Adjusted event type
  onRayOut?: (event: THREE.Event) => void; // Adjusted event type
  onRayMove?: (event: THREE.Event) => void; // Adjusted event type
}

export function Prism({
  onRayOver,
  onRayOut,
  onRayMove,
  ...props
}: PrismProps) {
  const { nodes } = useGLTF('/prism.glb'); // Ensure that this path is correct

  return (
    <group {...props}>
      <mesh
        visible={false}
        scale={1.9}
        rotation={[Math.PI / 2, Math.PI, 0]}
        onPointerOver={onRayOver} // Use onPointerOver instead of onRayOver
        onPointerOut={onRayOut} // Use onPointerOut instead of onRayOut
        onPointerMove={onRayMove} // Use onPointerMove instead of onRayMove
      >
        <cylinderGeometry args={[1, 1, 1, 3, 1]} />
      </mesh>
      <mesh
        position={[0, 0, 0.6]}
        renderOrder={10}
        scale={2}
        dispose={null}
        geometry={nodes.Cone.geometry} // Ensure this node exists in your GLTF
      >
        <MeshTransmissionMaterial
          clearcoat={1}
          transmission={1}
          thickness={0.9}
          roughness={0}
          anisotropy={0.1}
          chromaticAberration={1}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

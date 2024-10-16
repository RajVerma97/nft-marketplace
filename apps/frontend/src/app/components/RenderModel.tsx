import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface RenderModelProps {
  modelPath: string;
}

export default function RenderModel({ modelPath }: RenderModelProps) {
  const { scene } = useGLTF(modelPath);
  const ref = useRef<THREE.Group | null>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
      console.log(ref.current.position);
    }
  });

  scene.traverse((child: THREE.Object3D) => {
    if ((child as THREE.Mesh).isMesh) {
      const baseColor = new THREE.Color('#aeea00');
      (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
        color: baseColor,
        roughness: 0.4,
        metalness: 0.3,
      });
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      rotation={[0, -Math.PI / 6, 0]}
      scale={[0.8, 0.8, 0.8]}
    />
  );
}

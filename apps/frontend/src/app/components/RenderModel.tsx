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

  // Define colors for different parts
  const bodyColor = '#ff1493';
  const eyeColor = '#ffea00';
  const nailsColor = '#ffea00';
  const teethColor = '#ffea00';

  useFrame(() => {
    if (ref.current) {
      // ref.current.rotation.y += 0.01; // Rotate the model slowly
    }
  });

  // Traverse the scene and apply materials
  scene.traverse((child: THREE.Object3D) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;

      // Set the body material to deep pink
      if (mesh.name.toLowerCase() === 'body') {
        mesh.material = new THREE.MeshStandardMaterial({
          color: bodyColor,
          roughness: 1,
          metalness: 0.1,
          emissive: bodyColor,
          emissiveIntensity: 1, // Strong emissive for a glowing effect
        });
      }
      // Set the material for the teeth
      else if (mesh.name.toLowerCase() === 'teeth') {
        mesh.material = new THREE.MeshStandardMaterial({
          color: teethColor,
          roughness: 0.2,
          metalness: 0.1,
          emissive: teethColor,
          emissiveIntensity: 1.5,
        });
      }
      // Set the material for the eyes
      else if (
        mesh.name.toLowerCase() === 'eye-left' ||
        mesh.name.toLowerCase() === 'eye-right'
      ) {
        mesh.material = new THREE.MeshStandardMaterial({
          color: eyeColor,
          roughness: 0.2,
          metalness: 0.1,
          emissive: eyeColor,
          emissiveIntensity: 1.5,
        });
      }
      // Optionally handle legs if needed
      else if (mesh.name.toLowerCase().includes('nails')) {
        mesh.material = new THREE.MeshStandardMaterial({
          color: nailsColor,
          emissive: nailsColor,
          emissiveIntensity: 1.5,
          roughness: 0.2,
          metalness: 0.1,
        });
      }
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      rotation={[0, -Math.PI / 6, 0]} // Rotate slightly
      scale={[0.8, 0.8, 0.8]} // Adjust scale as needed
    />
  );
}

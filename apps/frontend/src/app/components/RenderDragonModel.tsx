import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface RenderModelProps {
  modelPath: string;
}

export default function RenderDinoModel({ modelPath }: RenderModelProps) {
  const { scene } = useGLTF(modelPath);
  const ref = useRef<THREE.Group | null>(null);

  // State to manage hover and click
  const [clicked, setClicked] = useState(false);

  const bodyColor = '#ff3f81'; // Neon Pink
  const eyeColor = '#e1ff00'; // Neon Yellow
  const nailsColor = '#e1ff00'; // Neon Yellow
  const teethColor = '#e1ff00'; // Neon Yellow

  useFrame(() => {
    if (ref.current) {
      // Create a bounce effect
      const time = Date.now() * 0.002; // Get the current time
      ref.current.position.y = Math.sin(time * 1) * 0.1; // Bounce effect
    }
  });

  // Traverse the scene and apply materials
  scene.traverse((child: THREE.Object3D) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;

      // Set the body material to neon pink
      if (mesh.name.toLowerCase() === 'body') {
        mesh.material = new THREE.MeshStandardMaterial({
          color: bodyColor,
          roughness: 1,
          metalness: 0.1,
          emissive: bodyColor,
          emissiveIntensity: 1, // Increase emissive on click
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
      // Set material for nails
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

  // Event handlers for mouse interactions
  const handleClick = () => {
    setClicked(!clicked); // Toggle clicked state
  };

  return (
    <primitive
      ref={ref}
      object={scene}
      rotation={[0, -Math.PI / 6, 0]} // Keep this if you want a slight rotation
      scale={[0.6, 0.6, 0.6]} // Adjust scale as needed
      position={[1, 1, 1]}
      onClick={handleClick} // Add click effect
    />
  );
}

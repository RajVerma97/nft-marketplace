import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { BoxHelper } from 'three';

interface RenderModelProps {
  modelPath: string;
}

export default function RenderAstronautModel({ modelPath }: RenderModelProps) {
  const { scene } = useGLTF(modelPath);
  const ref = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (scene) {
      console.log('Model loaded successfully', scene);

      // Add a bounding box for visualization
      const boxHelper = new BoxHelper(scene, 0xffff00); // Yellow bounding box
      scene.add(boxHelper);
    } else {
      console.error('Model failed to load', modelPath);
    }
  }, [scene, modelPath]);

  return (
    <primitive
      ref={ref}
      object={scene}
      rotation={[0, Math.PI / 2, 0]} // Adjust rotation if needed
      scale={[1, 1, 1]} // Adjust scale as needed; starting with 1 for visibility
      position={[0, 0, 0]} // Adjust position
    />
  );
}

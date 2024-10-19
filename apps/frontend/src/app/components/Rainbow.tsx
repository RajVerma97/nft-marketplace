import { forwardRef, useRef } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

// Define the type for the RainbowMaterial props
interface RainbowMaterialProps {
  time: number;
  speed: number;
  fade: number;
  startRadius: number;
  endRadius: number;
  emissiveIntensity: number;
  ratio: number;
}

// Create the shader material
const RainbowMaterial = shaderMaterial(
  {
    time: 0,
    speed: 1,
    fade: 0.5,
    startRadius: 1,
    endRadius: 0,
    emissiveIntensity: 2.5,
    ratio: 1,
  },
  /* glsl */ ` varying vec2 vUv;
    void main() {
      vUv = uv;
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * viewMatrix * modelPosition;
    }`,
  /* glsl */ ` varying vec2 vUv;
    // ... (rest of your fragment shader code)
    void main() {
      // ... (your existing main function code)
    }`
);

extend({ RainbowMaterial });

// Define the Rainbow component props
interface RainbowProps {
  startRadius?: number;
  endRadius?: number;
  emissiveIntensity?: number;
  fade?: number;
  [key: string]: any; // Allow any additional props
}

export const Rainbow = forwardRef<THREE.Mesh, RainbowProps>(
  (
    {
      startRadius = 0,
      endRadius = 0.5,
      emissiveIntensity = 2.5,
      fade = 0.25,
      ...props
    },
    fRef
  ) => {
    const material = useRef<RainbowMaterialProps>(null);
    const { width, height } = useThree((state) => state.viewport);
    const length = Math.hypot(width, height) + 1.5; // add 1.5 for motion of the rainbow

    useFrame((state, delta) => {
      if (material.current) {
        material.current.time += delta * material.current.speed;
      }
    });

    return (
      <mesh ref={fRef} scale={[length, length, 1]} {...props}>
        <planeGeometry />
        <rainbowMaterial
          ref={material}
          fade={fade}
          startRadius={startRadius}
          endRadius={endRadius}
          ratio={1}
          toneMapped={false}
        />
      </mesh>
    );
  }
);

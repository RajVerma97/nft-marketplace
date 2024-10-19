import * as THREE from 'three';
import { forwardRef, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

// Dimensions for the box
const w = 1;
const h = 1;
const r = 0.1;
const depth = 1;

// Create the rounded rectangle shape
const s = new THREE.Shape();
s.moveTo(-w / 2, -h / 2 + r);
s.lineTo(-w / 2, h / 2 - r);
s.absarc(-w / 2 + r, h / 2 - r, r, 1 * Math.PI, 0.5 * Math.PI, true);
s.lineTo(w / 2 - r, h / 2);
s.absarc(w / 2 - r, h / 2 - r, r, 0.5 * Math.PI, 0 * Math.PI, true);
s.lineTo(w / 2, -h / 2 + r);
s.absarc(w / 2 - r, -h / 2 + r, r, 2 * Math.PI, 1.5 * Math.PI, true);
s.lineTo(-w / 2 + r, -h / 2);
s.absarc(-w / 2 + r, -h / 2 + r, r, 1.5 * Math.PI, 1 * Math.PI, true);

const boxGeometry = new THREE.BoxGeometry();
const roundedBoxGeometry = new THREE.ExtrudeGeometry(s, {
  depth: 1,
  bevelEnabled: false,
});
roundedBoxGeometry.translate(0, 0, -depth / 2);
roundedBoxGeometry.computeVertexNormals();

// Define the props for the Box component
interface BoxProps extends React.HTMLProps<HTMLDivElement> {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

// Use forwardRef correctly
export const Box = forwardRef<THREE.Group, BoxProps>((props, ref) => {
  const {
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [1, 1, 1],
    ...rest
  } = props;

  const [hovered, hover] = useState(false);
  const innerRef = useRef<THREE.Mesh>(null); // Ref for the inner mesh

  useFrame(() => {
    if (innerRef.current) {
      const material = innerRef.current.material as THREE.MeshStandardMaterial;
      material.emissive.set(hovered ? 'white' : '#454545');
    }
  });

  return (
    <group
      ref={ref as React.Ref<THREE.Group>} // Cast ref to the correct type
      position={position}
      rotation={rotation}
      scale={scale}
      {...rest}
    >
      <mesh
        visible={false}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        geometry={boxGeometry}
      />
      <mesh ref={innerRef} geometry={roundedBoxGeometry}>
        <meshStandardMaterial
          color="#333"
          toneMapped={false}
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
});

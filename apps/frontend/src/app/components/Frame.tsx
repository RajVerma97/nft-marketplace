import {
  MeshPortalMaterial,
  PortalMaterialType,
  Text,
  useCursor,
} from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import * as THREE from 'three';
import { Euler, Vector3 } from 'three';
import { easing, geometry } from 'maath';

interface FrameProps {
  children: React.ReactNode;
  id: string;
  name: string;
  author: string;
  bg?: string;
  position?: Vector3 | undefined;
  rotation?: Euler;
  onModelClick?: () => void;
}

extend(geometry);

export default function Frame({
  id,
  name,
  author,
  bg = '#ffffff',
  children,
  onModelClick = () => {},
  ...props
}: FrameProps) {
  const portal = useRef<PortalMaterialType>(null);
  const [, setLocation] = useLocation();
  const [, params] = useRoute('/item/:id');
  const [hovered, hover] = useState(false);
  const width = 1;
  const height = 1.61803398875;

  useCursor(hovered);
  useFrame((state, dt) => {
    const currentPortal = portal.current;
    if (currentPortal) {
      easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt);
    }
  });
  return (
    <group {...props}>
      {
        <>
          <Text
            fontSize={0.3}
            anchorY="top"
            anchorX="left"
            lineHeight={0.8}
            position={[-0.375, 0.715, 0.01]}
            material-toneMapped={false}
          >
            {name}
          </Text>
          <Text
            fontSize={0.1}
            anchorX="right"
            position={[0.4, -0.659, 0.01]}
            material-toneMapped={false}
          >
            /{id}
          </Text>
          <Text
            fontSize={0.04}
            anchorX="right"
            position={[0.0, -0.677, 0.01]}
            material-toneMapped={false}
          >
            {author}
          </Text>
        </>
      }
      <mesh
        name={id}
        onDoubleClick={(e) => {
          e.stopPropagation();
          setLocation('/item/' + e.object.name);
          onModelClick();
        }}
        onPointerOver={(e) => hover(true)}
        onPointerOut={() => hover(false)}
      >
        {/*@ts-expect-error  */}
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <MeshPortalMaterial
          ref={portal}
          events={params?.id === id}
          side={THREE.DoubleSide}
        >
          <color attach="background" args={[bg]} />
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
}

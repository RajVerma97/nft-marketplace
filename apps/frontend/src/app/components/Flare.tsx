import * as THREE from 'three';
import { forwardRef, useRef } from 'react';
import { useTexture, Instances, Instance } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

interface FlareProps {
  streak?: [number, number, number];
  visible?: boolean;
  renderOrder?: number; // Add renderOrder to the props
  scale?: number; // Add scale to the props
  // Add any other props you might need here
}

export const Flare = forwardRef<THREE.Group, FlareProps>(
  (
    { streak = [8, 20, 1], visible = true, renderOrder, scale = 1, ...props },
    fRef
  ) => {
    const ref = useRef<THREE.Group>(null);
    const [streakTexture, dotTexture, glowTexture] = useTexture([
      '/textures/lensflare/lensflare2.png',
      '/textures/lensflare/lensflare3.png',
      '/textures/lensflare/lensflare0_bw.png',
    ]);
    const config = {
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    };

    useFrame((state) => {
      if (ref.current) {
        ref.current.children.forEach((instance) => {
          instance.position.x =
            (Math[instance.scale.x > 1 ? 'sin' : 'cos'](
              (state.clock.elapsedTime * instance.scale.x) / 2
            ) *
              instance.scale.x) /
            8;
          instance.position.y =
            (Math[instance.scale.x > 1 ? 'cos' : 'atan'](
              state.clock.elapsedTime * instance.scale.x
            ) *
              instance.scale.x) /
            5;
        });
      }
    });

    return (
      <group
        ref={fRef}
        {...props}
        visible={visible}
        renderOrder={renderOrder}
        dispose={null}
        scale={scale}
      >
        <Instances frames={visible ? Infinity : 1}>
          <planeGeometry />
          <meshBasicMaterial map={dotTexture} {...config} />
          <group ref={ref}>
            <Instance scale={0.5} />
            <Instance scale={1.25} />
            <Instance scale={0.75} />
            <Instance scale={1.5} />
            <Instance scale={2} position={[0, 0, -0.7]} />
          </group>
        </Instances>
        <mesh scale={1}>
          <planeGeometry />
          <meshBasicMaterial map={glowTexture} {...config} opacity={1} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} scale={streak}>
          <planeGeometry />
          <meshBasicMaterial map={streakTexture} {...config} opacity={1} />
        </mesh>
      </group>
    );
  }
);

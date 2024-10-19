import * as THREE from 'three';
import { forwardRef, useImperativeHandle, useRef, ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Reflect } from './Reflect';

type InstancedMeshRef = THREE.InstancedMesh | null;

interface BeamProps {
  children: ReactNode;
  position?: [number, number, number];
  stride?: number;
  width?: number;
  bounce?: number;
  far?: number;
}

export const Beam = forwardRef<InstancedMeshRef, BeamProps>(
  (
    {
      children,
      position = [0, 0, 0],
      stride = 4,
      width = 8,
      bounce = 0,
      far = 100,
      ...props
    },
    fRef
  ) => {
    const streaks = useRef<InstancedMeshRef>(null);
    const glow = useRef<InstancedMeshRef>(null);
    const reflect = useRef<any>(null);
    const [streakTexture, glowTexture] = useTexture([
      '/textures/lensflare/lensflare2.png',
      '/textures/lensflare/lensflare0_bw.jpg',
    ]);

    const obj = new THREE.Object3D();
    const f = new THREE.Vector3();
    const t = new THREE.Vector3();
    const n = new THREE.Vector3();
    const config = {
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    };

    const planeGeometry = new THREE.PlaneGeometry(1, 1);
    const streakMaterial = new THREE.MeshBasicMaterial({
      map: streakTexture,
      opacity: 1.5,
      ...config,
      transparent: false,
    });
    const glowMaterial = new THREE.MeshBasicMaterial({
      map: glowTexture,
      ...config,
    });

    useFrame(() => {
      if (reflect.current) {
        const range = reflect.current.update() - 1;

        if (streaks.current) {
          for (let i = 0; i < range; i++) {
            f.fromArray(reflect.current.positions, i * 3);
            t.fromArray(reflect.current.positions, i * 3 + 3);
            n.subVectors(t, f).normalize();
            obj.position.addVectors(f, t).divideScalar(2);
            obj.scale.set(t.distanceTo(f) * stride, width, 1);
            obj.rotation.set(0, 0, Math.atan2(n.y, n.x));
            obj.updateMatrix();
            streaks.current.setMatrixAt(i, obj.matrix);
          }

          if (streaks.current) {
            streaks.current.count = range;
            streaks.current.instanceMatrix.needsUpdate = true;
          }
        } else {
          console.error('streaks.current is undefined');
        }

        if (glow.current) {
          obj.scale.setScalar(0);
          obj.updateMatrix();
          glow.current.setMatrixAt(0, obj.matrix);

          for (let i = 1; i < range; i++) {
            obj.position.fromArray(reflect.current.positions, i * 3);
            obj.scale.setScalar(0.75);
            obj.rotation.set(0, 0, 0);
            obj.updateMatrix();
            glow.current.setMatrixAt(i, obj.matrix);
          }

          if (glow.current) {
            glow.current.count = range;
            glow.current.instanceMatrix.needsUpdate = true;
          }
        } else {
          console.error('glow.current is undefined');
        }
      } else {
        console.error('reflect.current is undefined');
      }
    });

    useImperativeHandle(fRef, () => reflect.current, []);

    return (
      <group position={position}>
        <Reflect {...props} ref={reflect}>
          {children}
        </Reflect>
        <instancedMesh
          ref={streaks}
          args={[planeGeometry, streakMaterial, 100]}
          instanceMatrix-usage={THREE.DynamicDrawUsage}
        />
        <instancedMesh
          ref={glow}
          args={[planeGeometry, glowMaterial, 100]}
          instanceMatrix-usage={THREE.DynamicDrawUsage}
        />
      </group>
    );
  }
);

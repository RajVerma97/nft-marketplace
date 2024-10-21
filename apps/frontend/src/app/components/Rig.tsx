import { CameraControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';
import { useRoute } from 'wouter';

export default function Rig({
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0),
}) {
  const { camera, gl, scene } = useThree();
  const [, params] = useRoute('/item/:id');

  useEffect(() => {
    const active = scene.getObjectByName(params?.id as string);
    if (active?.parent) {
      active.parent.localToWorld(position.set(0, 0.5, 0.25));
      active.parent.localToWorld(focus.set(0, 0, -2));
    }
    camera.lookAt(focus);
  }, [camera, focus, position, params, scene]);

  return (
    <CameraControls
      makeDefault
      camera={camera}
      domElement={gl.domElement}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2}
    />
  );
}

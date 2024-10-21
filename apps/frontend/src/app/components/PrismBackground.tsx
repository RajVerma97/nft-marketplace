import * as THREE from 'three';
import { useRef, useCallback, useState } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { Center, Text3D } from '@react-three/drei';
import { Bloom, EffectComposer, LUT } from '@react-three/postprocessing';
import { LUTCubeLoader } from 'postprocessing';
import { Beam } from './Beam';
import { Rainbow } from './Rainbow';
import { Prism } from './Prism';
import { Flare } from './Flare';
import { Box } from './Box';

export function lerp(object, prop, goal, speed = 0.1) {
  object[prop] = THREE.MathUtils.lerp(object[prop], goal, speed);
}

const color = new THREE.Color();
export function lerpC(value, goal, speed = 0.1) {
  value.lerp(color.set(goal), speed);
}

const vector = new THREE.Vector3();
export function lerpV3(value, goal, speed = 0.1) {
  value.lerp(vector.set(...goal), speed);
}

export function calculateRefractionAngle(
  incidentAngle,
  glassIor = 2.5,
  airIor = 1.000293
) {
  const theta = Math.asin((airIor * Math.sin(incidentAngle)) / glassIor) || 0;
  return theta;
}

export default function PrismBackground() {
  const texture = useLoader(LUTCubeLoader, '/lut/F-6800-STD.cube');
  return (
    <div
      className="
    w-full  h-[80vh]"
    >
      <Canvas
        orthographic
        gl={{ antialias: false }}
        camera={{ position: [0, 0, 75], zoom: 50 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <color attach="background" args={['black']} />
        <Scene />
        <EffectComposer disableNormalPass>
          <Bloom
            mipmapBlur
            levels={9}
            intensity={1.5}
            luminanceThreshold={1}
            luminanceSmoothing={1}
          />
          <LUT lut={texture} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

function Scene() {
  const [isPrismHit, hitPrism] = useState(false);
  const flare = useRef(null);
  const ambient = useRef(null);
  const spot = useRef(null);
  const boxreflect = useRef(null);
  const rainbow = useRef(null);

  const rayOut = useCallback(() => hitPrism(false), []);
  const rayOver = useCallback((e) => {
    e.stopPropagation();
    hitPrism(true);
    rainbow.current.material.speed = 1;
    rainbow.current.material.emissiveIntensity = 20;
  }, []);

  const vec = new THREE.Vector3();
  const rayMove = useCallback(({ api, position, direction, normal }) => {
    if (!normal) return;
    vec.toArray(api.positions, api.number++ * 3);
    flare.current.position.set(position.x, position.y, -0.5);
    flare.current.rotation.set(0, 0, -Math.atan2(direction.x, direction.y));
    let angleScreenCenter = Math.atan2(-position.y, -position.x);
    const normalAngle = Math.atan2(normal.y, normal.x);
    const incidentAngle = angleScreenCenter - normalAngle;
    const refractionAngle = calculateRefractionAngle(incidentAngle) * 6;
    angleScreenCenter += refractionAngle;
    rainbow.current.rotation.z = angleScreenCenter;
    lerpV3(
      spot.current.target.position,
      [Math.cos(angleScreenCenter), Math.sin(angleScreenCenter), 0],
      0.05
    );
    spot.current.target.updateMatrixWorld();
  }, []);

  useFrame((state) => {
    boxreflect.current.setRay(
      [
        (state.pointer.x * state.viewport.width) / 2,
        (state.pointer.y * state.viewport.height) / 2,
        0,
      ],
      [0, 0, 0]
    );
    lerp(
      rainbow.current.material,
      'emissiveIntensity',
      isPrismHit ? 2.5 : 0,
      0.1
    );
    spot.current.intensity = rainbow.current.material.emissiveIntensity;
    lerp(ambient.current, 'intensity', 0, 0.025);
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={0} />
      <pointLight position={[10, -10, 0]} intensity={0.05} />
      <pointLight position={[0, 10, 0]} intensity={0.05} />
      <pointLight position={[-10, 0, 0]} intensity={0.05} />
      <spotLight
        ref={spot}
        intensity={1}
        distance={7}
        angle={1}
        penumbra={1}
        position={[0, 0, 1]}
      />
      <Center top bottom position={[0, 2, 0]}>
        <Text3D
          size={0.7}
          letterSpacing={-0.05}
          height={0.05}
          font="/fonts/Inter_Bold.json"
        >
          Dynamic without Limits
          <meshStandardMaterial color="white" />
        </Text3D>
      </Center>
      <Beam ref={boxreflect} bounce={10} far={20}>
        <Prism
          position={[0, -0.5, 0]}
          onRayOver={rayOver}
          onRayOut={rayOut}
          onRayMove={rayMove}
        />
        <Box position={[2.25, -3.5, 0]} rotation={[0, 0, Math.PI / 3.5]} />
        <Box position={[-2.5, -2.5, 0]} rotation={[0, 0, Math.PI / 4]} />
        <Box position={[-3, 1, 0]} rotation={[0, 0, Math.PI / 4]} />
      </Beam>
      <Rainbow ref={rainbow} startRadius={0} endRadius={0.5} fade={0} />
      <Flare
        ref={flare}
        visible={isPrismHit}
        renderOrder={10}
        scale={1.25}
        streak={[12.5, 20, 1]}
      />
    </>
  );
}

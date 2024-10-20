import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import {
  useCursor,
  MeshPortalMaterial,
  CameraControls,
  Gltf,
  Text,
  Preload,
} from '@react-three/drei';
import { useRoute, useLocation, Link } from 'wouter';
import { easing, geometry } from 'maath';
import { suspend } from 'suspend-react';
import { Button } from '@my-org/ui-components';

extend(geometry);
const regular = import('@pmndrs/assets/fonts/inter_regular.woff');
const medium = import('@pmndrs/assets/fonts/inter_medium.woff');

export const NFTShowcase = () => {
  const [showBackButton, setShowBackButton] = useState(false);
  const canvasRef = useRef(); // Create a ref for the canvas

  const handleModelClick = () => {
    setShowBackButton(true); // Show back button when a model is clicked
  };

  const handleBackButtonClick = () => {
    setShowBackButton(false); // Hide back button when navigating back
  };

  // Disable scrolling on the canvas
  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('wheel', handleScroll, { passive: false });
      canvas.addEventListener('touchmove', handleScroll, { passive: false });
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('wheel', handleScroll);
        canvas.removeEventListener('touchmove', handleScroll);
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen relative border-2 border-blue-500 overflow-hidden">
      <Canvas
        ref={canvasRef} // Attach the ref to the Canvas component
        flat
        camera={{ fov: 75, position: [0, 0, 20] }}
        // eventSource={document.getElementById('root')}
        eventPrefix="client"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <color attach="background" args={['#f0f0f0']} />

        {/* Add the NFT GALLERY text here */}
        <Text
          font={suspend(medium).default}
          fontSize={1}
          position={[2, 15, 5]} // Adjust the Y position to place it above the frames
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          NFT GALLERY
        </Text>

        <Frame
          id="01"
          name={`pick\nles`}
          author="Omar Faruq Tawsif"
          bg="#e4cdac"
          position={[-1.15, 0, 0]}
          rotation={[0, 0.5, 0]}
          onModelClick={handleModelClick}
        >
          <Gltf
            src="pickles_3d_version_of_hyuna_lees_illustration-transformed.glb"
            scale={8}
            position={[0, -0.7, -2]}
          />
        </Frame>
        <Frame
          id="02"
          name="tea"
          author="Omar Faruq Tawsif"
          onModelClick={handleModelClick}
        >
          <Gltf src="fiesta_tea-transformed.glb" position={[0, -2, -3]} />
        </Frame>
        <Frame
          id="03"
          name="still"
          author="Omar Faruq Tawsif"
          bg="#d1d1ca"
          position={[1.15, 0, 0]}
          rotation={[0, -0.5, 0]}
          onModelClick={handleModelClick}
        >
          <Gltf
            src="still_life_based_on_heathers_artwork-transformed.glb"
            scale={2}
            position={[0, -0.8, -4]}
          />
        </Frame>
        <Rig />
        <Preload all />
      </Canvas>
      {showBackButton && (
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translate3d(-50%, -50%, 0)',
          }}
        >
          <Link href="/" onClick={handleBackButtonClick}>
            <Button className="bg-white text-black px-8 rounded-lg center">
              Back
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

function Frame({
  id,
  name,
  author,
  bg,
  width = 1,
  height = 1.61803398875,
  children,
  onModelClick,
  ...props
}) {
  const portal = useRef();
  const [, setLocation] = useLocation();
  const [, params] = useRoute('/item/:id');
  const [hovered, hover] = useState(false);
  useCursor(hovered);
  useFrame((state, dt) =>
    easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt)
  );

  return (
    <group {...props}>
      <Text
        font={suspend(medium).default}
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
        font={suspend(regular).default}
        fontSize={0.1}
        anchorX="right"
        position={[0.4, -0.659, 0.01]}
        material-toneMapped={false}
      >
        /{id}
      </Text>
      <Text
        font={suspend(regular).default}
        fontSize={0.04}
        anchorX="right"
        position={[0.0, -0.677, 0.01]}
        material-toneMapped={false}
      >
        {author}
      </Text>
      <mesh
        name={id}
        onDoubleClick={(e) => {
          e.stopPropagation();
          setLocation('/item/' + e.object.name);
          onModelClick(); // Trigger the callback to show the back button
        }}
        onPointerOver={(e) => hover(true)}
        onPointerOut={() => hover(false)}
      >
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

function Rig({
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0),
}) {
  const { controls, scene } = useThree();
  const [, params] = useRoute('/item/:id');

  useEffect(() => {
    const active = scene.getObjectByName(params?.id);
    if (active) {
      active.parent.localToWorld(position.set(0, 0.5, 0.25));
      active.parent.localToWorld(focus.set(0, 0, -2));
    }
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  });

  return (
    <CameraControls
      makeDefault
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2}
      // dollySpeed={0}
    />
  );
}

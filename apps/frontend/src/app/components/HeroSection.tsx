import { OrbitControls, Stars } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import RenderModel from './RenderModel';
import { Button } from '@my-org/ui-components'; // Adjust the import based on your paths
import * as THREE from 'three';
import { useRef, useState } from 'react';
import RenderDinoModel from './RenderModel';
import RenderDragonModel from './RenderDragonModel';

function PulsatingCube() {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (ref.current) {
      const elapsed = clock.getElapsedTime();

      ref.current.rotation.x += 0.02; // Rotate faster
      ref.current.rotation.y += 0.02;
    }
  });

  const color = '#00FFFF';
  const emissiveColor = '#00CED1';

  return (
    <mesh
      ref={ref}
      position={[0, 0, 0]}
      onPointerOver={() => setHovered(true)} // Change color on hover
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color} // Base color
        emissive={emissiveColor} // Initial emissive color
        emissiveIntensity={1} // Initial emissive intensity
      />
    </mesh>
  );
}

function FloatingShapes() {
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    // Rotate and scale shapes over time for a dynamic effect
    // You can create multiple shapes and apply transformations as desired
  });

  return (
    <>
      {/* Example of a floating sphere */}
      <mesh position={[0, 0, -5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#FF7F50" />
      </mesh>
      {/* Additional shapes can be added here */}
    </>
  );
}

function Background() {
  return (
    <Canvas
      camera={{ position: [50, 50, 50], fov: 35 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <RenderDragonModel modelPath={'/dragon-model/dragon.glb'} />
      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  );
}

export default function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row w-full h-[75vh] p-8 bg-gradient-to-r  border border-gray-700 rounded-lg shadow-2xl mt-8">
      {/* 3D Model Section */}
      <Background />
      <div className="w-full md:w-1/2 order-2 md:order-1 flex justify-center items-center  border-white overflow-hidden">
        <div className="relative w-full h-full flex justify-center items-center">
          <Canvas
            camera={{ position: [40, 30, 50], fov: 15 }} // Adjusted camera position for better view
            className="flex justify-center items-center"
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[5, 5, 5]} intensity={1} />
            {/* <RenderDragonModel modelPath={'/dragon-model/dragon.gltf'} /> */}

            <RenderDinoModel modelPath={'/dino-model/dino.glb'} />
            <OrbitControls enablePan={false} enableZoom={false} />
          </Canvas>
        </div>
      </div>
      {/* Text and Call-to-Action Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center text-white px-10 md:px-16 py-6 md:py-0 space-y-6">
        <h1 className="text-5xl font-extrabold bg-transparent whitespace-nowrap leading-tight">
          NFT Marketplace
        </h1>
        <p className="mt-4 text-lg md:text-lg text-gray-300">
          “Dive into a universe of creativity with exclusive NFTs from talented
          artists worldwide."
        </p>
        <Button
          variant={'default'}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg text-lg shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

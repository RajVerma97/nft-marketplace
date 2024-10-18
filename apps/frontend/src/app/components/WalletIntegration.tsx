import {
  ScrollControls,
  SoftShadows,
  useAnimations,
  useGLTF,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, TiltShift2 } from '@react-three/postprocessing';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Load the GLTF model
function Model(props) {
  const { nodes, materials, animations } = useGLTF('/jump-transformed.glb');
  const { ref, actions } = useAnimations(animations);
  const isInView = useRef(false);
  const scrollY = useRef(0); // Store the global scroll position

  useEffect(() => {
    actions.jump.reset().play();
    actions.jump.paused = true; // Start paused
  }, [actions]);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY; // Update global scroll position
      const scrollPercentage =
        scrollY.current / (document.body.scrollHeight - window.innerHeight); // Calculate scroll percentage

      if (scrollPercentage > 0.2 && !isInView.current) {
        actions.jump.paused = false; // Play animation
        isInView.current = true;
      } else if (scrollPercentage <= 0.2 && isInView.current) {
        actions.jump.paused = true; // Pause animation
        isInView.current = false;
      }

      if (isInView.current) {
        actions.jump.time = actions.jump.getClip().duration * scrollPercentage; // Update time based on scroll percentage
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [actions]);
  return (
    <group {...props} ref={ref}>
      <primitive object={nodes.mixamorigHips} />
      <skinnedMesh
        castShadow
        receiveShadow
        geometry={nodes.Ch03.geometry}
        material={materials.Ch03_Body}
        skeleton={nodes.Ch03.skeleton}
      />
    </group>
  );
}

export default function WalletIntegration() {
  return (
    <div className="min-h-screen flex border-2 border-white">
      <div className="flex justify-center items-center w-1/2 relative p-12 rounded-lg bg-black-500">
        <div>
          <h1 className="text-6xl font-bold text-white text-nowrap">
            Wallet Integration
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Seamlessly connect your digital wallet to our NFT Marketplace for a
            smooth and secure trading experience. Our platform supports various
            wallets, enabling you to easily buy, sell, and manage your NFTs.
          </p>
          <div className="mt-6 flex space-x-4 justify-between">
            <Image
              src={'/metamask.svg'}
              width={50}
              height={50}
              alt="Metamask"
            />
            <Image
              src={'/coinbase.svg'}
              width={50}
              height={50}
              alt="Coinbase Wallet"
            />
            <Image
              src={'/trust-wallet.svg'}
              width={100}
              height={100}
              alt="Trust Wallet"
            />
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <Canvas
          shadows
          gl={{ antialias: false }}
          camera={{ position: [1, 0.5, 2.5], fov: 50 }}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <color attach="background" args={['#f0f0f0']} />
          <fog attach="fog" args={['#f0f0f0', 0, 20]} />
          <ambientLight intensity={0.5} />
          <directionalLight
            intensity={2}
            position={[-5, 5, 5]}
            castShadow
            shadow-mapSize={2048}
            shadow-bias={-0.0001}
          />
          <ScrollControls damping={0.2} maxSpeed={0.5} pages={2}>
            <Model
              position={[0, -1, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            />
          </ScrollControls>
          <mesh
            rotation={[-0.5 * Math.PI, 0, 0]}
            position={[0, -1.01, 0]}
            receiveShadow
          >
            <planeGeometry args={[10, 10, 1, 1]} />
            <meshStandardMaterial transparent opacity={0.75} />
          </mesh>
          <SoftShadows size={40} samples={16} />
          <EffectComposer disableNormalPass multisampling={4}>
            <TiltShift2 blur={1} />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}

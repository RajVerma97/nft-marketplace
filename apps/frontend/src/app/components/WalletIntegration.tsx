import { SoftShadows } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, TiltShift2 } from '@react-three/postprocessing';
import React from 'react';
import Image from 'next/image';
import RenderWalletIntegrationModel from './RenderWalletIntegrationModel';

const RenderWalletIcons = () => {
  const wallets = [
    {
      name: 'Metamask',
      image: '/metamask.svg',
    },
    {
      name: 'Coinbase Wallet',
      image: '/coinbase.svg',
    },
    {
      name: 'Trust Wallet',
      image: '/trust-wallet.svg',
    },
  ];
  return (
    <div className="w-full flex justify-between ">
      {wallets.map((wallet, index) => (
        <div
          key={index}
          className="flex justify-center items-center p-6 bg-white rounded-full w-20 h-20 cursor-pointer"
        >
          <Image
            src={wallet.image}
            width={200}
            height={200}
            alt="Metamask"
            className=" object-cover w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};

export default function WalletIntegration() {
  return (
    <div className=" flex w-full   h-[90vh] ">
      <div className="flex justify-center items-center w-1/2 rounded-md border border-gray-700">
        <div className="p-12">
          <h1 className="text-6xl font-bold text-white text-nowrap">
            Wallet Integration
          </h1>
          <p className="mt-4  text-gray-200 text-xl">
            Seamlessly connect your digital wallet to our NFT Marketplace for a
            smooth and secure trading experience.
          </p>
          <div className="mt-8 flex space-x-4 justify-between ">
            <RenderWalletIcons />
          </div>
        </div>
      </div>
      <div className="w-1/2 relative">
        <Canvas
          shadows
          gl={{ antialias: false }}
          camera={{ position: [1, 0.5, 2.5], fov: 50 }}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: '8px',
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
          <RenderWalletIntegrationModel
            position={[0, -1, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          />

          <mesh
            rotation={[-0.5 * Math.PI, 0, 0]}
            position={[0, -1.01, 0]}
            receiveShadow
          >
            <planeGeometry args={[10, 10, 1, 1]} />
            <meshStandardMaterial transparent opacity={0.75} />
          </mesh>
          <SoftShadows size={40} samples={16} />
          <EffectComposer multisampling={4}>
            <TiltShift2 blur={1} />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}

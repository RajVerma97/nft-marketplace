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
    <div className="w-full flex justify-between">
      {wallets.map((wallet, index) => (
        <div
          key={index}
          className="flex justify-center items-center p-6 bg-white rounded-full w-20 h-20 cursor-pointer"
        >
          <Image
            src={wallet.image}
            width={200}
            height={200}
            alt={wallet.name} // Update alt to reflect the wallet name
            className="object-cover w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};

export default function WalletIntegration() {
  return (
    <div className="flex flex-col lg:flex-row w-full lg:h-[80vh]">
      <div className="h-[80vh] lg:h-full order-1 lg:order-2 w-full lg:w-1/2 flex relative">
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

      <div className="w-full lg:w-1/2 flex justify-center items-center rounded-md border border-gray-700 order-2 lg:order-1">
        <div className=" p-16 md:p-16">
          <h1 className="text-5xl font-bold text-white text-nowrap">
            Wallet Integration
          </h1>
          <p className="mt-6 text-gray-200 text-lg">
            Seamlessly connect your digital wallet to our NFT Marketplace for a
            smooth and secure trading experience.
          </p>
          <div className="mt-6 flex justify-between">
            <RenderWalletIcons />
          </div>
        </div>
      </div>
    </div>
  );
}

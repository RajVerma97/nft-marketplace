import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import React from 'react';
import { InteractiveScene } from './HeroSection';
import { EffectComposer, Bloom, Glitch } from '@react-three/postprocessing';
import * as THREE from 'three';

export default function CubeBackground() {
  return (
    <div>
      <motion.div className=" relative  overflow-hidden h-[100vh] w-full ">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 40 }}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <ambientLight intensity={0.2} />
          <InteractiveScene />

          <EffectComposer>
            <Bloom
              mipmapBlur
              intensity={0.5}
              luminanceThreshold={0.2}
              radius={0.8}
            />
            <Glitch delay={new THREE.Vector2(2.5, 5)} />
          </EffectComposer>
        </Canvas>

        <motion.div
          style={{
            position: 'absolute',
            top: '85%',
            left: '50%',
            transform: 'translate3d(-50%, -50%, 0)',
          }}
        >
          <h1
            style={{
              margin: 0,
              padding: 0,
              fontSize: '4em',
              fontWeight: 500,
              letterSpacing: '-0.05em',
            }}
          >
            {/* NFT */}
          </h1>
        </motion.div>
      </motion.div>
    </div>
  );
}

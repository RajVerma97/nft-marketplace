'use client'; // This directive should be at the very top

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import HeroSection, { InteractiveScene } from '../../components/HeroSection';
import { NFTShowcase } from '../../components/NFTShowcase';
import TestimonialsAndReviews from '../../components/TestimonialsAndReviews';
import { Canvas } from '@react-three/fiber';
import WalletIntegration from 'src/app/components/WalletIntegration';
import { EffectComposer } from '@react-three/postprocessing'; // Ensure correct import
import { Bloom, Glitch } from '@react-three/postprocessing';

interface ParallaxSectionWrapperProps {
  children: React.ReactNode;
  scrollY: number; // Pass scrollY to use in this component
}

export function ParallaxSectionWrappper({
  children,
  scrollY, // Receive scrollY prop
}: ParallaxSectionWrapperProps) {
  return (
    <motion.div
      className="min-h-screen"
      style={{
        position: 'relative',
        zIndex: 1,
        translateY: `${scrollY * 0.2}px`,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation();

  const handleScroll = () => {
    const newScrollY = window.scrollY;
    setScrollY(newScrollY);
  };

  useEffect(() => {
    const initialScrollY = window.scrollY;
    setScrollY(initialScrollY);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollY > 20) {
      controls.start({ y: 0 });
    } else {
      controls.start({ y: '100vh' });
    }
  }, [scrollY, controls]);

  return (
    <div className="p-8">
      <motion.div className=" relative overflow-hidden h-[80vh] ">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 42 }}
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
            <Glitch delay={[2.5, 5]} />
          </EffectComposer>
        </Canvas>
        <motion.div
          style={{
            position: 'absolute',
            top: '90%',
            left: '50%',
            transform: 'translate3d(-50%,-50%,0)',
          }}
        >
          <h1
            className="   "
            style={{
              margin: 0,
              padding: 0,
              fontSize: '4em',
              fontWeight: 500,
              letterSpacing: '-0.05em',
            }}
          >
            NFT Marketplace
          </h1>
        </motion.div>
      </motion.div>
      <ParallaxSectionWrappper scrollY={scrollY}>
        <HeroSection />
      </ParallaxSectionWrappper>
      <ParallaxSectionWrappper scrollY={scrollY}>
        <WalletIntegration />
      </ParallaxSectionWrappper>
      <ParallaxSectionWrappper scrollY={scrollY}>
        <NFTShowcase />
      </ParallaxSectionWrappper>
      <ParallaxSectionWrappper scrollY={scrollY}>
        <TestimonialsAndReviews />
      </ParallaxSectionWrappper>
    </div>
  );
}

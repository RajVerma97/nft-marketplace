'use client';
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import HeroSection from '../../components/HeroSection';
import NftShowcase from '../../components/NFTShowcase';
import TestimonialsAndReviews from '../../components/TestimonialsAndReviews';
import { Canvas } from '@react-three/fiber';
import RenderDinoModel from 'src/app/components/RenderDragonModel';
import { OrbitControls } from '@react-three/drei';
import WalletIntegration from 'src/app/components/WalletIntegration';
import InteractiveBackground from 'src/app/components/InteractiveBackground';

export function ParallaxSectionWrappper({ children }) {
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
    <div className="p-16">
      <motion.div className="min-h-screen relative overflow-hidden">
        <InteractiveBackground scrollY={scrollY} />
      </motion.div>

      <ParallaxSectionWrappper>
        <HeroSection />
      </ParallaxSectionWrappper>

      <ParallaxSectionWrappper>
        <WalletIntegration />
      </ParallaxSectionWrappper>

      <ParallaxSectionWrappper>
        <NftShowcase />
      </ParallaxSectionWrappper>

      <ParallaxSectionWrappper>
        <TestimonialsAndReviews />
      </ParallaxSectionWrappper>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import HeroSection from '../../components/HeroSection';
import { NFTShowcase } from '../../components/NFTShowcase';
import WalletIntegration from 'src/app/components/WalletIntegration';
import CubeBackground from 'src/app/components/CubeBackground';
import AnimatedSection from 'src/app/components/AnimatedSection';

export default function LandingPage() {
  return (
    <div className="overflow-hidden min-h-screen">
      <motion.div className="px-16 grid gap-20">
        {/* First section with shrinking effect */}
        <AnimatedSection
          scrollRange={[0, 400]} // Start and end points for scrolling
          yRange={[0, -100]} // Vertical movement
          opacityRange={[1, 0]} // Fade out
          scaleRange={[1, 0.95]} // Shrinks slightly
        >
          <CubeBackground />
        </AnimatedSection>

        {/* Second section grows from the previous section */}
        <AnimatedSection
          scrollRange={[300, 700]} // Trigger when scrolls into view
          yRange={[100, 0]} // Vertical movement from below
          opacityRange={[0, 1]} // Fade in
          scaleRange={[0.95, 1]} // Grows back to normal
        >
          <HeroSection />
        </AnimatedSection>

        {/* Third section grows from the previous section */}
        <AnimatedSection
          scrollRange={[600, 1000]} // Trigger when scrolls into view
          yRange={[100, 0]} // Vertical movement from below
          opacityRange={[0, 1]} // Fade in
          scaleRange={[0.95, 1]} // Grows back to normal
        >
          <WalletIntegration />
        </AnimatedSection>

        {/* Fourth section grows from the previous section */}
        <AnimatedSection
          scrollRange={[900, 1300]} // Trigger when scrolls into view
          yRange={[100, 0]} // Vertical movement from below
          opacityRange={[0, 1]} // Fade in
          scaleRange={[0.95, 1]} // Grows back to normal
        >
          <NFTShowcase />
        </AnimatedSection>
      </motion.div>
    </div>
  );
}

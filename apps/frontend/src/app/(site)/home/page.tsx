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
        <AnimatedSection
          scrollRange={[0, 500]}
          yRange={[0, -150]}
          opacityRange={[1, 0]}
          scaleRange={[1, 0.9]}
        >
          <CubeBackground />
        </AnimatedSection>

        <AnimatedSection
          scrollRange={[400, 900]}
          yRange={[150, 0]}
          opacityRange={[0, 1]}
          scaleRange={[0.9, 1]}
        >
          <HeroSection />
        </AnimatedSection>

        <AnimatedSection
          scrollRange={[800, 1300]}
          yRange={[100, 0]}
          opacityRange={[0, 1]}
          scaleRange={[1, 1]}
        >
          <WalletIntegration />
        </AnimatedSection>

        <AnimatedSection
          scrollRange={[1200, 1600]}
          yRange={[100, 0]}
          opacityRange={[0, 1]}
          scaleRange={[1, 1]}
        >
          <NFTShowcase />
        </AnimatedSection>
      </motion.div>
    </div>
  );
}

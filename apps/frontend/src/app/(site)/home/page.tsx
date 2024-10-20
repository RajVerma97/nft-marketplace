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
          scrollRange={[0, 400]}
          yRange={[0, -100]}
          opacityRange={[1, 0]}
          scaleRange={[1, 0.95]}
        >
          <CubeBackground />
        </AnimatedSection>

        <AnimatedSection
          scrollRange={[300, 700]}
          yRange={[100, 0]}
          opacityRange={[0, 1]}
          scaleRange={[0.95, 1]}
        >
          <HeroSection />
        </AnimatedSection>

        <AnimatedSection
          scrollRange={[600, 1000]}
          yRange={[100, 0]}
          opacityRange={[0, 1]}
          scaleRange={[0.95, 1]}
        >
          <WalletIntegration />
        </AnimatedSection>

        <AnimatedSection
          scrollRange={[900, 1300]}
          yRange={[100, 0]}
          opacityRange={[0, 1]}
          scaleRange={[0.95, 1]}
        >
          <NFTShowcase />
        </AnimatedSection>
      </motion.div>
    </div>
  );
}

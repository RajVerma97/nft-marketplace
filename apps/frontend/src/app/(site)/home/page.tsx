'use client';

import { motion } from 'framer-motion';
import HeroSection from '../../components/HeroSection';
import { NFTShowcase } from '../../components/NFTShowcase';
import WalletIntegration from 'src/app/components/WalletIntegration';
import CubeBackground from 'src/app/components/CubeBackground';
import AnimatedSection from 'src/app/components/AnimatedSection';

const animatedSectionsData: AnimatedSectionData[] = [
  {
    name: 'Cube Background',
    component: <CubeBackground />,
    scrollRange: [0, 500],
    yRange: [0, -150],
    opacityRange: [1, 0],
    scaleRange: [1, 0.9],
  },
  {
    name: 'Hero Section',
    component: <HeroSection />,
    scrollRange: [400, 900],
    yRange: [150, 0],
    opacityRange: [0, 1],
    scaleRange: [0.9, 1],
  },
  {
    name: 'Wallet Integration',
    component: <WalletIntegration />,
    scrollRange: [800, 1300],
    yRange: [100, 0],
    opacityRange: [0, 1],
    scaleRange: [1, 1],
  },
  {
    name: 'NFT Showcase',
    component: <NFTShowcase />,
    scrollRange: [1200, 1600],
    yRange: [100, 0],
    opacityRange: [0, 1],
    scaleRange: [1, 1],
  },
];

export default function LandingPage() {
  return (
    <div className="overflow-hidden min-h-screen">
      <motion.div className="px-20 grid gap-20">
        {animatedSectionsData.map((section, index) => (
          <AnimatedSection
            key={index}
            scrollRange={section.scrollRange}
            yRange={section.yRange}
            opacityRange={section.opacityRange}
            scaleRange={section.scaleRange}
          >
            {section.component}
          </AnimatedSection>
        ))}
      </motion.div>
    </div>
  );
}

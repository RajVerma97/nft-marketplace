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
    scrollRange: [0, 400],
    yRange: [0, -150],
    opacityRange: [1, 0],
    scaleRange: [1, 0.95],
  },
  {
    name: 'Hero Section',
    component: <HeroSection />,
    scrollRange: [300, 600],
    yRange: [150, 0],
    opacityRange: [0, 1],
    scaleRange: [0.9, 1.05],
  },
  {
    name: 'Wallet Integration',
    component: <WalletIntegration />,
    scrollRange: [600, 900],
    yRange: [100, 0],
    opacityRange: [0, 1],
    scaleRange: [1, 1.05],
  },
  {
    name: 'NFT Showcase',
    component: <NFTShowcase />,
    scrollRange: [900, 1200],
    yRange: [100, 0],
    opacityRange: [0, 1],
    scaleRange: [1, 1],
  },
];

export default function LandingPage() {
  return (
    <div className="overflow-hidden min-h-screen">
      <motion.div className=" px-12 md:px-16 lg:px-24 grid gap-16 md:gap-16 lg:gap-24">
        {animatedSectionsData.map((section, index) => (
          <AnimatedSection
          // key={index}
          // scrollRange={section.scrollRange}
          // yRange={section.yRange}
          // opacityRange={section.opacityRange}
          // scaleRange={section.scaleRange}
          >
            {section.component}
          </AnimatedSection>
        ))}
      </motion.div>
    </div>
  );
}

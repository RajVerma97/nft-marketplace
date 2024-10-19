'use client'; // This directive should be at the very top

import HeroSection from '../../components/HeroSection';
import { NFTShowcase } from '../../components/NFTShowcase';
import TestimonialsAndReviews from '../../components/TestimonialsAndReviews';
import WalletIntegration from 'src/app/components/WalletIntegration';
import CubeBackground from 'src/app/components/CubeBackground';

export default function LandingPage() {
  return (
    <div className="p-16 grid gap-20 overflow-hidden">
      <CubeBackground />
      <HeroSection />
      <WalletIntegration />
      <NFTShowcase />
      <TestimonialsAndReviews />
    </div>
  );
}

'use client';

import HeroSection from '../../components/HeroSection';
import NftShowcase from '../../components/NFTShowcase';
import TestimonialsAndReviews from '../../components/TestimonialsAndReviews';

function CallToAction() {
  return (
    <>
      <div>Call to action</div>
    </>
  );
}
function TrendingCollections() {
  return (
    <>
      <div>Trending collections</div>
    </>
  );
}
function FeaturedArtists() {
  return (
    <>
      <div>Featured artists</div>
    </>
  );
}

function WalletIntegration() {
  return (
    <>
      <div>Wallet integration</div>
    </>
  );
}

function FAQ() {
  return (
    <>
      <div>FAQ.</div>
    </>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-10 px-14">
      <HeroSection />
      <NftShowcase />
      {/* <CallToAction /> */}
      {/* <TrendingCollections /> */}
      {/* <FeaturedArtists /> */}
      <TestimonialsAndReviews />
      {/* <WalletIntegration /> */}
      {/* <FAQ /> */}
    </div>
  );
}

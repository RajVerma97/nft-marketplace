'use client';

import HeroSection from '../../components/HeroSection';
import NftShowcase from '../../components/NFTShowcase';

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

function TestimonailAndReviews() {
  return (
    <>
      <div>Testimonail and reviews</div>
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
    <div className="flex flex-col gap-10 p-12">
      <HeroSection />
      <NftShowcase />
      <CallToAction />
      <TrendingCollections />
      <FeaturedArtists />
      <TestimonailAndReviews />
      <WalletIntegration />
      <FAQ />
    </div>
  );
}

import { Button } from '@my-org/ui-components';
import LottieAnimation from './LottieAnimation';
import nftAnimation from '../../../public/nft-animation.json';

export default function HeroSection() {
  return (
    <div className="flex flex-col lg:flex-row  w-full  p-8 bg-gradient-to-r  border border-gray-700 rounded-lg shadow-2xl mt-8">
      <div className="w-full lg:w-1/2 flex justify-center items-center  lg:order-2">
        <LottieAnimation animationData={nftAnimation} />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center text-white px-10 md:px-16 py-6 md:py-0 space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-transparent whitespace-nowrap  leading-tight">
          REIMAGINE ART
        </h1>
        <p className="mt-4 text-lg md:text-lg text-gray-300">
          Explore a groundbreaking collection of NFTs that redefine creativity
          and celebrate the fusion of digital artistry and innovative
          technology.
        </p>
        <Button
          variant={'default'}
          className="bg-indigo-500 hover:bg-white hover:text-black text-white font-semibold py-3 px-6 rounded-lg text-lg shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

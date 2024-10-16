import React from 'react';
import NFTCard from './NFTCard';

export default function NftShowcase() {
  const nftData = [
    {
      name: 'Bunny Girl',
      imagePath: '/nft-1-image.jpg',
    },
    {
      name: 'Sleeping Plant ',
      imagePath: '/nft-2-image.jpg',
    },
    {
      name: 'Burger',
      imagePath: '/nft-3-image.jpg',
    },
    {
      name: 'Iron Man',
      imagePath: '/nft-4-image.jpg',
    },
  ];
  return (
    <div className="flex flex-col gap-5">
      <h1 className=" text-black text-2xl font-semibold ">NFT SHOWCASE </h1>
      <div className=" w-full grid grid-cols-4 text-white border-black">
        {nftData.map((nft, index) => (
          <NFTCard key={index} nft={nft} />
        ))}
      </div>
    </div>
  );
}

// NFTCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface NFTCard {
  imagePath: string;
  name: string;
}

interface NFTCardProps {
  nft: NFTCard;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  return (
    <Link href={'#'} className="flex flex-col items-center border-2 gap-3">
      <Image
        width={200}
        height={200}
        src={nft.imagePath}
        alt="NFT Image"
        className="object-fit rounded-md text-center h-[15rem]"
      />
      <h4 className="text-black">{nft.name}</h4>
    </Link>
  );
};

export default NFTCard;

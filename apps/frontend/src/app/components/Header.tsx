import { Button } from '@my-org/ui-components';
import Link from 'next/link';
import React from 'react';
import { FaCross, FaHamburger } from 'react-icons/fa';

interface RenderHeaderLinkProps {
  title: string;
  href: string;
  className?: string;
}

const RenderHeaderLink = ({
  title,
  href,
  className,
}: RenderHeaderLinkProps) => (
  <Button
    asChild
    className="hover:text-yellow-500 transition-all duration-100 transform hover:scale-110 ease-in"
  >
    <Link className="text-lg " href={href}>
      {title}
    </Link>
  </Button>
);

export default function Header() {
  return (
    <header className="p-8 z-50">
      <nav className="flex  justify-between items-center  px-4 py-4  border border-gray-700 rounded-lg ">
        <Link href={'/home'} className=" text-5xl ">
          NFT
        </Link>

        <div className="hidden gap-4 items-center   md:flex">
          <RenderHeaderLink title="Home" href="/home" />
          <RenderHeaderLink title="Marketplace" href="/marketplace" />
          <RenderHeaderLink title="About" href="/about" />
          <RenderHeaderLink title="Contact" href="/contact" />

          <Button
            asChild
            className=" bg-indigo-500 hover:bg-white hover:text-black px-6 py-3 "
          >
            <Link href={'#'}>Get Started</Link>
          </Button>
        </div>
        <div className="flex md:hidden">
          <FaHamburger color="white" size={24} />
        </div>
      </nav>
    </header>
  );
}

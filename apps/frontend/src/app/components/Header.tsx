import { Button } from '@my-org/ui-components';
import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className="px-10 py-6  flex items-center justify-between z-10 ">
      <h4 className=" text-4xl  text-white ">NFT</h4>

      <nav className="flex gap-4">
        <Button asChild className="hover:text-blue-500">
          <Link href={'/home'}>Home</Link>
        </Button>
        <Button asChild className="hover:text-blue-500">
          <Link href={'#'}>Marketplace</Link>
        </Button>
        <Button asChild className="hover:text-blue-500">
          <Link href={'#'}>About</Link>
        </Button>
        <Button asChild className="hover:text-blue-500">
          <Link href={'#'}>Contact</Link>
        </Button>
        <Button
          asChild
          className=" bg-indigo-500 hover:bg-white hover:text-black px-8 py-2 "
        >
          <Link href={'#'}>Get Started</Link>
        </Button>
      </nav>
    </header>
  );
}

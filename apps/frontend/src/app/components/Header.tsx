import { Button } from '@my-org/ui-components';
import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className="px-10 py-6  flex items-center justify-between  ">
      <h4 className=" text-4xl  text-white ">Logo</h4>

      <nav className="flex">
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
      </nav>
    </header>
  );
}

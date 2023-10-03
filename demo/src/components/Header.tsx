import React from 'react';
import Image from 'next/image';
import ExternalLink from '@/icons/ExternalLink';
import Link from 'next/link';
import Github from '@/icons/Github';

export const Header = () => {
  return (
    <header className="flex pl-12 px-8 h-[60px]">
      <div className="flex flex-grow">
        <Link className="flex" href="/">
          <Image alt="Crontext" src="/images/logo.svg" width={32} height={32} />
          <span className="pl-2 font-bold text-2xl leading-[60px]">
            Crontext
          </span>
        </Link>
      </div>
      <Link href="https://github.com/rautio/crontext">
        <div className="flex leading-[60px] hover:text-sky-500">
          <span>Github</span>
          <span className="m-auto pl-2">
            <Github />
          </span>
        </div>
      </Link>
    </header>
  );
};

export default Header;

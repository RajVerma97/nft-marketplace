import Link from 'next/link';
import React from 'react';
import classNames from 'classnames';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaDiscord,
} from 'react-icons/fa';

interface FooterLinkProps {
  title: string;
  href: string;
  className?: string;
}

const FooterLinkItem: React.FC<FooterLinkProps> = ({
  title,
  href,
  className,
}) => (
  <Link
    className={` text-lg   hover:text-yellow-500  hover:scale-105 transition-all duration-100 ease-in ${className}`}
    href={href}
  >
    {title}
  </Link>
);

interface SocialIconProps {
  children: React.ReactNode;
  className?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ children, className }) => (
  <Link
    className={`transition-transform text-center duration-300 transform hover:scale-150 text-gray-800 ${className}`}
    href="#"
  >
    {children}
  </Link>
);

interface SocialIcon {
  title: string;
  href: string;
  icon: React.ReactNode;
  hoverColor: string;
}

interface FooterLink {
  [key: string]: { title: string; href: string }[];
}

type SocialIcons = SocialIcon[];

export default function Footer() {
  const socialIcons: SocialIcons = [
    {
      title: 'Twitter',
      href: '#',
      icon: <FaTwitter className="text-3xl" />,
      hoverColor: 'hover:text-blue-500',
    },
    {
      title: 'Instagram',
      href: '#',
      icon: <FaInstagram className="text-3xl" />,
      hoverColor: 'hover:text-pink-500',
    },
    {
      title: 'Youtube',
      href: '#',
      icon: <FaYoutube className="text-3xl" />,
      hoverColor: 'hover:text-red-600',
    },
    {
      title: 'Facebook',
      href: '#',
      icon: <FaFacebook className="text-3xl" />,
      hoverColor: 'hover:text-blue-600',
    },
    {
      title: 'Discord',
      href: '#',
      icon: <FaDiscord className="text-3xl" />,
      hoverColor: 'hover:text-indigo-500',
    },
  ];

  const links: FooterLink = {
    Explore: [
      { title: 'About', href: '#' },
      { title: 'Marketplace', href: '#' },
      { title: 'NFT Collections', href: '#' },
      { title: 'NFT Stats', href: '#' },
      { title: 'Connect Wallet', href: '#' },
    ],
    Support: [
      { title: 'Email Us', href: 'mailto:support@example.com' },
      { title: 'Support Center', href: '/support' },
    ],
    Account: [
      { title: 'Login', href: '#' },
      { title: 'Privacy Policy', href: '#' },
      { title: 'Terms of Service', href: '#' },
    ],
  };

  return (
    <footer className="p-16 bg-white text-black mt-[10rem] flex justify-center ">
      <div className="flex flex-col md:flex-row  justify-between sm:gap-4 ">
        {Object.entries(links).map(([key, value]) => (
          <div key={key}>
            <h2 className="text-3xl font-semibold mt-5 ">{key}</h2>
            <div className="flex flex-col gap-5 mt-5">
              {value.map((link, index) => (
                <FooterLinkItem
                  key={index}
                  title={link.title}
                  href={link.href}
                />
              ))}
            </div>
          </div>
        ))}

        <div>
          {/* <h2 className="text-3xl mt-4 font-semibold">Follow Us</h2> */}
          <div className="flex gap-10 mt-5  ">
            {socialIcons.map((socialIcon, index) => (
              <SocialIcon
                key={index}
                className={classNames(socialIcon.hoverColor)}
              >
                {socialIcon.icon}
              </SocialIcon>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import React from 'react';
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

const FooterLink: React.FC<FooterLinkProps> = ({ title, href, className }) => (
  <Link
    className={`transition-all duration-100 hover:text-blue-600 hover:underline hover:text-lg ${className}`}
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
    className={`transition-transform duration-300 transform hover:scale-150 text-gray-800 ${className}`}
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

const Footer: React.FC = () => {
  const socialIcons: SocialIcons = [
    {
      title: 'Twitter',
      href: '#',
      icon: <FaTwitter className="text-2xl" />,
      hoverColor: 'text-blue-500',
    },
    {
      title: 'Instagram',
      href: '#',
      icon: <FaInstagram className="text-2xl" />,
      hoverColor: 'text-pink-500',
    },
    {
      title: 'Youtube',
      href: '#',
      icon: <FaYoutube className="text-2xl" />,
      hoverColor: 'text-red-600',
    },
    {
      title: 'Facebook',
      href: '#',
      icon: <FaFacebook className="text-2xl" />,
      hoverColor: 'text-blue-600',
    },
    {
      title: 'Discord',
      href: '#',
      icon: <FaDiscord className="text-2xl" />,
      hoverColor: 'text-indigo-500',
    },
  ];
  const links: FooterLink = {
    explore: [
      { title: 'About', href: '#' },
      { title: 'Marketplace', href: '#' },
      { title: 'NFT Collections', href: '#' },
      { title: 'NFT Stats', href: '#' },
      { title: 'Connect Wallet', href: '#' },
    ],
    actions: [
      { title: 'Create NFT', href: '#' },
      { title: 'Buy NFT', href: '#' },
    ],
    support: [
      { title: 'Email Us', href: 'mailto:support@example.com' },
      { title: 'Support Center', href: '/support' },
    ],
    account: [
      { title: 'Login', href: '#' },
      { title: 'Privacy Policy', href: '#' },
      { title: 'Terms of Service', href: '#' },
    ],
  };

  return (
    <footer className="p-12 bg-white text-black mt-[30rem]">
      <div className="flex justify-between">
        {Object.entries(links).map(([key, value]) => (
          <div key={key}>
            <h2 className="text-2xl">{key}</h2>
            <div className="flex flex-col gap-5 mt-5">
              {value.map((link, index) => (
                <FooterLink key={index} title={link.title} href={link.href} />
              ))}
            </div>
          </div>
        ))}

        <div>
          <h2 className="text-2xl">Follow Us</h2>
          <div className="flex gap-10 mt-5">
            {socialIcons.map((socialIcon, index) => (
              <SocialIcon
                key={index}
                className={`hover:${socialIcon.hoverColor}`}
              >
                {socialIcon.icon}
              </SocialIcon>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

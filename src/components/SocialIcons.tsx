'use client';

import { FaInstagram, FaFacebookF, FaYoutube, FaSpotify, FaTiktok } from 'react-icons/fa';
import type { SocialMedia } from '../types/band';

interface SocialIconsProps {
  socialMedia: SocialMedia[];
}

export default function SocialIcons({ socialMedia }: SocialIconsProps) {
  return (
    <>
      {socialMedia.map((social: SocialMedia) => {
        const Icon = {
          Instagram: FaInstagram,
          Facebook: FaFacebookF,
          YouTube: FaYoutube,
          Spotify: FaSpotify,
          TikTok: FaTiktok
        }[social.platform];

        return Icon ? (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-orange hover:text-brand-white transition-colors p-2 md:p-0"
          >
            <Icon size={28} className="md:w-6 md:h-6" />
          </a>
        ) : null;
      })}
    </>
  );
} 
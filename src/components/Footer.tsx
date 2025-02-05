'use client';

import { FaInstagram, FaFacebookF, FaYoutube, FaSpotify, FaTiktok } from 'react-icons/fa';
import { useBandContext } from '../context/BandContext';
import type { SocialMedia } from '../types/band';

export function Footer() {
  const { socialMedia } = useBandContext();
  return (
    <footer role="contentinfo" className="py-8 px-4 bg-black">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-8 md:gap-6 mb-6">
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
        </div>
        <p className="text-gray-400 text-xs md:text-sm text-center px-4">© 2025 Afónica Naranjo. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
} 

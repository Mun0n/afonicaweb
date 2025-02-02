'use client';

import { useEffect, useState } from 'react';
import { FaInstagram, FaFacebookF, FaYoutube, FaSpotify, FaTiktok } from 'react-icons/fa';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useBandContext } from '../context/BandContext';
import { SocialMedia } from '../types/band';
import ShopSection from '../components/ShopSection';
import ShowsSection from '../components/ShowsSection';

function Footer() {
  const { socialMedia } = useBandContext();

  return (
    <footer className="py-8 px-4 bg-black">
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

export default function Home() {
  const { bio } = useBandContext();
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    '/images/hero/hero-1.webp',
    '/images/hero/hero-2.webp',
    '/images/hero/hero-3.webp',
    '/images/hero/hero-4.webp',
    '/images/hero/hero-5.webp',
    '/images/hero/hero-6.webp',
    '/images/hero/hero-7.webp'
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [mounted, heroImages.length]);

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
        <div className="absolute inset-0">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="relative h-full"
            >
              <Image
                src={heroImages[currentImageIndex]}
                alt={`Afonica Naranjo en concierto ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                priority={currentImageIndex === 0}
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="relative z-20 h-full flex flex-col items-center justify-center pb-32">
          <motion.div
            className="w-full flex flex-col items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/brand/logo.png"
              alt="Afónica Naranjo"
              width={800}
              height={267}
              priority
              className="w-11/12 md:w-4/5 max-w-3xl mx-auto px-4"
            />
          </motion.div>
          <motion.p
            className="text-base md:text-lg lg:text-xl max-w-4xl mx-auto text-gray-200 drop-shadow-lg px-4 md:px-6 leading-relaxed text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {bio}
          </motion.p>
        </div>
      </section>

      <ShowsSection />
      <ShopSection />
      <Footer />
    </main>
  );
}

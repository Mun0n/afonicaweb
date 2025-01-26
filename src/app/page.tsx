'use client';

import { useEffect, useState, useMemo } from 'react';
import { FaInstagram, FaFacebookF, FaYoutube, FaSpotify, FaTiktok } from 'react-icons/fa';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useBandContext } from '../context/BandContext';
import { Show, SocialMedia } from '../types/band';
import ShopSection from '../components/ShopSection';

function ShowsSection() {
  const { upcomingShows } = useBandContext();

  if (!upcomingShows || upcomingShows.length === 0) return null;

  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-black to-gray-900" id="conciertos">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 text-center">Próximos Conciertos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {upcomingShows.map((show: Show, index: number) => (
            <motion.div
              key={index}
              className="bg-black p-4 md:p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-white">
                <div className="text-xl font-bold mb-2">{show.venue}</div>
                <div className="text-gray-400 mb-1 text-sm md:text-base">{show.city}</div>
                <div className="text-gray-400 mb-4 text-sm md:text-base">{new Date(show.date).toLocaleDateString('es-ES', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</div>
                {show.venue === "Cebrecos Fest" ? (
                  <span className="inline-block bg-brand-orange text-brand-white px-4 py-2.5 rounded font-medium text-sm md:text-base w-full md:w-auto text-center">
                    Entrada Libre
                  </span>
                ) : show.ticketUrl ? (
                  <a 
                    href={show.ticketUrl}
                    className="inline-block bg-brand-orange text-brand-white px-4 py-2.5 rounded hover:opacity-90 transition-colors text-sm md:text-base w-full md:w-auto text-center"
                  >
                    Comprar Entradas
                  </a>
                ) : (
                  <span className="inline-block bg-gray-700 text-brand-white px-4 py-2.5 rounded text-sm md:text-base w-full md:w-auto text-center">
                    Entradas Próximamente
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
  const { bio, upcomingShows } = useBandContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    '/images/hero/hero-1.webp',
    '/images/hero/hero-2.webp',
    '/images/hero/hero-3.webp',
    '/images/hero/hero-4.webp',
    '/images/hero/hero-5.webp',
    '/images/hero/hero-6.webp'
  ];

  const eventStructuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    'events': upcomingShows.map(show => ({
      '@type': 'MusicEvent',
      'name': `Afónica Naranjo en ${show.venue}`,
      'startDate': show.date,
      'location': {
        '@type': 'Place',
        'name': show.venue,
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': show.city,
          'addressCountry': 'ES'
        }
      },
      'performer': {
        '@type': 'MusicGroup',
        'name': 'Afónica Naranjo',
        'genre': ['Punk Rock', 'Hardcore', 'Covers']
      },
      'offers': show.venue === 'Cebrecos Fest' ? {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'EUR',
        'availability': 'https://schema.org/InStock'
      } : show.ticketUrl ? {
        '@type': 'Offer',
        'url': show.ticketUrl,
        'availability': 'https://schema.org/InStock'
      } : {
        '@type': 'Offer',
        'availability': 'https://schema.org/PreOrder'
      }
    }))
  }), [upcomingShows]);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(eventStructuredData);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [eventStructuredData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <main className="min-h-screen bg-black text-white">
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

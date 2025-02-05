'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic imports for non-critical components
const ShowsSection = dynamic(() => import('../components/ShowsSection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gradient-to-b from-black to-gray-900" />
});

const ShopSection = dynamic(() => import('../components/ShopSection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gradient-to-b from-black to-gray-900" />
});

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <section className="relative min-h-screen flex items-center justify-center bg-black">
        {/* Background Images */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={`/images/hero/hero-${currentImageIndex + 1}.webp`}
                alt={`Afónica Naranjo en directo ${currentImageIndex + 1}`}
                fill
                priority={currentImageIndex === 0}
                className="object-cover object-center w-11/12 mx-auto opacity-75"
                onLoad={() => {}}
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50" />

        {/* Content */}
        <div className="relative z-20 text-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="backdrop-blur-sm bg-black/30 p-8 rounded-lg"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-brand-orange mb-4 drop-shadow-lg">
              Afónica Naranjo
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white mb-8 drop-shadow-lg">
              La hardcorquesta de pueblo
            </p>
          </motion.div>
        </div>
      </section>

      <ShowsSection />
      <ShopSection />
    </main>
  );
}

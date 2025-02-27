'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useBand } from '@/context/BandContext';

// Dynamic imports for non-critical components
const ShowsSection = dynamic(() => import('@/components/ShowsSection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gradient-to-b from-black to-gray-900" />
});

const ShopSection = dynamic(() => import('@/components/ShopSection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gradient-to-b from-black to-gray-900" />
});

const ReviewsSection = dynamic(() => import('@/components/ReviewsSection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gradient-to-b from-black to-gray-900" />
});

const RecommendationsSection = dynamic(() => import('@/components/RecommendationsSection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gradient-to-b from-black to-gray-900" />
});

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { bio, products, photos } = useBand();

  useEffect(() => {
    setMounted(true);
    // Preload all images
    photos?.forEach((_, index) => {
      const img = document.createElement('img');
      img.src = `/images/hero/hero-${index + 1}.webp`;
    });
  }, [photos]);

  useEffect(() => {
    if (mounted) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        
        // Wait for fade out to complete before changing image
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (photos?.length || 3));
          // Wait a frame before starting fade in
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsTransitioning(false);
            });
          });
        }, 500);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [mounted, photos?.length]);

  const renderHero = () => (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 z-[1]" />
        
        {/* All images preloaded but hidden */}
        <div className="hidden">
          {photos?.map((_, index) => (
            <Image
              key={`preload-${index}`}
              src={`/images/hero/hero-${index + 1}.webp`}
              alt={`Preload ${index + 1}`}
              width={1920}
              height={1080}
              priority
            />
          ))}
        </div>
        
        {/* Current Image */}
        <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <Image
            src={`/images/hero/hero-${currentImageIndex + 1}.webp`}
            alt={`Afónica Naranjo en directo ${currentImageIndex + 1}`}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            unoptimized
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-0 px-4 w-full max-w-7xl mx-auto">
        <div className="pb-0 rounded-lg w-full">
          <Image
            src="/images/brand/logo.png"
            alt="Afónica Naranjo"
            width={1200}
            height={400}
            priority
            className="w-full max-w-2xl mx-auto"
          />
        </div>
        <div className="pt-0 rounded-lg w-full max-w-4xl mx-auto mb-16">
          <p className="text-xl md:text-2xl text-white text-center font-light [text-shadow:_0_1px_12px_rgb(0_0_0_/_90%)]">
            <span className="block italic mb-4 text-2xl md:text-4xl font-bold">{bio.main}</span>
            <span className="block mb-2">{bio.sub}</span>
            <span className="block text-lg md:text-xl opacity-80">{bio.small}</span>
          </p>
        </div>
      </div>
    </section>
  );

  return (
    <main className="min-h-screen bg-black">
      {renderHero()}
      {mounted && (
        <>
          <div id="shows-section">
            <ShowsSection />
          </div>
          <div id="shop-section">
            {products && products.length > 0 && <ShopSection />}
          </div>
          <div id="reviews-section">
            <ReviewsSection />
          </div>
          <div id="recomendaciones-section">
            <RecommendationsSection />
          </div>
        </>
      )}
    </main>
  );
}

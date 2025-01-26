"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  images: {
    front: string;
    back: string;
  };
  prestashopUrl: string;
}

export default function ProductCard({ name, description, price, images, prestashopUrl }: ProductCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-flip when not hovered
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setIsFlipped(prev => !prev);
      }, 3000); // Flip every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <motion.div 
      className="relative w-full max-w-sm mx-auto bg-black rounded-lg shadow-lg overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div 
        className="relative aspect-[5/6] cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <div className={`absolute inset-0 transition-opacity duration-700 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
          <Image
            src={images.front}
            alt={`${name} - Vista frontal`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className={`absolute inset-0 transition-opacity duration-700 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
          <Image
            src={images.back}
            alt={`${name} - Vista trasera`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        {/* View indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${!isFlipped ? 'bg-white' : 'bg-gray-500'}`} />
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isFlipped ? 'bg-white' : 'bg-gray-500'}`} />
        </div>
      </div>
      
      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-300 text-sm md:text-base mb-4">{description}</p>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <span className="text-lg md:text-xl font-bold text-white">{price.toFixed(2)}€</span>
          <a
            href={prestashopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-orange text-brand-white px-4 py-2.5 rounded-full font-medium hover:opacity-90 transition-colors text-sm md:text-base w-full md:w-auto text-center"
          >
            Comprar
          </a>
        </div>
      </div>
    </motion.div>
  );
} 
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FaInstagram, FaFacebook, FaYoutube, FaSpotify, FaBars, FaTimes } from 'react-icons/fa';

const Toolbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const handleNavigation = useCallback((path: string) => {
    if (isMenuOpen) {
      document.body.style.overflow = 'auto';
      setIsMenuOpen(false);
    }
    
    if (pathname === '/' && path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (pathname === '/' && path.startsWith('/#')) {
      const element = document.querySelector(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(path);
    }
  }, [isMenuOpen, pathname, router]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-black z-50 flex items-center justify-between px-4 md:px-8 border-b border-zinc-800">
        <div className="flex items-center gap-6">
          <button onClick={() => handleNavigation('/')} className="flex items-center">
            <Image
              src="/images/favicon/favicon-32x32.png"
              alt="Afónica Naranjo"
              width={32}
              height={32}
              className="w-8 h-8"
              priority
            />
          </button>
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://instagram.com/afonicanaranjo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#E4405F] transition-colors"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://facebook.com/afonicanaranjo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#1877F2] transition-colors"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://youtube.com/@afonicanaranjo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#FF0000] transition-colors"
            >
              <FaYoutube size={20} />
            </a>
            <a
              href="https://open.spotify.com/artist/5TYxZTjIPqKM8K8NuP9woO"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#1DB954] transition-colors"
            >
              <FaSpotify size={20} />
            </a>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => handleNavigation('/')} className="text-white hover:text-[#FF0000] transition-colors font-medium">
            Inicio
          </button>
          <button onClick={() => handleNavigation('/#bandsintown-widget')} className="text-white hover:text-[#FF0000] transition-colors font-medium">
            Conciertos
          </button>
          <button onClick={() => handleNavigation('/#tienda')} className="text-white hover:text-[#FF0000] transition-colors font-medium">
            Tienda
          </button>
          <button onClick={() => handleNavigation('/#reviews')} className="text-white hover:text-[#FF0000] transition-colors font-medium">
            Reviews
          </button>
          <button onClick={() => handleNavigation('/#recomendaciones')} className="text-white hover:text-[#FF0000] transition-colors font-medium">
            Recomendaciones
          </button>
          <button onClick={() => handleNavigation('/contacto')} className="text-white hover:text-[#FF0000] transition-colors font-medium">
            Contacto
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
        style={{ top: '64px' }}
      >
        <div className="flex flex-col items-center justify-start pt-8 space-y-6">
          <button
            onClick={() => handleNavigation('/')}
            className="text-white hover:text-[#FF0000] transition-colors font-medium text-xl"
          >
            Inicio
          </button>
          <button
            onClick={() => handleNavigation('/#bandsintown-widget')}
            className="text-white hover:text-[#FF0000] transition-colors font-medium text-xl"
          >
            Conciertos
          </button>
          <button
            onClick={() => handleNavigation('/#tienda')}
            className="text-white hover:text-[#FF0000] transition-colors font-medium text-xl"
          >
            Tienda
          </button>
          <button
            onClick={() => handleNavigation('/#reviews')}
            className="text-white hover:text-[#FF0000] transition-colors font-medium text-xl"
          >
            Reviews
          </button>
          <button
            onClick={() => handleNavigation('/#recomendaciones')}
            className="text-white hover:text-[#FF0000] transition-colors font-medium text-xl"
          >
            Recomendaciones
          </button>
          <button
            onClick={() => handleNavigation('/contacto')}
            className="text-white hover:text-[#FF0000] transition-colors font-medium text-xl"
          >
            Contacto
          </button>

          {/* Mobile Social Icons */}
          <div className="flex items-center gap-6 mt-8">
            <a
              href="https://instagram.com/afonicanaranjo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#E4405F] transition-colors"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://facebook.com/afonicanaranjo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#1877F2] transition-colors"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://youtube.com/@afonicanaranjo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#FF0000] transition-colors"
            >
              <FaYoutube size={24} />
            </a>
            <a
              href="https://open.spotify.com/artist/5TYxZTjIPqKM8K8NuP9woO"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#1DB954] transition-colors"
            >
              <FaSpotify size={24} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Toolbar; 
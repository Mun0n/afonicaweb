import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaFacebook, FaYoutube, FaSpotify } from 'react-icons/fa';

const Toolbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-black z-50 flex items-center justify-between px-4 md:px-8 border-b border-zinc-800">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/favicon/favicon-32x32.png"
            alt="Afónica Naranjo"
            width={32}
            height={32}
            className="w-8 h-8"
            priority
          />
        </Link>
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
      
      <div className="flex items-center gap-6">
        <Link href="/" className="text-white hover:text-[#FF0000] transition-colors font-medium">
          Inicio
        </Link>
        <Link href="/#bandsintown-widget" className="text-white hover:text-[#FF0000] transition-colors font-medium">
          Conciertos
        </Link>
        <Link href="/#tienda" className="text-white hover:text-[#FF0000] transition-colors font-medium">
          Tienda
        </Link>
        <Link href="/#reviews" className="text-white hover:text-[#FF0000] transition-colors font-medium">
          Reviews
        </Link>
        <Link href="/contacto" className="text-white hover:text-[#FF0000] transition-colors font-medium">
          Contacto
        </Link>
      </div>
    </nav>
  );
};

export default Toolbar; 
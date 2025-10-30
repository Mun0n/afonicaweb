'use client';

import Link from 'next/link';
import { FaInstagram, FaFacebookF, FaYoutube, FaTiktok, FaSpotify } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white py-8 md:py-12 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(#FF5733_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>
      
      <div className="container mx-auto px-4 max-w-3xl relative">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center text-brand-orange animate-fade-in">
          Contacto
        </h1>
        
        <div className="space-y-6">
          {/* Welcome message */}
          <div className="p-4 relative group">
            <p className="text-lg md:text-xl text-center text-gray-300">
              {`Si has llegado hasta aquí porque te han hablado de nosotros, porque nos viste en algún festival, o simplemente te has perdido por internet buscando en Google "estoy afónica y mañana es mi boda"… ¡BIENVENIDx! 🎉`}
            </p>
          </div>

          {/* Booking contact */}
          <Link href="mailto:afonicanaranjo@asaltosonoro.com" className="block">
            <div className="bg-zinc-900 p-6 md:p-8 rounded-lg border border-zinc-800/50 hover:border-brand-orange/50 transition-all duration-300 group relative overflow-hidden">
              {/* Background image with gradient overlays */}
              <div className="absolute inset-0 opacity-50 group-hover:opacity-60 transition-opacity">
                <div className="absolute inset-0 bg-[url('/images/logo-contact.webp')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/30 via-purple-500/30 to-brand-orange/30 animate-gradient-x" />
              </div>
              
              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-brand-orange group-hover:scale-105 transition-transform origin-left">
                  💌 ¿Quieres contratarnos?
                </h2>
                <p className="text-base md:text-lg text-gray-300 mb-3">
                  ¿Quieres añadir un toque diferente al cartel de tu festival? ¿Quieres unas fiestas de San Onofre memorables?
                </p>
                <div className="text-sm sm:text-base md:text-lg text-brand-orange text-center break-all group-hover:text-white transition-colors">
                  afonicanaranjo@asaltosonoro.com
                </div>
              </div>
            </div>
          </Link>

          {/* General contact */}
          <Link href="mailto:afonicanaranjo@gmail.com" className="block">
            <div className="bg-zinc-900 p-6 md:p-8 rounded-lg border border-zinc-800/50 hover:border-brand-orange/50 transition-all duration-300 group relative overflow-hidden">
              {/* Animated gradient background */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/20 via-purple-500/20 to-brand-orange/20 animate-gradient-x" />
              </div>
              
              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-brand-orange group-hover:scale-105 transition-transform origin-left">
                  📨 ¿Quieres escribirnos?
                </h2>
                <p className="text-base md:text-lg text-gray-300 mb-3">
                  {`¿Quieres enviarnos amor, odio o la receta de cómo hacéis el gazpacho en vuestra casa?`}
                  <br />
                  {`¡Escríbenos! Nos gustan los emails con propuestas, memes y GIFs de gatitos.`}
                </p>
                <div className="text-sm sm:text-base md:text-lg text-brand-orange text-center break-all group-hover:text-white transition-colors">
                  afonicanaranjo@gmail.com
                </div>
              </div>
            </div>
          </Link>

          {/* Social Media */}
          <div className="bg-zinc-900 p-6 md:p-8 rounded-lg border border-zinc-800/50 hover:border-brand-orange/50 transition-all duration-300 relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 via-black to-purple-500/20" />
            </div>
            
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-brand-orange group-hover:scale-105 transition-transform origin-left">
                📲 Redes Sociales
              </h2>
              <p className="text-base md:text-lg text-gray-300 mb-4">
                {`Síguenos, mándanos DMs o etiquétanos en tus stories y no te pierdas la capacidad que tenemos de mostrarle al mundo lo idiotas que podemos llegar a ser. Ojo, a veces también hacemos cosas serias, eh? 😉`}
              </p>
              <div className="grid grid-cols-5 gap-4">
                <Link 
                  href="https://www.instagram.com/afonicanaranjo/" 
                  target="_blank"
                  className="p-3 rounded-lg flex items-center justify-center hover:bg-zinc-800/30 transition-all hover:scale-110"
                >
                  <FaInstagram size={28} className="text-brand-orange hover:text-white transition-colors" />
                </Link>
                <Link 
                  href="https://www.facebook.com/afonicanaranjo" 
                  target="_blank"
                  className="p-3 rounded-lg flex items-center justify-center hover:bg-zinc-800/30 transition-all hover:scale-110"
                >
                  <FaFacebookF size={28} className="text-brand-orange hover:text-white transition-colors" />
                </Link>
                <Link 
                  href="https://www.youtube.com/@afonicanaranjo" 
                  target="_blank"
                  className="p-3 rounded-lg flex items-center justify-center hover:bg-zinc-800/30 transition-all hover:scale-110"
                >
                  <FaYoutube size={28} className="text-brand-orange hover:text-white transition-colors" />
                </Link>
                <Link 
                  href="https://www.tiktok.com/@afonicanaranjo" 
                  target="_blank"
                  className="p-3 rounded-lg flex items-center justify-center hover:bg-zinc-800/30 transition-all hover:scale-110"
                >
                  <FaTiktok size={28} className="text-brand-orange hover:text-white transition-colors" />
                </Link>
                <Link 
                  href="https://open.spotify.com/artist/31m17aNHvEGETXMWWKw1XC?si=sx_-i63rTiOSgh-hTEb73Q" 
                  target="_blank"
                  className="p-3 rounded-lg flex items-center justify-center hover:bg-zinc-800/30 transition-all hover:scale-110"
                >
                  <FaSpotify size={28} className="text-brand-orange hover:text-white transition-colors" />
                </Link>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="text-center space-y-4 p-4">
            <p className="italic text-lg md:text-xl text-gray-400">
              {`P.D. Si nos escribes a las 5 AM diciendo que somos la mejor banda de la historia, tendremos en cuenta que no estabas en tu mejor momento 🫣. Pero te querremos igual, o más 💜🖤♥️`}
            </p>
            <p className="text-xs md:text-sm text-gray-500">
              {`Sitio web creado con 🧡 por Mun0n`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
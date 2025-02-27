'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaYoutube, FaTiktok, FaSpotify } from 'react-icons/fa';

export default function ContactPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <motion.div 
        className="container mx-auto px-4 py-8 md:py-16 max-w-4xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-8 md:mb-12 text-center text-brand-orange"
          variants={item}
        >
          Contacto
        </motion.h1>
        
        <div className="space-y-8 md:space-y-12">
          <motion.p 
            className="text-lg md:text-xl text-center text-gray-300 max-w-2xl mx-auto mb-8 md:mb-12"
            variants={item}
          >
            Si has llegado hasta aquí porque te han hablado de nosotros, porque nos viste en algún festival, o simplemente te has perdido por internet buscando en Google "estoy afónica y mañana es mi boda"… ¡BIENVENIDx! 🎉
          </motion.p>

          <div className="mb-8 md:mb-12">
            <Link href="mailto:contratacion@nebularproducciones.com">
              <motion.div 
                className="bg-gray-900/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-brand-orange/20 hover:border-brand-orange/40 transition-colors shadow-xl cursor-pointer group"
                variants={item}
              >
                <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 mb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-brand-orange flex items-center gap-3 mb-4">
                      <span className="text-3xl md:text-4xl">💌</span> ¿Quieres contratarnos?
                    </h2>
                    <p className="text-base md:text-lg text-gray-300 group-hover:text-white transition-colors mb-4">
                      ¿Quieres añadir un toque diferente al cartel de tu festival? ¿Quieres unas fiestas de San Onofre memorables?
                    </p>
                    <p className="text-lg md:text-xl font-bold text-brand-orange group-hover:text-white transition-colors">
                      contratacion@nebularproducciones.com
                    </p>
                  </div>
                  <Image 
                    src="/images/logo-contact.webp"
                    alt="Afónica Naranjo Logo"
                    width={200}
                    height={200}
                    className="w-32 md:w-48 opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </motion.div>
            </Link>
          </div>

          <div className="mb-8 md:mb-12">
            <Link href="mailto:afonicanaranjo@gmail.com">
              <motion.div 
                className="bg-gray-900/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-brand-orange/20 hover:border-brand-orange/40 transition-colors shadow-xl cursor-pointer group"
                variants={item}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-brand-orange flex items-center gap-3">
                  <span className="text-3xl md:text-4xl">📨</span> ¿Quieres escribirnos?
                </h2>
                <p className="text-base md:text-lg text-gray-300 group-hover:text-white transition-colors mb-4">
                  ¿Quieres enviarnos amor, odio o la receta de cómo hacéis el gazpacho en vuestra casa?<br />
                  ¡Escríbenos! Nos gustan los emails con propuestas, memes y GIFs de gatitos.
                </p>
                <p className="text-lg md:text-xl font-bold text-brand-orange group-hover:text-white transition-colors">
                  📧 afonicanaranjo@gmail.com
                </p>
              </motion.div>
            </Link>
          </div>

          <div className="mb-8 md:mb-12">
            <motion.div 
              className="bg-gray-900/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-brand-orange/20 hover:border-brand-orange/40 transition-colors shadow-xl"
              variants={item}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-brand-orange flex items-center gap-3">
                <span className="text-3xl md:text-4xl">📲</span> Redes Sociales
              </h2>
              <p className="text-base md:text-lg text-gray-300 mb-6">
                Síguenos, mándanos DMs o etiquétanos en tus stories y no te pierdas la capacidad que tenemos de mostrarle al mundo lo idiotas que podemos llegar a ser. Ojo, a veces también hacemos cosas serias, eh? 😉
              </p>
              <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-6">
                <Link 
                  href="https://www.instagram.com/afonicanaranjo/" 
                  target="_blank"
                  className="group"
                >
                  <FaInstagram size={32} className="md:w-10 md:h-10 text-brand-orange group-hover:text-white transition-colors transform group-hover:scale-110 duration-200" />
                </Link>
                <Link 
                  href="https://www.facebook.com/afonicanaranjo" 
                  target="_blank"
                  className="group"
                >
                  <FaFacebookF size={32} className="md:w-10 md:h-10 text-brand-orange group-hover:text-white transition-colors transform group-hover:scale-110 duration-200" />
                </Link>
                <Link 
                  href="https://www.youtube.com/@afonicanaranjo" 
                  target="_blank"
                  className="group"
                >
                  <FaYoutube size={32} className="md:w-10 md:h-10 text-brand-orange group-hover:text-white transition-colors transform group-hover:scale-110 duration-200" />
                </Link>
                <Link 
                  href="https://www.tiktok.com/@afonicanaranjo" 
                  target="_blank"
                  className="group"
                >
                  <FaTiktok size={32} className="md:w-10 md:h-10 text-brand-orange group-hover:text-white transition-colors transform group-hover:scale-110 duration-200" />
                </Link>
                <Link 
                  href="https://open.spotify.com/artist/31m17aNHvEGETXMWWKw1XC?si=sx_-i63rTiOSgh-hTEb73Q" 
                  target="_blank"
                  className="group"
                >
                  <FaSpotify size={32} className="md:w-10 md:h-10 text-brand-orange group-hover:text-white transition-colors transform group-hover:scale-110 duration-200" />
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.p 
            className="italic text-center mt-8 md:mt-12 text-lg md:text-xl text-gray-300"
            variants={item}
          >
            P.D. Si nos escribes a las 5 AM diciendo que somos la mejor banda de la historia, tendremos en cuenta que no estabas en tu mejor momento 🫣. Pero te querremos igual, o más 💜🖤♥️
          </motion.p>

          <motion.p 
            className="text-center mt-6 md:mt-8 text-xs md:text-sm text-gray-500"
            variants={item}
          >
            Sitio web creado con 🧡 por Mun0n
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
} 
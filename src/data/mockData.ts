import { BandInfo } from '@/types/band';

export const mockBandInfo: BandInfo = {
  name: "Afónica Naranjo",
  bio: {
    main: "¡La HARDCORquesta ya ha llegado!",
    sub: 'Versiones punk-rock-HxC de esas canciones pachangueras "que-todo-el-mundo-se-sabe"',
    small: "(sí, los punkis también)"
  },
  photos: [
    '/images/hero/hero-1.webp',
    '/images/hero/hero-2.webp',
    '/images/hero/hero-3.webp',
    '/images/hero/hero-4.webp',
    '/images/hero/hero-5.webp',
    '/images/hero/hero-6.webp',
    '/images/hero/hero-7.webp',
    '/images/hero/hero-8.webp'
  ],
  products: [
    {
      id: 'tshirt-amaia',
      name: 'Camiseta Amaia',
      description: 'Camiseta negra 100% algodón. Logo de la banda en el pecho y diseño tributo a Amaia en la espalda.',
      price: 15,
      images: {
        front: '/images/products/tshirt-front.webp',
        back: '/images/products/tshirt-amaia-back.webp'
      },
      prestashopUrl: 'https://shop.afonicanaranjo.com/merch-afonica-naranjo/1-3-amaia-vive-camiseta-afonica-naranjo.html#/3-talla-unisex_l'
    },
    {
      id: 'tshirt-chayanne',
      name: 'Camiseta Chayanne',
      description: 'Camiseta negra 100% algodón. Logo de la banda en el pecho y diseño tributo a Chayanne en la espalda.',
      price: 15,
      images: {
        front: '/images/products/tshirt-front.webp',
        back: '/images/products/tshirt-chayanne-back.webp'
      },
      prestashopUrl: 'https://shop.afonicanaranjo.com/merch-afonica-naranjo/2-12-aprobado-por-chayanne-camiseta-afonica-naranjo.html#/3-talla-unisex_l'
    },
    {
      id: 'tshirt-andy-lucas',
      name: 'MAKE ANDY GREAT AGAIN – Camiseta Afónica Naranjo edición Andy & Lucas',
      description: 'Edición especial de la camiseta Afónica Naranjo con el diseño Andy & Lucas, inspirada en la dualidad del ser y el humor eterno de la banda. Color azul eléctrico con impresión frontal del logo y reverso con diseño minimalista.',
      price: 18,
      images: {
        front: '/images/products/t-shirt-andy-front.webp',
        back: '/images/products/t-shirt-andy-back.webp'
      },
      prestashopUrl: 'https://shop.afonicanaranjo.com/merch-afonica-naranjo/3-19-make-andy-great-again-camiseta-afonica-naranjo.html#/1-talla-unisex_xxl'
    }
  ],
  socialMedia: [
    {
      platform: "Instagram",
      url: "https://www.instagram.com/afonicanaranjo/"
    },
    {
      platform: "Facebook",
      url: "https://www.facebook.com/afonicanaranjo"
    },
    {
      platform: "YouTube",
      url: "https://www.youtube.com/@afonicanaranjo"
    },
    {
      platform: "Spotify",
      url: "https://open.spotify.com/artist/31m17aNHvEGETXMWWKw1XC?si=sx_-i63rTiOSgh-hTEb73Q"
    },
    {
      platform: "TikTok",
      url: "https://www.tiktok.com/@afonicanaranjo"
    }
  ],
  roadmap: [
    {
      title: 'Lanzamiento inicial',
      description: 'Primera versión de la web con información básica y diseño responsive',
      status: 'completed'
    },
    {
      title: 'Integración de tienda',
      description: 'Añadida sección de tienda con productos y conexión a PrestaShop',
      status: 'completed'
    },
    {
      title: 'Sección de reviews',
      description: 'Añadida sección de opiniones de fans y testimonios',
      status: 'completed'
    },
    {
      title: 'Tour 2025',
      description: 'Integración del poster de la gira y widget de Bandsintown',
      status: 'completed'
    },
    {
      title: 'Galería de fotos',
      description: 'Sección dedicada a fotos de conciertos y backstage',
      status: 'pending'
    },
    {
      title: 'Blog del grupo',
      description: 'Blog con noticias y actualizaciones de la banda',
      status: 'pending'
    }
  ]
};
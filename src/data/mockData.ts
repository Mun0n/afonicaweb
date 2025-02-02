import { BandInfo } from '../types/band';

export const mockBandInfo: BandInfo = {
  name: "Afónica Naranjo",
  bio: "Afónica Naranjo es una banda de versiones punk-rock-HxC que transforma los grandes éxitos en explosiones de punk y hardcore, creando una inesperada comunión entre la tía Amparo y el punki del pueblo.",
  photos: [
    '/images/hero/hero-1.webp',
    '/images/hero/hero-2.webp',
    '/images/hero/hero-3.webp',
    '/images/hero/hero-4.webp',
    '/images/hero/hero-5.webp',
    '/images/hero/hero-6.webp'
  ],
  products: [
    {
      id: 'tshirt-amaia',
      name: 'Camiseta Amaia',
      description: 'Camiseta negra 100% algodón. Logo de la banda en el pecho y diseño tributo a Amaia en la espalda.',
      price: 19.99,
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
      price: 19.99,
      images: {
        front: '/images/products/tshirt-front.webp',
        back: '/images/products/tshirt-chayanne-back.webp'
      },
      prestashopUrl: 'https://shop.afonicanaranjo.com/merch-afonica-naranjo/2-12-aprobado-por-chayanne-camiseta-afonica-naranjo.html#/3-talla-unisex_l'
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
  ]
}; 
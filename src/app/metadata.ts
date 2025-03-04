import { Metadata, Viewport } from "next";
import { defaultSEO } from '@/config/seo';

export const viewport: Viewport = {
  themeColor: '#000000',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://afonicanaranjo.com'),
  title: 'Afónica Naranjo | Banda de Versiones Punk-Rock-HxC',
  description: 'Afónica Naranjo transforma los grandes éxitos en explosiones de punk y hardcore. La hardcorquesta de pueblo que une a la tía Amparo con el punki del pueblo.',
  keywords: ['punk rock', 'hardcore', 'versiones', 'banda', 'madrid', 'música en directo', 'conciertos'],
  authors: [{ name: defaultSEO.additionalMetaTags[1].content }],
  icons: {
    icon: '/images/favicon/favicon.ico',
    shortcut: '/images/favicon/favicon.ico',
    apple: '/images/favicon/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/images/favicon/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/images/favicon/favicon-16x16.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: '#000000',
  openGraph: {
    title: 'Afónica Naranjo | Banda de Versiones Punk-Rock-HxC',
    description: 'Afónica Naranjo transforma los grandes éxitos en explosiones de punk y hardcore. La hardcorquesta de pueblo que une a la tía Amparo con el punki del pueblo.',
    url: 'https://afonicanaranjo.com',
    siteName: 'Afónica Naranjo',
    images: [
      {
        url: '/images/hero/hero-1.webp',
        width: 1920,
        height: 1080,
        alt: 'Afónica Naranjo en directo',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Afónica Naranjo | Banda de Versiones Punk-Rock-HxC',
    description: 'Afónica Naranjo transforma los grandes éxitos en explosiones de punk y hardcore.',
    images: ['/images/hero/hero-1.webp'],
  },
  alternates: {
    canonical: 'https://afonicanaranjo.com',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'HnqM5-7X208uMPvDlQBBsNOPhZ5ckR8sUYZNgBAE8Yk',
    other: {
      'google-site-verification': 'HnqM5-7X208uMPvDlQBBsNOPhZ5ckR8sUYZNgBAE8Yk'
    }
  },
}; 
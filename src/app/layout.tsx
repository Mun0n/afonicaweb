import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BandProvider } from '../context/BandContext';
import { defaultSEO } from '../config/seo';
import { Analytics } from '@vercel/analytics/react';
import Toolbar from '../components/Toolbar';
import { Footer } from '../components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://afonicanaranjo.com'),
  title: 'Afónica Naranjo | Banda de Versiones Punk-Rock-HxC',
  description: 'Afónica Naranjo transforma los grandes éxitos en explosiones de punk y hardcore. La hardcorquesta de pueblo que une a la tía Amparo con el punki del pueblo.',
  keywords: ['punk rock', 'hardcore', 'versiones', 'banda', 'madrid', 'música en directo', 'conciertos'],
  authors: [{ name: defaultSEO.additionalMetaTags[1].content }],
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
        <link rel="icon" href="/images/favicon/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MusicGroup',
              name: 'Afonica Naranjo',
              url: 'https://afonicanaranjo.com',
              image: defaultSEO.openGraph.images[0].url,
              description: defaultSEO.description,
              genre: ['Rock Alternativo', 'Rock Español'],
              sameAs: [
                'https://instagram.com/afonicanaranjo',
                'https://facebook.com/afonicanaranjo',
                'https://youtube.com/@afonicanaranjo',
                'https://open.spotify.com/artist/afonicanaranjo',
              ],
              member: [
                {
                  '@type': 'Person',
                  name: 'Carlos Naranjo',
                  roleName: 'Voz y Guitarra',
                },
                {
                  '@type': 'Person',
                  name: 'Ana Martín',
                  roleName: 'Bajo',
                },
                {
                  '@type': 'Person',
                  name: 'Miguel Sánchez',
                  roleName: 'Batería',
                },
                {
                  '@type': 'Person',
                  name: 'Laura Ruiz',
                  roleName: 'Teclados',
                },
              ],
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-16 bg-black`}
      >
        <BandProvider>
          <Toolbar />
          {children}
          <Footer />
        </BandProvider>
        <Analytics />
      </body>
    </html>
  );
}

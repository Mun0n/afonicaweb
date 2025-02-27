import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import 'leaflet/dist/leaflet.css';
import { defaultSEO } from '@/config/seo';
import ClientLayout from '@/components/ClientLayout';
export { metadata } from './metadata';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-16 bg-black`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-1V1LJGX35G`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1V1LJGX35G');
          `}
        </Script>
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
      </body>
    </html>
  );
}

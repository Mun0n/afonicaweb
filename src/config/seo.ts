export const defaultSEO = {
  title: 'Afonica Naranjo | Banda de Rock Alternativo',
  description: 'Afonica Naranjo es una banda de rock alternativo de Madrid. Descubre nuestra música, próximos conciertos y merchandise oficial.',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://afonicanaranjo.com',
    siteName: 'Afonica Naranjo',
    images: [
      {
        url: '/images/og-image.jpg', // You'll need to add this image
        width: 1200,
        height: 630,
        alt: 'Afonica Naranjo - Banda de Rock Alternativo',
      },
    ],
  },
  twitter: {
    handle: '@afonicanaranjo',
    site: '@afonicanaranjo',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'rock alternativo, banda madrid, música alternativa, afonica naranjo, rock español',
    },
    {
      name: 'author',
      content: 'Afonica Naranjo',
    },
  ],
}; 
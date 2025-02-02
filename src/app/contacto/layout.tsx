import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | Afónica Naranjo',
  description: 'Contacta con Afónica Naranjo para contrataciones, colaboraciones o simplemente para saludar. ¡Nos encanta recibir mensajes de nuestros fans!',
  alternates: {
    canonical: 'https://afonicanaranjo.com/contacto',
  },
  openGraph: {
    title: 'Contacto | Afónica Naranjo',
    description: 'Contacta con Afónica Naranjo para contrataciones, colaboraciones o simplemente para saludar. ¡Nos encanta recibir mensajes de nuestros fans!',
    url: 'https://afonicanaranjo.com/contacto',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 
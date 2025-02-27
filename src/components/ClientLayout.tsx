'use client';

import { BandProvider } from '@/context/BandContext';
import { Analytics } from '@vercel/analytics/react';
import Toolbar from '@/components/Toolbar';
import { Footer } from '@/components/Footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BandProvider>
      <Toolbar />
      {children}
      <Footer />
      <Analytics />
    </BandProvider>
  );
} 
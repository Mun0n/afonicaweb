"use client";

import { createContext, useContext, ReactNode } from 'react';
import type { BandContextType } from '@/types/band';
import { mockBandInfo } from '@/data/mockData';

const BandContext = createContext<BandContextType>({} as BandContextType);

export function useBandContext() {
  const context = useContext(BandContext);
  if (!context) {
    throw new Error('useBandContext must be used within a BandProvider');
  }
  return context;
}

export function BandProvider({ children }: { children: ReactNode }) {
  console.log('BandProvider initializing with mockData:', mockBandInfo);
  
  const contextValue: BandContextType = {
    ...mockBandInfo,
    roadmap: [
      {
        title: "Lanzamiento inicial",
        description: "Primera versión de la web con información básica y diseño responsive",
        status: "completed"
      },
      {
        title: "Integración de tienda",
        description: "Añadida sección de tienda con productos y conexión a PrestaShop",
        status: "completed"
      },
      {
        title: "Sección de reviews",
        description: "Añadida sección de opiniones de fans y testimonios",
        status: "completed"
      },
      {
        title: "Tour 2025",
        description: "Integración del poster de la gira y widget de Bandsintown",
        status: "completed"
      },
      {
        title: "Galería de fotos",
        description: "Sección dedicada a fotos de conciertos y backstage",
        status: "pending"
      },
      {
        title: "Blog del grupo",
        description: "Blog con noticias y actualizaciones de la banda",
        status: "pending"
      }
    ]
  };

  console.log('BandProvider context value:', contextValue);

  return (
    <BandContext.Provider value={contextValue}>
      {children}
    </BandContext.Provider>
  );
} 
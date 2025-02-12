"use client";

import { createContext, useContext, ReactNode } from 'react';
import type { BandContextType } from '@/types/band';
import { mockBandInfo } from '@/data/mockData';

const BandContext = createContext<BandContextType>({} as BandContextType);

export function useBand() {
  const context = useContext(BandContext);
  if (!context) {
    throw new Error('useBand must be used within a BandProvider');
  }
  return context;
}

export function BandProvider({ children }: { children: ReactNode }) {
  console.log('BandProvider initializing with mockData:', mockBandInfo);
  
  const contextValue: BandContextType = {
    ...mockBandInfo,
    reviews: [
      {
        businessName: "Restaurante La Nova Terreta",
        businessUrl: "https://maps.app.goo.gl/YGUdbxMNdG1NNoVD9",
        rating: 5,
        content: `Eran las 13:15h de un sábado, nos aproximábamos a Valencia y teníamos el tiempo justo para parar a comer antes de empezar a currar. Teníamos el objetivo claro: queríamos una paella y tenía que ser vegetariana. La Nova Terreta nos apareció a 10 minutos de distancia, llamamos para reservar y a las 13:55h ya teníamos los entrantes en la mesa. Unas alcachofas increíbles (estamos en temporada) y unas patatas bravas. Sí, son patatas fritas con salsas, pero hemos comido las suficientes salchipapas en ferias a las 5 de la mañana como para saber distinguir lo que es un producto bien elaborado de lo que es un anti-resacas y estas bravas, desde luego, son lo primero.

Y luego llegó la paella, en la que saborear cada grano de arroz te ponía en contacto con una estrella del firmamento. Cocción perfecta, justo punto de sal y una excelente selección de verduras.

Una paella que, por otra parte, podríamos habernos comido directamente en la taza del WC, que estaba reluciente y perfumado.

No lo hicimos. En su lugar optamos por utilizar los bonitos platos de cerámica que nos pusieron.

Por último, sugerir que se inicie una consulta popular en Alaquàs para que a todo el personal que nos atendió, se les ponga un monumento en la plaza del pueblo. El restaurante tiene la terraza en un callejón que puede ser un poco fresco en invierno cuando da la sombra, pero es una carencia en la que no reparas cuando el personal que te atiende en la terraza es, directamente, un SOL.`,
        date: "2025-02-08",
        location: "Carrer de les Palmeres, 6, 46970 Alaquàs, Valencia",
        reviewUrl: "https://goo.gl/maps/9pwH8i7Jm8S3BAhw8?g_st=atm"
      }
    ],
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
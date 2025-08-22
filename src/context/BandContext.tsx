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
        businessName: "La Noguera de Pozoseco",
        businessUrl: "https://maps.app.goo.gl/CcZKCxaRqTprSMEJA",
        rating: 5,
        content: "Parada técnica de Madrid a Valencia buscando café y agua con ibuprofeno para la mitad de los miembros de la banda.\n\nSin esperarlo, habíamos parado en la cafetería más fancy de la A3. Diseño interior agradable, atención rápida y correcta y visita táctica a unos baños que resultaron ser amplios, abundantes y agradablemente limpios. Como era el viaje de ida, sólo se utilizaron para hacer aguas menores. Si los pillamos en el viaje de vuelta, nos tienen que empadronar allí.\n\nSecador de manos marca DYSON, que siempre garantiza un secado completo de las manos en un ridículo lapso de tiempo. Para nosotros, DYSON siempre es la mejor opción en el segmento de los secadores de manos.\n\nNo hubo repostaje de carburante, aunque se hizo uso de la manguera de agua para llenar el depósito del limpiaparabrisas. No podemos evaluar la calidad de la misma ya que no hizo falta activar los limpiaparabrisas, pero la impresión general fue de gran calidad acuática (y venimos de Madrid, donde todos sus habitantes somos malditos sumilleres de agua).\n\nGran experiencia. Volveremos a parar en futuros viajes.",
        date: "2025-02-09",
        location: "Autovía del Este, Km. 207, 16212 Pozoseco, Cuenca",
        reviewUrl: "https://maps.app.goo.gl/uWpHZhLddgq6Hh7r7"
      },
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
      },
      {
        businessName: "Casa Rural El Patio",
        businessUrl: "https://maps.app.goo.gl/qDV65WLaD3zKvU6k8",
        rating: 5,
        content: "Teníamos actuación en Alamillo así que necesitábamos un sitio cercano y económico para darnos una ducha y dormir esa noche.\n\nEl alojamiento disponía de todos los elementos necesarios para ese cometido, ya que tenía ducha (dos) y camas (tres). Además contenía los accesorios auxiliares más habituales como son sábanas, toallas, agua corriente (fría y caliente), inodoro (dos) y paredes alicatadas.\n\nAdemás había microondas y nevera, aunque no hicimos uso de ninguno de esos electrodomésticos ya que no teníamos nada que microondear ni que neverear.\n\nEl check-in y el check-out fueron rápidos y sin ningún tipo de problema.\n\nEn definitiva, una estancia perfecta. Le ponemos 5 estrellas, una por cada hora que hemos dormido.",
        date: "2025-08-20",
        location: "C. Mayor, 10, 13400 Almadén, Ciudad Real",
        reviewUrl: "https://maps.app.goo.gl/74E2fUAbvT2JMFKU6"
      },
      {
        businessName: "Hotel Restaurante Nico",
        businessUrl: "https://maps.app.goo.gl/ekA8XTZD1p12PFFS7",
        rating: 5,
        content: "La abundancia de banderas de España puede dificultar, en primera instancia, la identificación del menú disponible, aunque finalmente nos orientamos y descubrimos que era abundante y variado: torreznos sueltos, bocadillo de torreznos, ensaladilla de torreznos, tortilla de torreznos y, de postre, chocorreznos y polvorreznos. Para beber, Fanta de torrezno o Torreznocola.\n\nComo es habitual, preguntamos por alternativas vegetarianas (dos de nosotros lo somos) y la principal opción era un vaso de gazpacho. Ante la sospecha de que pudiera contener trazas de torrezno o de que los tomates utilizados hubieran podido oír los chillidos de los cerdos en su camino al matadero antes de, inevitablemente, ser convertidos en torreznos, los dos vegetarianos descartaron la opción y salieron a la puerta en busca de un árbol al que abrazar. Se llevaron un golpe de realidad al comprobar que estaban en mitad de la meseta soriana y era todo un secarral.\n\nLos lavabos estaban bien, aunque el secador de manos no era Dyson.\n\nEl servicio fue rápido, amable e incluso encantador.",
        date: "2025-08-16",
        location: "N-II, Km. 151, 42240 Medinaceli, Soria",
        reviewUrl: "https://maps.app.goo.gl/LF8gNVk75a5zguQB6"
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
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
        businessName: "Casa Rural El Patio",
        businessUrl: "https://maps.app.goo.gl/qDV65WLaD3zKvU6k8",
        rating: 5,
        content: "Teníamos actuación en Alamillo así que necesitábamos un ssitio cercano y económico para darnos una ducha y dormir esa noche.\n\nEl alojamiento disponía de todos los elementos necesarios para ese cometido, ya que tenía ducha (dos) y camas (tres). Además contenía los accesorios auxiliares más habituales como son sábanas, toallas, agua corriente (fría y caliente), inodoro (dos) y paredes alicatadas.\n\nAdemás había microondas y nevera, aunque no hicimos uso de ninguno de esos electrodomésticos ya que no teníamos nada que microondear ni que neverear.\n\nEl check-in y el check-out fueron rápidos y sin ningún tipo de problema.\n\nEn definitiva, una estancia perfecta. Le ponemos 5 estrellas, una por cada hora que hemos dormido.",
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
      },
      {
        businessName: "Restaurante La Nova Terreta",
        businessUrl: "https://maps.app.goo.gl/YGUdbxMNdG1NNoVD9",
        rating: 5,
        content: "Eran las 13:15h de un sábado, nos aproximábamos a Valencia y teníamos el tiempo justo para parar a comer antes de empezar a currar. Teníamos el objetivo claro: queríamos una paella y tenía que ser vegetariana. La Nova Terreta nos apareció a 10 minutos de distancia, llamamos para reservar y a las 13:55h ya teníamos los entrantes en la mesa. Unas alcachofas increíbles (estamos en temporada) y unas patatas bravas. Sí, son patatas fritas con salsas, pero hemos comido las suficientes salchipapas en ferias a las 5 de la mañana como para saber distinguir lo que es un producto bien elaborado de lo que es un anti-resacas y estas bravas, desde luego, son lo primero.\n\nY luego llegó la paella, en la que saborear cada grano de arroz te ponía en contacto con una estrella del firmamento. Cocción perfecta, justo punto de sal y una excelente selección de verduras.\n\nUna paella que, por otra parte, podríamos habernos comido directamente en la taza del WC, que estaba reluciente y perfumado.\n\nNo lo hicimos. En su lugar optamos por utilizar los bonitos platos de cerámica que nos pusieron.\n\nPor último, sugerir que se inicie una consulta popular en Alaquàs para que a todo el personal que nos atendió, se les ponga un monumento en la plaza del pueblo. El restaurante tiene la terraza en un callejón que puede ser un poco fresco en invierno cuando da la sombra, pero es una carencia en la que no reparas cuando el personal que te atiende en la terraza es, directamente, un SOL.",
        date: "2025-02-08",
        location: "Carrer de les Palmeres, 6, 46970 Alaquàs, Valencia",
        reviewUrl: "https://goo.gl/maps/9pwH8i7Jm8S3BAhw8?g_st=atm"
      },
      {
        businessName: "Restaurante Etoile",
        businessUrl: "https://maps.app.goo.gl/d7G5ebvKiq1nS4sd9",
        rating: 5,
        content: "Desayuno correctísimo. Pedimos cuatro pinchos de tortilla de patatas CLÁSICA, aunque también tenían versiones rellenas (jamón y queso, atún, y similares). Vaya por delante que respetamos los gustos de cada cual, pero consideramos que la tortilla rellena es un producto que debería erradicarse de la gastronomía mundial, dado que la combinación patata + cebolla no necesita añadidos. La frase -repetida en multitud de garitos a las 6 de la mañana- de \"yo creo que ya es suficiente, RECUERDA QUE MENOS ES MÁS\", cobra el mismo valor al aplicarse al fenómeno de las tortillas rellenas.La verdad es que tenían pintaza, las cosas como son.Lo mejor, sin embargo, no fueron las tortillas, sino las gildas (brutales) y, sobre todo, la atención de Ana.Aguantar a cuatro idiotas con pocas horas de sueño no es fácil, pero Ana nos manejó con una mezcla de simpatía y amabilidad propias de quien ya ha librado mil batallas como esta.Disfrutamos del desayuno en la terraza, entre ratos de sol burgalés (que apretaba más de lo que parece en estas fechas) y huecos de sombra (propios de la estepa siberiana). El resultado fue un clima perfecto para desayunar.Parecería que este hecho sólo podría ser atribuible al movimiento de rotación de la Tierra, pero estamos seguros de que Ana tuvo algo que ver en que disfrutáramos de unas condiciones ambientales tan agradables como las que disfrutamos.",
        date: "2025-09-28",
        location: "Plaza Mayor, 16, 09250 Belorado, Burgos",
        reviewUrl: "https://maps.app.goo.gl/JZyZDYfT933q7Cqz8"
      },
      {
        businessName: "Hotel/Restaurante Bidean",
        businessUrl: "https://maps.app.goo.gl/khG3MKd3e3nxFbcW6",
        rating: 5,
        content: "Peregrin@s franqueando la puerta que a veces gritan, pero no les juzgamos, es el fervor. Ventilador de techo de brisa ligera y necesario para las tórridas noches. Barreño de tomate triturado con tostadas (hechas de más) como muestra de la calidad y el orgullo de la huerta navarra.",
        date: "2025-09-28",
        location: "C. Mayor, 20, 31100 Puente la Reina, Navarra",
        reviewUrl: "https://maps.app.goo.gl/9cRsmh3a6GngBZPR6"
      },
      {
        businessName: "Galp",
        businessUrl: "https://maps.app.goo.gl/yTjo9j59hSBzsmYc9",
        rating: 5,
        content: "Parada técnica de camino a Belorado (Burgos), después de tragarnos un atasco enorme. Pero no tan enorme como la sonrisa con la que nos atendió Yolanda.\n\nNos confundimos al repostar y echamos diésel del caro, pero esperamos y confiamos en que GALP destine esa diferencia de precio directamente a la nómina de Yolanda. Y ya de paso a cambiar los surtidores, para que sean un poco más rápidos... Menos mal que Yolanda compensa la lentitud de los surtidores con su rapidez atendiendo en caja.\n\nVivimos en Madrid, pero nos haríamos 200 km cada semana para disfrutar de 2 minutos con Yolanda.\n\nBonus: los baños tenían secador Dyson. Bien.",
        date: "2025-09-28",
        location: "Autov. A-1, Pk 227,630 Md, 09620 Sarracín, Burgos",
        reviewUrl: "https://maps.app.goo.gl/3WFDp5LmpwmjgVWV8"
      },
      {
        businessName: "Planta Tratamiento Purines Almazan",
        businessUrl: "https://maps.app.goo.gl/oPk3sxm4VUroB8TM9",
        rating: 5,
        content: "Da lo que promete. Huele.",
        date: "2025-01-12",
        location: "Unnamed Road, 42200 Almazán, Soria",
        reviewUrl: "https://maps.app.goo.gl/FMjYyq6y9hJR7Mc5A"
      },
      {
        businessName: "Piscina municipal",
        businessUrl: "https://maps.app.goo.gl/BuKraNydPaL5228t6",
        rating: 5,
        content: "Si escuchas una dulce voz estando a 300 km, tranquil@, es una de las camareras, tu café está listo. Comida sencilla, trabajador@s arrancad@s de las mismas manos de Zeus en el olimpo. Aguas limpias, cesped al estilo Bernabeu, confort con olor a Nivea factor 50.",
        date: "2025-09-12",
        location: "C. Daoiz y Velarde, 2, 10370 Deleitosa, Cáceres",
        reviewUrl: "https://maps.app.goo.gl/iwyEPRi9USdaERi68"
      },
      {
        businessName: "Gasolinera La Valenti",
        businessUrl: "https://maps.app.goo.gl/vwyG6PUCGFHkznWP9",
        rating: 5,
        content: "Jugamos al Jenga en el cubo de basura, ganó el calentamiento global. La dependienta tope maja, volveríamos a repostar desde Madrid solo por escuchar su dulce voz. Snacks y bebidas clásicos, baños muy limpios.",
        date: "2025-09-12",
        location: "Av. Industrial, 3, 42200 Almazán, Soria",
        reviewUrl: "https://maps.app.goo.gl/CR1Wz5tHDtbu2Fr56"
      },
      {
        businessName: "La Noguera de Pozoseco",
        businessUrl: "https://maps.app.goo.gl/Wq4oc7CqNfEHBq6P7",
        rating: 5,
        content: "Parada técnica de Madrid a Valencia buscando café y agua con ibuprofeno para la mitad de los miembros de la banda.\n\nSin esperarlo, habíamos parado en la cafetería más fancy de la A3. Diseño interior agradable, atención rápida y correcta y visita táctica a unos baños que resultaron ser amplios, abundantes y agradablemente limpios. Como era el viaje de ida, sólo se utilizaron para hacer aguas menores. Si los pillamos en el viaje de vuelta, nos tienen que empadronar allí.\n\nSecador de manos marca DYSON, que siempre garantiza un secado completo de las manos en un ridículo lapso de tiempo. Para nosotros, DYSON siempre es la mejor opción en el segmento de los secadores de manos.\n\nNo hubo repostaje de carburante, aunque se hizo uso de la manguera de agua para llenar el depósito del limpiaparabrisas. No podemos evaluar la calidad de la misma ya que no hizo falta activar los limpiaparabrisas, pero la impresión general fue de gran calidad acuática (y venimos de Madrid, donde todos sus habitantes somos malditos sumilleres de agua).\n\nGran experiencia. Volveremos a parar en futuros viajes.",
        date: "2025-02-12",
        location: "Autovía del Este, Km. 207, 16212 Pozoseco, Cuenca",
        reviewUrl: "https://maps.app.goo.gl/bnNjAtDn3bBqWsuf8"
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
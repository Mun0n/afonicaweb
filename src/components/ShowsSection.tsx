import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useBandContext } from '../context/BandContext';
import { Show } from '../types/band';
import { filterShowsByDate, sortShowsByDate } from '../utils/dateUtils';

export default function ShowsSection() {
  const { upcomingShows: allShows } = useBandContext();

  const { upcomingShows } = useMemo(() => {
    if (!allShows || allShows.length === 0) return { upcomingShows: [] };
    const filtered = filterShowsByDate(allShows);
    return {
      upcomingShows: sortShowsByDate(filtered.upcomingShows)
    };
  }, [allShows]);

  if (!upcomingShows || upcomingShows.length === 0) return null;

  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-black to-gray-900" id="conciertos">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 text-center">Próximos Conciertos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {upcomingShows.map((show: Show, index: number) => (
            <motion.div
              key={`${show.date}-${show.venue}`}
              className="bg-black p-4 md:p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-white">
                <div className="text-xl font-bold mb-2">{show.venue}</div>
                <div className="text-gray-400 mb-1 text-sm md:text-base">{show.city}</div>
                <div className="text-gray-400 mb-1 text-sm md:text-base">
                  {new Date(show.date).toLocaleDateString('es-ES', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                {show.time && (
                  <div className="text-gray-400 mb-4 text-sm md:text-base">{show.time}</div>
                )}
                {show.price === "Free" || show.venue === "Cebrecos Fest" ? (
                  <span className="inline-block bg-brand-orange text-brand-white px-4 py-2.5 rounded font-medium text-sm md:text-base w-full md:w-auto text-center">
                    Entrada Libre
                  </span>
                ) : show.ticketUrl ? (
                  <a 
                    href={show.ticketUrl}
                    className="inline-block bg-brand-orange text-brand-white px-4 py-2.5 rounded hover:opacity-90 transition-colors text-sm md:text-base w-full md:w-auto text-center"
                  >
                    Comprar Entradas
                  </a>
                ) : (
                  <span className="inline-block bg-gray-700 text-brand-white px-4 py-2.5 rounded text-sm md:text-base w-full md:w-auto text-center">
                    Entradas Próximamente
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
'use client';

import { motion } from 'framer-motion';
import { FaStar, FaStarHalf } from 'react-icons/fa';

const MAX_RATING = 5;

const fakeReviews = [
  {
    id: 1,
    name: "Rory R.",
    rating: 4.5,
    comment: "Well, I'm from Denver, Colorado, and I didn't understand a f***ing word they were singin', but hot damn, the vibes were insane! Would sure as s**t go again!",
    avatar: "/images/reviews/tia-amparo.webp"
  },
  {
    id: 2,
    name: "Leire M.",
    rating: 2.5,
    comment: "Afónica Naranjo es la prueba de que el rencor puede convertirse en pogo. Me odian con cariño, gritan que Amaia es la reina del pop y, sinceramente, después de escucharlos, casi me lo creo.",
    avatar: "/images/reviews/punki.webp"
  },
  {
    id: 3,
    name: "Elmer F.",
    rating: 5,
    comment: "Mis hijos rebeldes, herederos de mi esencia, llevan la verbena al límite con puro fuego. Ahora díganme… ¿bailamos bachata hoy? 💃🔥",
    avatar: "/images/reviews/chayanne.webp"
  },
  {
    id: 4,
    name: "Ayuntamiento de Villanueva del Río",
    rating: 5,
    comment: "Agradecemos el fiestón que nos han dado estos muchachos. Los mozos y mozas quedaron encantados… pero nos deben unas cuantas botellas de pacharán. 🍷🎸",
    avatar: "/images/reviews/amaia.webp"
  },
  {
    id: 5,
    name: "Pili, futura suegra orgullosa",
    rating: 5,
    comment: "Después de verlos en directo, lo tengo claro: casaría a cualquiera de mis hijxs con cualquiera de ellos. No voy a dejar pasar la oportunidad de que sean parte de mi familia.",
    avatar: "/images/reviews/marta.webp"
  }
];

export default function ReviewsSection() {
  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-gray-900 to-black" id="reviews">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 text-center">Lo que dice la gente de nosotros</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {fakeReviews.map((review) => (
            <motion.div
              key={review.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/30"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div>
                  <h3 className="text-white font-semibold">{review.name}</h3>
                  <div className="flex relative">
                    {/* Empty stars background */}
                    <div className="flex text-gray-600">
                      {[...Array(MAX_RATING)].map((_, i) => (
                        <FaStar key={i} className="w-4 h-4" />
                      ))}
                    </div>
                    {/* Filled stars overlay */}
                    <div className="flex text-brand-orange absolute top-0 left-0">
                      {[...Array(Math.floor(review.rating))].map((_, i) => (
                        <FaStar key={i} className="w-4 h-4" />
                      ))}
                      {review.rating % 1 !== 0 && (
                        <FaStarHalf className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 italic">{review.comment}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
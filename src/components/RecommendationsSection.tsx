'use client';

import { useBand } from '@/context/BandContext';
import { StarIcon } from '@heroicons/react/24/solid';
import { Review } from '@/types/band';
import { useState } from 'react';

const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

export default function RecommendationsSection() {
  const { reviews } = useBand();
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);

  if (!reviews?.length) return null;

  const toggleReview = (index: number) => {
    setExpandedReviews(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="recomendaciones" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Lo que nos gusta a nosotros</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review: Review, index: number) => {
            const isExpanded = expandedReviews.includes(index);
            const shouldShowButton = review.content.length > 300;
            const displayContent = shouldShowButton && !isExpanded 
              ? `${review.content.slice(0, 300)}...` 
              : review.content;

            return (
              <a
                key={index}
                href={review.reviewUrl || review.businessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-zinc-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-zinc-800 border border-zinc-800"
              >
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-semibold flex-grow text-white">{review.businessName}</h3>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 text-brand-orange" />
                    ))}
                  </div>
                </div>
                <div className="text-gray-300 mb-4">
                  <div className="whitespace-pre-line">{displayContent}</div>
                  {shouldShowButton && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleReview(index);
                      }}
                      className="text-brand-orange hover:text-brand-white transition-colors mt-2 text-sm font-medium"
                    >
                      {isExpanded ? 'Ver menos' : 'Ver más'}
                    </button>
                  )}
                </div>
                <div className="text-sm text-gray-400">
                  <p>{review.location}</p>
                  <p>{formatDate(review.date)}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
} 
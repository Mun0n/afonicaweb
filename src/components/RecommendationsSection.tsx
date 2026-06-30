'use client';

import { useBand } from '@/context/BandContext';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Review } from '@/types/band';
import { useState, useRef, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

const ReviewsMap = dynamic(() => import('./ReviewsMap'), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-zinc-900 rounded-lg animate-pulse" />
});

interface ReviewCardProps {
  review: Review;
  index: number;
  isExpanded: boolean;
  onToggle: (index: number) => void;
}

function ReviewCard({ review, index, isExpanded, onToggle }: ReviewCardProps) {
  const shouldShowButton = review.content.length > 300;
  const displayContent =
    shouldShowButton && !isExpanded
      ? `${review.content.slice(0, 300)}...`
      : review.content;

  return (
    <motion.a
      data-review-card
      href={review.reviewUrl || review.businessUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="snap-start flex-[0_0_88%] sm:flex-[0_0_48%] lg:flex-[0_0_31%] flex flex-col bg-zinc-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:bg-zinc-800 border border-zinc-800 min-h-[320px]"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start mb-4 gap-3">
        <h3 className="text-xl font-semibold flex-grow text-white leading-tight">
          {review.businessName}
        </h3>
        <div className="flex shrink-0">
          {[...Array(review.rating)].map((_, i) => (
            <StarIcon key={i} className="h-5 w-5 text-brand-orange" />
          ))}
        </div>
      </div>
      <div className="text-gray-300 mb-4 flex-grow">
        <div className="whitespace-pre-line">{displayContent}</div>
        {shouldShowButton && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onToggle(index);
            }}
            className="text-brand-orange hover:text-brand-white transition-colors mt-2 text-sm font-medium"
          >
            {isExpanded ? 'Ver menos' : 'Ver más'}
          </button>
        )}
      </div>
      <div className="text-sm text-gray-400 mt-auto">
        <p>{review.location}</p>
        <p>{formatDate(review.date)}</p>
      </div>
    </motion.a>
  );
}

export default function RecommendationsSection() {
  const { reviews } = useBand();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 8);
    setCanScrollNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollButtons();

    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [updateScrollButtons, reviews?.length]);

  if (!reviews?.length) return null;

  const toggleReview = (index: number) => {
    setExpandedReviews((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const scroll = (direction: 'prev' | 'next') => {
    const el = scrollRef.current;
    if (!el) return;

    const card = el.querySelector<HTMLElement>('[data-review-card]');
    const gap = 24;
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.88;

    el.scrollBy({
      left: direction === 'next' ? step : -step,
      behavior: 'smooth',
    });
  };

  return (
    <section id="recomendaciones" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Lo que nos gusta a nosotros
        </h2>

        <div
          className="relative"
          role="region"
          aria-roledescription="carousel"
          aria-label="Reseñas de la gira"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-gray-900 to-transparent hidden sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-gray-900 to-transparent hidden sm:block" />

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 -mx-4 px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((review: Review, index: number) => (
              <ReviewCard
                key={`${review.businessName}-${review.date}`}
                review={review}
                index={index}
                isExpanded={expandedReviews.includes(index)}
                onToggle={toggleReview}
              />
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <button
              type="button"
              onClick={() => scroll('prev')}
              disabled={!canScrollPrev}
              aria-label="Reseña anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-white transition-colors hover:border-brand-orange hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-zinc-700 disabled:hover:bg-zinc-900"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll('next')}
              disabled={!canScrollNext}
              aria-label="Reseña siguiente"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-white transition-colors hover:border-brand-orange hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-zinc-700 disabled:hover:bg-zinc-900"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-white">
            Mapa de recomendaciones
          </h3>
          <ReviewsMap />
        </div>
      </div>
    </section>
  );
}

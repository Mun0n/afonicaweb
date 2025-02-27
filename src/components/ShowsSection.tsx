'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ShowsSection() {
  useEffect(() => {
    // Load Bandsintown widget script
    const script = document.createElement('script');
    script.src = 'https://widgetv3.bandsintown.com/main.min.js';
    script.charset = 'utf-8';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-black to-gray-900" id="bandsintown-widget">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 text-center">Próximos Conciertos</h2>
        
        {/* Tour Poster */}
        <motion.div 
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative aspect-[1/1.4] rounded-lg overflow-hidden">
            <Image
              src="/images/tour/tour-2025.webp"
              alt="Si no te gusta, hazlo Tour 2025 - Afónica Naranjo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Bandsintown Widget */}
        <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900/30 to-black/40 backdrop-blur-sm border border-gray-800/20">
          <a 
            className="bit-widget-initializer"
            data-artist-name="id_15572618"
            data-events-to-display=""
            data-background-color="rgba(0,0,0,0)"
            data-separator-color="rgba(255,87,51,0.1)"
            data-text-color="rgba(255,255,255,1)"
            data-font="Helvetica"
            data-auto-style="true"
            data-button-label-capitalization="uppercase"
            data-header-capitalization="uppercase"
            data-location-capitalization="uppercase"
            data-venue-capitalization="uppercase"
            data-display-local-dates="true"
            data-local-dates-position="tab"
            data-display-past-dates="false"
            data-display-details="false"
            data-display-lineup="false"
            data-display-start-time="false"
            data-social-share-icon="false"
            data-display-limit="all"
            data-date-format="MMM. D, YYYY"
            data-date-orientation="horizontal"
            data-date-border-color="rgba(255,87,51,0.2)"
            data-date-border-width="1px"
            data-date-capitalization="capitalize"
            data-date-border-radius="8px"
            data-date-text-color="rgba(255,255,255,1)"
            data-venue-text-color="rgba(255,255,255,1)"
            data-location-text-color="rgba(255,255,255,1)"
            data-festival-text-color="rgba(255,255,255,1)"
            data-event-ticket-cta-size="medium"
            data-event-custom-ticket-text=""
            data-event-ticket-text="ENTRADAS"
            data-event-ticket-icon="false"
            data-event-ticket-cta-text-color="rgba(255,255,255,1)"
            data-event-ticket-cta-bg-color="rgba(255,87,51,1)"
            data-event-ticket-cta-border-color="rgba(255,87,51,0.3)"
            data-event-ticket-cta-border-width="0px"
            data-event-ticket-cta-border-radius="6px"
            data-sold-out-button-text-color="rgba(255,255,255,0.9)"
            data-sold-out-button-background-color="rgba(74,74,74,0.8)"
            data-sold-out-button-border-color="rgba(74,74,74,0.5)"
            data-sold-out-button-clickable="true"
            data-event-rsvp-position="left"
            data-event-rsvp-cta-size="medium"
            data-event-rsvp-only-show-icon="false"
            data-event-rsvp-text="ME APUNTO"
            data-event-rsvp-icon="false"
            data-event-rsvp-cta-text-color="rgba(255,255,255,1)"
            data-event-rsvp-cta-bg-color="rgba(255,255,255,0.05)"
            data-event-rsvp-cta-border-color="rgba(255,87,51,0.3)"
            data-event-rsvp-cta-border-width="1px"
            data-event-rsvp-cta-border-radius="6px"
            data-follow-section-position="top"
            data-follow-section-alignment="center"
            data-follow-section-header-text="Vamos a tocar a tu pueblo ¿y no te has enterado?"
            data-follow-section-cta-size="medium"
            data-follow-section-cta-text="SEGUIR"
            data-follow-section-cta-icon="false"
            data-follow-section-cta-text-color="rgba(255,255,255,1)"
            data-follow-section-cta-bg-color="rgba(255,87,51,1)"
            data-follow-section-cta-border-color="rgba(255,87,51,0.3)"
            data-follow-section-cta-border-width="0px"
            data-follow-section-cta-border-radius="6px"
            data-play-my-city-position="bottom"
            data-play-my-city-alignment="center"
            data-play-my-city-header-text="¿Quieres que toquemos en tu casa?"
            data-play-my-city-cta-size="medium"
            data-play-my-city-cta-text="PIDE UN CONCIERTO"
            data-play-my-city-cta-icon="false"
            data-play-my-city-cta-text-color="rgba(255,255,255,1)"
            data-play-my-city-cta-bg-color="rgba(255,87,51,1)"
            data-play-my-city-cta-border-color="rgba(255,87,51,0.3)"
            data-play-my-city-cta-border-width="0px"
            data-play-my-city-cta-border-radius="6px"
            data-language="es"
            data-layout-breakpoint="900"
            data-bit-logo-position="bottomRight"
            data-bit-logo-color="rgba(255,87,51,0.8)"
          />
        </div>
      </div>
    </section>
  );
} 
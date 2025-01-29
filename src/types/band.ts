export interface SocialMedia {
  platform: string;
  url: string;
}

export interface Show {
  date: string;          // ISO date string (YYYY-MM-DD)
  time?: string;         // Start time (HH:mm)
  venue: string;         // Venue name
  city: string;          // City name
  address?: string;      // Full venue address
  ticketUrl: string;     // URL to buy tickets
  price?: string;        // Ticket price/range
  description?: string;  // Event description
  lineup?: string[];     // Band names in order of appearance
  posterUrl?: string;    // URL to event poster image
  status?: 'upcoming' | 'cancelled' | 'postponed' | 'sold_out';
}

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: {
    front: string;
    back: string;
  };
  prestashopUrl: string;
};

export type BandInfo = {
  name: string;
  bio: string;
  upcomingShows: Show[];
  pastShows: Show[];
  socialMedia: SocialMedia[];
  photos: string[];
  products: Product[];
};

export interface BandContextType {
  bandInfo: BandInfo;
  setBandInfo: (info: BandInfo) => void;
} 
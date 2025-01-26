export interface SocialMedia {
  platform: string;
  url: string;
}

export interface Show {
  date: string;
  venue: string;
  city: string;
  ticketUrl: string;
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
  socialMedia: SocialMedia[];
  photos: string[];
  products: Product[];
};

export interface BandContextType {
  bandInfo: BandInfo;
  setBandInfo: (info: BandInfo) => void;
} 
export interface SocialMedia {
  platform: string;
  url: string;
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

export interface RoadmapItem {
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'in-progress';
}

export interface Review {
  businessName: string;
  businessUrl: string;
  rating: number;
  content: string;
  date: string;
  location: string;
  reviewUrl?: string;
}

export interface BandInfo {
  name: string;
  bio: {
    main: string;
    sub: string;
    small: string;
  };
  photos: string[];
  products: Product[];
  socialMedia: SocialMedia[];
  roadmap: RoadmapItem[];
}

export interface BandContextType extends BandInfo {
  roadmap: RoadmapItem[];
  reviews: Review[];
} 
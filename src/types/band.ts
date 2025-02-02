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

export interface BandInfo {
  name: string;
  bio: string;
  photos: string[];
  products: Product[];
  socialMedia: SocialMedia[];
}

export interface BandContextType extends BandInfo {
  roadmap: RoadmapItem[];
} 
"use client";

import { createContext, useContext, ReactNode, useState } from 'react';
import type { BandContextType, RoadmapItem } from '../types/band';
import { mockBandInfo } from '../data/mockData';

const BandContext = createContext<BandContextType | null>(null);

export function useBandContext() {
  const context = useContext(BandContext);
  if (!context) {
    throw new Error('useBandContext must be used within a BandProvider');
  }
  return context;
}

export function BandProvider({ children }: { children: ReactNode }) {
  const [roadmap] = useState<RoadmapItem[]>([]);

  return (
    <BandContext.Provider value={{ ...mockBandInfo, roadmap }}>
      {children}
    </BandContext.Provider>
  );
} 
"use client";

import { createContext, useContext, ReactNode } from 'react';
import { BandInfo } from '../types/band';
import { mockBandInfo } from '../data/mockData';

const BandContext = createContext<BandInfo>(mockBandInfo);

export function useBandContext() {
  return useContext(BandContext);
}

export function BandProvider({ children }: { children: ReactNode }) {
  return (
    <BandContext.Provider value={mockBandInfo}>
      {children}
    </BandContext.Provider>
  );
} 
'use client';

import type { ReactNode, RefObject } from 'react';
import { createContext, useContext, useRef } from 'react';

export interface BlobState {
  intensity: number;
  mouseX: number;
  mouseY: number;
  processing: number;
  distanceFromCenter: number;
}

interface BlobStateContextType {
  stateRef: RefObject<BlobState>;
  updateState: (updates: Partial<BlobState>) => void;
}

interface BlobStateProviderProps {
  children: ReactNode;
}

const BlobStateContext = createContext<BlobStateContextType | undefined>(undefined);

export function BlobStateProvider({ children }: BlobStateProviderProps) {
  const stateRef = useRef<BlobState>({
    intensity: 0,
    mouseX: 0.5,
    mouseY: 0.5,
    processing: 0.9,
    distanceFromCenter: 0,
  });

  const updateState = (updates: Partial<BlobState>) => {
    Object.assign(stateRef.current, updates);
  };

  return <BlobStateContext.Provider value={{ stateRef, updateState }}>{children}</BlobStateContext.Provider>;
}

export function useBlobState() {
  const context = useContext(BlobStateContext);
  if (!context) {
    throw new Error('useBlobState must be used within BlobStateProvider');
  }
  return context;
}

'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface BlobState {
  intensity: number;
  mouseX: number;
  mouseY: number;
  processing: number;
  distanceFromCenter: number;
}

interface BlobStateContextType {
  state: BlobState;
  updateState: (updates: Partial<BlobState>) => void;
}

const BlobStateContext = createContext<BlobStateContextType | undefined>(undefined);

export function BlobStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BlobState>({
    intensity: 0,
    mouseX: 0.5,
    mouseY: 0.5,
    processing: 0.9,
    distanceFromCenter: 0,
  });

  const updateState = (updates: Partial<BlobState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  return <BlobStateContext.Provider value={{ state, updateState }}>{children}</BlobStateContext.Provider>;
}

export function useBlobState() {
  const context = useContext(BlobStateContext);
  if (!context) {
    throw new Error('useBlobState must be used within BlobStateProvider');
  }
  return context;
}

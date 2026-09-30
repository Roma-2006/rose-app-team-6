'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

// Relatives
import {
  BreadcrumbContextValue,
  BreadcrumbOverrideItem,
} from '@/features/main/types/layout/breadcrumb';

// CONST
const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null);

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  // States
  const [override, setOverride] = useState<BreadcrumbOverrideItem[] | null>(null);

  return (
    <BreadcrumbContext.Provider value={{ override, setOverride }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumbContext() {
  const ctx = useContext(BreadcrumbContext);

  if (!ctx) {
    throw new Error('useBreadcrumbContext must be used within a BreadcrumbProvider');
  }

  return ctx;
}

'use client';

import { useEffect } from 'react';

// Relatives
import { useBreadcrumbContext } from '@/features/dashboard/context/breadcrumbs-context';
import { BreadcrumbOverrideItem } from '@/features/dashboard/types/layout/breadcrumb';

export function useBreadcrumbOverride(items: BreadcrumbOverrideItem[]) {
  // Variables
  const { setOverride } = useBreadcrumbContext();
  const key = JSON.stringify(items);

  // Effects
  useEffect(() => {
    setOverride(items);
    return () => setOverride(null);
  }, [key]);
}

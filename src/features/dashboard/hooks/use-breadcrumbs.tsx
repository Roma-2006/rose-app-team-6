'use client';

import { useEffect } from 'react';

// Relatives
import { useBreadcrumbContext } from '@/features/dashboard/context/breadcrumbs-context';
import { BreadcrumbOverrideItem } from '@/features/main/types/layout/breadcrumb';

export function useBreadcrumbOverride(items: BreadcrumbOverrideItem[]) {
  // Variables
  const { setOverride } = useBreadcrumbContext();

  // Effects
  useEffect(() => {
    setOverride(items);

    return () => setOverride(null);
  }, [items, setOverride]);
}

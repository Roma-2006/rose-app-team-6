'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { FILTER_PARAM_KEYS } from '@/shared/constants/filter.constants';

const ResetAllButton = () => {
  // State
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Variables
  const hasActiveFilters = FILTER_PARAM_KEYS.some((key) => searchParams.has(key));

  // Functions
  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());
    FILTER_PARAM_KEYS.forEach((key) => params.delete(key));
    params.set('page', '1');

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <Button
      variant="secondary"
      buttonVariant="text"
      title="products.filter.resetAll.title"
      leftIcon={<RotateCcw className="size-4.5" />}
      onClick={handleReset}
      className={'w-full'}
      disabled={!hasActiveFilters}
    />
  );
};
export default ResetAllButton;

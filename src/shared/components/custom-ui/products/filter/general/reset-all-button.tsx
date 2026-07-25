'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';
import { FILTER_PARAM_KEYS } from '@/shared/constants/filter.constants';

const ResetAllButton = () => {
  const t = useTranslations('products.filter');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasActiveFilters = FILTER_PARAM_KEYS.some((key) => searchParams.has(key));

  if (!hasActiveFilters) return null;

  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());
    FILTER_PARAM_KEYS.forEach((key) => params.delete(key));
    params.set('page', '1');

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <Button
      variant="secondary"
      buttonVariant="text"
      title="products.filter.resetAll.title"
      leftIcon={<RotateCcw className="size-4.5" />}
      onClick={handleReset}
      className="w-full"
    />
  );
};
export default ResetAllButton;

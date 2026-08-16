'use client';

import { useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { InputGroup, InputGroupInput } from '@/shared/components/ui/input-group';
import ResetButton from '../general/reset-button';
import { DEFAULT_MIN, DEFAULT_MAX, DEBOUNCE_MS } from '@/shared/constants/filter.constants';

const PriceFilter = () => {
  // Translation
  const t = useTranslations('products.filter.price');

  // State
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlMinPrice = searchParams.get('minPrice') ?? '';
  const urlMaxPrice = searchParams.get('maxPrice') ?? '';

  const [minPrice, setMinPrice] = useState(urlMinPrice);
  const [maxPrice, setMaxPrice] = useState(urlMaxPrice);

  const [prevUrlMinPrice, setPrevUrlMinPrice] = useState(urlMinPrice);
  const [prevUrlMaxPrice, setPrevUrlMaxPrice] = useState(urlMaxPrice);

  if (urlMinPrice !== prevUrlMinPrice) {
    setPrevUrlMinPrice(urlMinPrice);
    setMinPrice(urlMinPrice);
  }

  if (urlMaxPrice !== prevUrlMaxPrice) {
    setPrevUrlMaxPrice(urlMaxPrice);
    setMaxPrice(urlMaxPrice);
  }

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Functions
  const pushPrice = (nextMin: string, nextMax: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextMin) {
      params.set('minPrice', nextMin);
    } else {
      params.delete('minPrice');
    }

    if (nextMax) {
      params.set('maxPrice', nextMax);
    } else {
      params.delete('maxPrice');
    }

    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const scheduleDebouncedPush = (nextMin: string, nextMax: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => pushPrice(nextMin, nextMax), DEBOUNCE_MS);
  };

  const isBound = (value: string) => value !== '' && Number(value) !== 0;

  const handleMinChange = (value: string) => {
    if (isBound(value) && isBound(maxPrice) && Number(value) > Number(maxPrice)) {
      return;
    }

    setMinPrice(value);
    scheduleDebouncedPush(value, maxPrice);
  };

  const handleMaxChange = (value: string) => {
    if (isBound(value) && isBound(minPrice) && Number(value) < Number(minPrice)) {
      return;
    }

    setMaxPrice(value);
    scheduleDebouncedPush(minPrice, value);
  };

  return (
    <div className="w-full pt-2.5 pb-5 border-b border-border-muted">
      <div className="flex justify-between items-center">
        <h3 className="text-text-plain font-semibold text-lg">{t('title')}</h3>
        <ResetButton paramKeys={['minPrice', 'maxPrice']} />
      </div>

      <div className="mt-3 flex gap-3">
        <div className="flex flex-col gap-1.5 flex-1">
          <label htmlFor="minPrice" className="text-sm text-text-plain font-medium">
            {t('from')}
          </label>
          <InputGroup className="h-12.25 rounded-xl border-border-soft bg-bg-plain">
            <InputGroupInput
              id="minPrice"
              type="number"
              min={0}
              inputMode="numeric"
              placeholder={String(DEFAULT_MIN)}
              value={minPrice}
              onChange={(e) => handleMinChange(e.target.value)}
            />
          </InputGroup>
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <label htmlFor="maxPrice" className="text-sm text-text-plain font-medium">
            {t('to')}
          </label>
          <InputGroup className="h-12.25 rounded-xl border-border-soft bg-bg-plain">
            <InputGroupInput
              id="maxPrice"
              type="number"
              min={0}
              inputMode="numeric"
              placeholder={String(DEFAULT_MAX)}
              value={maxPrice}
              onChange={(e) => handleMaxChange(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;

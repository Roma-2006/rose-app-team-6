'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { InputGroup, InputGroupInput } from '@/shared/components/ui/input-group';
import ResetButton from '../general/reset-button';
import { DEFAULT_MIN, DEFAULT_MAX, DEBOUNCE_MS } from '@/shared/constants/filter.constants';

const PriceFilter = () => {
  const t = useTranslations('products.filter.price');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlMinPrice = searchParams.get('minPrice') ?? '';
  const urlMaxPrice = searchParams.get('maxPrice') ?? '';

  const [minPrice, setMinPrice] = useState(urlMinPrice);
  const [maxPrice, setMaxPrice] = useState(urlMaxPrice);

  // track the last URL values we've synced from, so we can tell
  // "the URL changed externally" apart from "we're just re-rendering"
  const [syncedMin, setSyncedMin] = useState(urlMinPrice);
  const [syncedMax, setSyncedMax] = useState(urlMaxPrice);

  // adjust state during render instead of in an effect, per React's guidance
  if (urlMinPrice !== syncedMin) {
    setSyncedMin(urlMinPrice);
    setMinPrice(urlMinPrice);
  }
  if (urlMaxPrice !== syncedMax) {
    setSyncedMax(urlMaxPrice);
    setMaxPrice(urlMaxPrice);
  }

  const pushPrice = (nextMin: string, nextMax: string) => {
    const params = new URLSearchParams(searchParams.toString());

    nextMin ? params.set('minPrice', nextMin) : params.delete('minPrice');
    nextMax ? params.set('maxPrice', nextMax) : params.delete('maxPrice');
    params.set('page', '1');

    const nextUrl = `${pathname}?${params.toString()}`;
    setSyncedMin(nextMin);
    setSyncedMax(nextMax);
    router.push(nextUrl, { scroll: false });
  };

  const handleMinChange = (value: string) => {
    setMinPrice(value);
    scheduleDebouncedPush(value, maxPrice);
  };

  const handleMaxChange = (value: string) => {
    setMaxPrice(value);
    scheduleDebouncedPush(minPrice, value);
  };

  // simple debounce without an effect: a ref-held timer
  const debounceRef = useDebounceRef();
  const scheduleDebouncedPush = (nextMin: string, nextMax: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => pushPrice(nextMin, nextMax), DEBOUNCE_MS);
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
              onChange={(e) => setMinPrice(e.target.value)}
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
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>
    </div>
  );
};
function useDebounceRef() {
  const ref = useState<{ current: ReturnType<typeof setTimeout> | null }>(() => ({
    current: null,
  }))[0];
  return ref;
}

export default PriceFilter;

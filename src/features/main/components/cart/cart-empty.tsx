'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function CartEmptyState() {
  const t = useTranslations('cart');

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-border-plain rounded-2xl bg-background my-6 min-h-75">
      <div className="relative h-60 w-62 mb-4">
        <Image
          src="/assets/images/nocart.png"
          alt={t('empty') || 'Your cart is empty'}
          fill
          className="object-contain"
          priority
        />
      </div>

      <p className="text-sm font-medium text-text-muted">
        {t('empty') || 'Your cart is empty, wanna try shopping?'}
      </p>
    </div>
  );
}

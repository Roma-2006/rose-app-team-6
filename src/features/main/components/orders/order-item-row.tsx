'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useProductDetails } from '../../hooks/use-product-details';
import { OrderItem } from '../../types/order';

interface OrderItemRowProps {
  item: OrderItem;
}

export function OrderItemRow({ item }: OrderItemRowProps) {
  const t = useTranslations('orders');

  const { product, quantity, price } = item;

  const { data } = useProductDetails(product.id);

  const productDetails = data?.payload?.product;

  return (
    <div className="flex items-start gap-4 rounded-lg bg-bg-subtle">
      <div className="relative h-36 w-28 shrink-0 overflow-hidden rounded-md border border-bg-muted">
        <Image src={product.cover} alt={product.title} fill className="object-cover" />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <h4 className="font-semibold text-primary">{product.title}</h4>

        {productDetails && (
          <div className="flex items-center gap-1 text-sm text-text-muted">
            <Star className="fill-yellow-400 text-yellow-400" size={14} />

            <span>
              {t('rating')}: {productDetails.rating}/5 (
              <span className="text-blue-600">
                {productDetails.ratings} {t('ratingsCount')}
              </span>
              )
            </span>
          </div>
        )}

        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-sm text-text-muted">(x{quantity})</span>

          <span className="text-lg font-bold text-text-primary">
            {Number(price).toLocaleString()}
          </span>

          <span className="text-sm text-text-muted">{t('currency')}</span>
        </div>
      </div>
    </div>
  );
}

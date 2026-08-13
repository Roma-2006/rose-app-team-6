import Image from 'next/image';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { OrderItem } from '../../types/order';

interface OrderItemRowProps {
  item: OrderItem;
}

export function OrderItemRow({ item }: OrderItemRowProps) {
  const t = useTranslations('orders');

  const { product, quantity, price, productDetails } = item;
  return (
    <div className="flex items-start gap-4 rounded-lg bg-bg-subtle">
      <div className="relative h-36 w-28 shrink-0 overflow-hidden rounded-md border border-bg-muted">
        <Image src={product.cover} alt={product.title} fill className="object-cover" />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <h4 className="font-semibold text-primary">{product.title}</h4>

        {productDetails && (
          <div className="flex items-center gap-1 text-base text-text-muted">
            <Star className="fill-text-warning text-text-warning" size={14} />

            <span className="text-text-plain">
              {t('rating')}: {productDetails.rating}/5 (
              <span className="text-text-info">
                {productDetails.ratings} {t('ratingsCount')}
              </span>
              )
            </span>
          </div>
        )}

        <div className="mt-8 flex items-baseline gap-2">
          <span className="text-sm text-text-primary">(x{quantity})</span>

          <span className="text-lg font-bold text-text-plain">
            {Number(price).toLocaleString()}
          </span>

          <span className="text-sm text-text-plain">{t('currency')}</span>
        </div>
      </div>
    </div>
  );
}

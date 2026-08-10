import Image from 'next/image';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { OrderItem } from '../types/order';

interface OrderItemRowProps {
  item: OrderItem;
}

export function OrderItemRow({ item }: OrderItemRowProps) {
  const t = useTranslations('orders');

  const { product, quantity, price } = item;

  return (
    <div className="flex items-start gap-4 border-b border-bg-muted p-4 last:border-b-0">
      <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-md border border-bg-muted">
        <Image src={product.cover} alt={product.title} fill className="object-cover" />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <h4 className="font-medium text-text-primary">{product.title}</h4>

        <div className="flex items-center gap-1 text-sm text-text-muted">
          <Star className="fill-yellow-400 text-yellow-400" size={14} />

          <span>
            {t('rating')}: {product.rating}/5 ({product.ratings} {t('ratingsCount')})
          </span>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-sm text-text-muted">x{quantity}</span>

          <span className="text-lg font-bold text-text-primary">
            {Number(price).toLocaleString()} {t('currency')}
          </span>
        </div>
      </div>
    </div>
  );
}

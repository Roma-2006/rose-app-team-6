'use client';

import Image from 'next/image';
import { Star, Trash2 } from 'lucide-react';
import QuantityStepper from './quantity-stepper';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';
export interface CartItemType {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  ratingCount: number;
  quantity: number;
  maxStock: number;
}

interface CartItemRowProps {
  item: CartItemType;
  onUpdateQuantity?: (id: string, newQty: number) => void;
  onRemove?: (id: string) => void;
}

export default function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  const t = useTranslations('cart');
  const isOutOfStock = item.maxStock === 0;

  const handleUpdateQuantity = (nextQuantity: number) => {
    // Clamp at the update boundary so persisted state never contains a
    // quantity below 1 or above the product's actual stock.
    const safeQuantity = Math.min(Math.max(nextQuantity, 1), item.maxStock);
    onUpdateQuantity?.(item.id, safeQuantity);
  };

  return (
    <div className="flex items-center gap-4 border-b border-border-plain py-4 w-full">
      {/* Product Image */}
      <div className="relative  h-35 w-29  shrink-0 overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={item.image || '/placeholder.png'}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col justify-between flex-1 gap-10">
        <div className="flex items-start justify-between w-full">
          <div className="space-y-1">
            <h3 className="font-semibold text-text-primary text-base leading-tight">
              {item.title}
            </h3>
            <div className="flex items-center gap-1 text-xs">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="font-medium text-text-plain">
                {t('rating')}: {item.rating}/5
              </span>
              <span className="text-blue-500 font-normal">
                ({item.ratingCount} {t('ratings')})
              </span>
            </div>
          </div>

          {/* Remove Button */}
          <Button
            variant="outline"
            buttonVariant="icon"
            iconOnly={<Trash2 className="h-3.5 w-3.5" />}
            className="px-3 py-3 bg-bg-danger hover:bg-bg-danger-saturated text-white border-none rounded-lg text-xs font-medium transition-colors shadow-sm"
            onClick={() => onRemove?.(item.id)}
          >
            <span>{t('remove')}</span>
          </Button>
        </div>

        {/* Pricing and Stepper */}
        <div className="flex items-center justify-between w-full pt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-text-primary font-medium">(x{item.quantity})</span>
            <span className="text-lg font-bold text-text-plain">
              {(item.price * item.quantity).toFixed(2)}
            </span>
            <span className="text-xs font-bold text-text-plain">EGP</span>
            {isOutOfStock && (
              <span className="text-xs text-text-danger font-semibold ms-2">{t('outOfStock')}</span>
            )}
          </div>

          <QuantityStepper
            quantity={item.quantity}
            maxStock={item.maxStock}
            disabled={isOutOfStock}
            onIncrement={() => handleUpdateQuantity(item.quantity + 1)}
            onDecrement={() => handleUpdateQuantity(item.quantity - 1)}
          />
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { OrderItemRow } from './order-item-row';
import { OrderItem } from '../../types/order';
import { Button } from '@/shared/components/ui/button';

interface OrderItemsContainerProps {
  items: OrderItem[];
}

const FULLY_VISIBLE_COUNT = 2;

export function OrderItemsContainer({ items }: OrderItemsContainerProps) {
  const t = useTranslations('orders');

  const [isExpanded, setIsExpanded] = useState(false);

  const hasHiddenItems = items.length > FULLY_VISIBLE_COUNT;

  return (
    <div className="flex flex-col rounded-2xl bg-bg-plain">
      <div
        className={`relative grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 ${
          !isExpanded ? 'max-h-62 overflow-hidden' : ''
        }`}
      >
        {items.map((item) => (
          <div key={item.id} className="relative">
            <OrderItemRow item={item} />
          </div>
        ))}

        {!isExpanded && hasHiddenItems && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20
              bg-gradient-to-b from-transparent via-bg-plain/70 to-bg-plain"
          />
        )}
      </div>

      {hasHiddenItems && (
        <Button
          type="button"
          variant="ghost"
          buttonVariant="text"
          onClick={() => setIsExpanded((previous) => !previous)}
          title={isExpanded ? t('showLess') : t('showAll')}
          rightIcon={isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          className="w-full py-4 font-medium text-text-primary"
        />
      )}
    </div>
  );
}

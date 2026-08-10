'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { OrderItem } from '../types/order';
import { OrderItemRow } from './order-item-row';
import { cn } from '@/shared/lib/utils/tailwind-cn';

interface OrderItemsContainerProps {
  items: OrderItem[];
}

export function OrderItemsContainer({ items }: OrderItemsContainerProps) {
  const t = useTranslations('orders');

  const [isExpanded, setIsExpanded] = useState(false);

  const hasMultipleItems = items.length > 1;

  const visibleItems = isExpanded ? items : items.slice(0, 2);

  return (
    <div className="flex flex-col">
      <div className="relative flex flex-col">
        {visibleItems.map((item, index) => {
          const isSecondItem = !isExpanded && index === 1;

          return (
            <div
              key={item.id}
              className={cn(
                'relative transition-all duration-300',
                isSecondItem && 'max-h-24 overflow-hidden'
              )}
            >
              <OrderItemRow item={item} />

              {isSecondItem && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-white via-white/80 to-transparent" />
              )}
            </div>
          );
        })}
      </div>

      {hasMultipleItems && (
        <button
          type="button"
          onClick={() => setIsExpanded((previous) => !previous)}
          className="flex items-center justify-center gap-2 py-4 font-medium text-primary hover:underline"
        >
          {isExpanded ? t('showLess') : t('showAll')}

          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      )}
    </div>
  );
}

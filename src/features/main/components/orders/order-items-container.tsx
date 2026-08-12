'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { OrderItemRow } from './order-item-row';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import { OrderItem } from '../../types/order';

interface OrderItemsContainerProps {
  items: OrderItem[];
}

const COLLAPSED_COUNT = 4;
const FULLY_VISIBLE_COUNT = 2;

export function OrderItemsContainer({ items }: OrderItemsContainerProps) {
  const t = useTranslations('orders');

  const [isExpanded, setIsExpanded] = useState(false);

  const hasHiddenItems = items.length > FULLY_VISIBLE_COUNT;

  const visibleItems = isExpanded ? items : items.slice(0, COLLAPSED_COUNT);

  return (
    <div className="flex flex-col bg-bg-plain rounded-2xl">
      <div className="relative grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
        {visibleItems.map((item, index) => {
          const isFadedPreview = !isExpanded && index >= FULLY_VISIBLE_COUNT;

          return (
            <div
              key={item.id}
              className={cn(
                'relative transition-all duration-300',
                isFadedPreview && 'pointer-events-none opacity-40'
              )}
            >
              <OrderItemRow item={item} />
            </div>
          );
        })}

        {!isExpanded && hasHiddenItems && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 " />
        )}
      </div>

      {hasHiddenItems && (
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

'use client';

// lib
import { cn } from '@/shared/lib/utils/tailwind-cn';

// icons
import { Phone } from 'lucide-react';

// relatives
import { AddressListItemProps } from '@/features/main/types/address.d';

const AddressListItem = ({ address, isSelected, onSelect }: AddressListItemProps) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={() => onSelect(address.id)}
      className={cn(
        'w-full min-h-22.75 flex gap-1.5 justify-between items-center rounded-2xl px-4 py-3 text-start transition-colors',
        isSelected ? 'bg-bg-primary-saturated' : 'bg-bg-plain border border-border-soft'
      )}
    >
      <div>
        <h2
          className={cn(
            'font-semibold text-2xl',
            isSelected ? 'text-text-inverse' : 'text-text-plain'
          )}
        >
          {address.city}
        </h2>

        <p
          className={cn(
            'text-[16px] font-medium rounded-2xl py-1 px-3 w-fit',
            isSelected ? 'text-text-plain bg-bg-muted' : 'text-text-inverse bg-bg-inverse'
          )}
        >
          {address.street}
        </p>
      </div>

      {address.phone && (
        <div className="flex gap-1.5 items-center shrink-0 self-start">
          <div
            className={cn(
              'w-7.5 h-7.5 rounded-full flex items-center justify-center',
              isSelected ? 'bg-bg-subtle' : 'bg-bg-primary-saturated'
            )}
          >
            <Phone
              size={20}
              className={cn(isSelected ? 'text-bg-primary-saturated' : 'text-bg-subtle')}
            />
          </div>

          <p
            className={cn(
              'text-lg font-medium',
              isSelected ? 'text-text-subtle' : 'text-text-default'
            )}
          >
            {address.phone}
          </p>
        </div>
      )}
    </button>
  );
};

export default AddressListItem;

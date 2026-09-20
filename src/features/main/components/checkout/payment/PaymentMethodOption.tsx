'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { PaymentMethod } from '@/features/main/types/payment';

interface PaymentMethodOptionProps {
  value: PaymentMethod;
  selectedValue: PaymentMethod | null;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  onChange: (value: PaymentMethod) => void;
}

export function PaymentMethodOption({
  value,
  selectedValue,
  title,
  description,
  image,
  imageAlt,
  onChange,
}: PaymentMethodOptionProps) {
  const isSelected = selectedValue === value;

  return (
    <label
      className={cn(
        'relative flex cursor-pointer flex-col items-center rounded-xl border border-bg-muted p-6',
        'transition-colors',
        isSelected ? 'bg-bg-subtle' : ''
      )}
    >
      <input
        type="radio"
        name="paymentMethod"
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        className="sr-only none "
      />

      <Image
        src={image}
        alt={imageAlt}
        width={120}
        height={100}
        className="mb-5 h-24 w-auto object-contain dark:invert"
      />

      <h3 className={cn('mb-1 text-2xl font-semibold', isSelected && ' text-bg-primary')}>
        {title}
      </h3>

      <p className="text-center text-sm text-text-soft">{description}</p>
    </label>
  );
}

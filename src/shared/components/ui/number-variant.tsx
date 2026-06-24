'use client';

import { cn } from '@/lib/utils';
import { Triangle } from 'lucide-react';
import React from 'react';

interface NumberVariantProps {
  isDisabled?: boolean;
  isError?: boolean;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  defaultValue?: number;
  onChange?: (value: number | undefined) => void;
  isRtl?: boolean;
}

export default function NumberVariant({
  isDisabled = false,
  isError = false,
  min,
  max,
  placeholder,
  step = 1,
  defaultValue,
  onChange,
  isRtl = false,
}: NumberVariantProps): React.JSX.Element {
  // Store Input Value

  const [value, setValue] = React.useState<string>(() => {
    if (defaultValue !== undefined && defaultValue !== null) {
      return defaultValue.toString();
    }
    return '';
  });

  const [isFocused, setIsFocused] = React.useState(false);

  // Handle float numbers
  const getDecimalPlaces = (num: number): number => {
    const parts = num.toString().split('.');
    return parts[1]?.length ?? 0;
  };
  // Handle Min and Max limitted
  const clampValue = (num: number) => {
    let clamped = num;
    if (min !== undefined && clamped < min) clamped = min;
    if (max !== undefined && clamped > max) clamped = max;
    return clamped;
  };
  //
  const formatValue = (num: number) => {
    const stepDecimals = getDecimalPlaces(step);
    const minDecimals = min !== undefined ? getDecimalPlaces(min) : 0;
    const precision = Math.max(stepDecimals, minDecimals);
    return parseFloat(num.toFixed(precision)).toString();
  };

  // Accept Only (digits, . , -)
  const handleInputChange = (newValue: string) => {
    if (isDisabled) return;
    const sanitized = newValue.replace(/[^0-9.-]/g, '');
    if ((sanitized.match(/\./g) || []).length > 1) return;
    if (sanitized.lastIndexOf('-') > 0) return;
    setValue(sanitized);

    const parsed = parseFloat(sanitized);
    if (!Number.isNaN(parsed)) {
      onChange?.(parsed);
    } else if (sanitized === '' || sanitized === '-') {
      onChange?.(undefined);
    }
  };
  // Handle up and down
  const handleStep = (direction: 'up' | 'down') => {
    if (isDisabled) return;
    const startPoint = min !== undefined ? min : 0;
    const current = value === '' || value === '-' ? startPoint : parseFloat(value);
    const change = direction === 'up' ? step : -step;
    const nextValue = current + change;
    const clamped = clampValue(nextValue);
    const formatted = formatValue(clamped);
    setValue(formatted);
    onChange?.(clamped);
  };

  // Handle keyboared buttons
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleStep('up');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleStep('down');
    }
  };

  // disabled input when it reach to min or max
  const numericValue = parseFloat(value);
  const isMinReached = min !== undefined && !Number.isNaN(numericValue) && numericValue <= min;
  const isMaxReached = max !== undefined && !Number.isNaN(numericValue) && numericValue >= max;

  return (
    <div
      className={cn(
        'relative inline-flex items-center rounded-lg border px-2 py-1 w-full h-9 transition-colors',
        isFocused
          ? 'border-border-primary  ring-0'
          : isError
            ? 'border-border-danger'
            : 'border-border-soft hover:border-border-defaul focus-within:border-border-primary ',
        isDisabled
          ? 'bg-bg-subtle text-text-muted border-border-subtle cursor-not-allowed pointer-events-none'
          : 'bg-bg-plain'
      )}
    >
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onFocus={() => !isDisabled && setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={isDisabled}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full min-w-0 bg-transparent outline-none text-base md:text-sm transition-colors',
          isRtl ? 'text-right pl-8 pr-1' : 'text-left pr-8 pl-1',
          isFocused
            ? 'border-border-primary bg-primary-fade ring-0'
            : isDisabled
              ? 'text-text-muted '
              : 'text-text-plain '
        )}
      />
      <div
        className={cn(
          'absolute top-1/2 -translate-y-1/2 flex flex-col gap-0.5',
          isRtl ? 'left-2' : 'right-2'
        )}
      >
        <button
          type="button"
          onClick={() => handleStep('up')}
          disabled={isDisabled || isMaxReached}
          className={cn(
            'text-text-muted hover:text-text-plain  transition-colors',
            (isDisabled || isMaxReached) && 'opacity-30 cursor-not-allowed'
          )}
        >
          <Triangle className="h-2.5 w-2.5 fill-current" />
        </button>
        <button
          type="button"
          onClick={() => handleStep('down')}
          disabled={isDisabled || isMinReached}
          className={cn(
            'text-text-muted  hover:text-text-plain  transition-colors rotate-180',
            (isDisabled || isMinReached) && 'opacity-30 cursor-not-allowed'
          )}
        >
          <Triangle className="h-2.5 w-2.5 fill-current" />
        </button>
      </div>
    </div>
  );
}

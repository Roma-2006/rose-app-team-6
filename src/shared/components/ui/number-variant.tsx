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
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  isRtl?: boolean;
  name?: string;
  id?: string;
}

const NumberVariant = React.forwardRef<HTMLInputElement, NumberVariantProps>(
  (
    {
      isDisabled = false,
      isError = false,
      min,
      max,
      placeholder,
      step = 1,
      value,
      onChange,
      onBlur,
      isRtl = false,
      ...props
    },
    ref
  ) => {
    const [localValue, setLocalValue] = React.useState<string>('');
    const isControlled = value !== undefined;
    const displayValue = isControlled ? String(value ?? '') : localValue;

    const [isFocused, setIsFocused] = React.useState(false);
    const internalInputRef = React.useRef<HTMLInputElement | null>(null);
    React.useImperativeHandle(ref, () => internalInputRef.current!);

    const triggerChange = (nextValue: string) => {
      if (!isControlled) setLocalValue(nextValue);

      if (internalInputRef.current) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set;
        nativeInputValueSetter?.call(internalInputRef.current, nextValue);

        const event = new Event('input', { bubbles: true });
        internalInputRef.current.dispatchEvent(event);
        onChange?.(event as unknown as React.ChangeEvent<HTMLInputElement>);
      }
    };

    const handleInputChange = (newValue: string) => {
      if (isDisabled) return;
      const sanitized = newValue.replace(/[^0-9.-]/g, '');
      if ((sanitized.match(/\./g) || []).length > 1) return;
      if (sanitized.lastIndexOf('-') > 0) return;
      triggerChange(sanitized);
    };

    const handleStep = (direction: 'up' | 'down') => {
      if (isDisabled) return;
      const current =
        displayValue === '' || displayValue === '-' ? (min ?? 0) : parseFloat(displayValue);
      const change = direction === 'up' ? step : -step;
      let nextValue = current + change;

      if (min !== undefined && nextValue < min) nextValue = min;
      if (max !== undefined && nextValue > max) nextValue = max;

      const stepDecimals = step.toString().split('.')[1]?.length ?? 0;
      const formatted = parseFloat(nextValue.toFixed(stepDecimals)).toString();
      triggerChange(formatted);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isDisabled) return;
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleStep('up');
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleStep('down');
      }
    };

    const numericValue = parseFloat(displayValue);
    const isMinReached = min !== undefined && !Number.isNaN(numericValue) && numericValue <= min;
    const isMaxReached = max !== undefined && !Number.isNaN(numericValue) && numericValue >= max;

    return (
      <div
        className={cn(
          'relative inline-flex items-center rounded-lg border py-1 w-full h-11.5 transition-colors bg-bg-plain overflow-hidden',
          isRtl ? 'ps-6 pe-3' : 'ps-3 pe-6',

          isFocused
            ? 'border-border-primary ring-0 bg-primary-fade'
            : isError
              ? 'border-border-danger bg-bg-plain'
              : 'border-border-soft hover:border-border-default focus-within:border-border-primary',
          isDisabled && 'bg-bg-subtle text-text-muted border-border-subtle cursor-not-allowed'
        )}
      >
        <input
          type="text"
          inputMode="decimal"
          value={displayValue}
          ref={internalInputRef}
          onFocus={() => !isDisabled && setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          disabled={isDisabled}
          placeholder={placeholder}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          className={cn(
            'w-full min-w-0 ps-0 pe-2 bg-transparent border-none outline-none text-base md:text-sm text-text-plain focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 text-start',
            isRtl ? 'ps-2 pe-0' : 'ps-0 pe-2',

            isDisabled && 'text-text-muted placeholder:text-text-subtle'
          )}
          {...props}
        />
        <div
          className={cn(
            'absolute top-1/2  -translate-y-1/2 flex flex-col gap-0.5 z-10',
            isRtl ? 'left-2.5' : 'right-2.5'
          )}
        >
          <button
            type="button"
            onClick={() => handleStep('up')}
            disabled={isDisabled || isMaxReached}
            className={cn(
              'text-text-muted hover:text-text-plain transition-colors',
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
              'text-text-muted hover:text-text-plain transition-colors rotate-180',
              (isDisabled || isMinReached) && 'opacity-30 cursor-not-allowed'
            )}
          >
            <Triangle className="h-2.5 w-2.5 fill-current" />
          </button>
        </div>
      </div>
    );
  }
);
NumberVariant.displayName = 'NumberVariant';
export default NumberVariant;

'use client';

import * as React from 'react';
import { OTPInput, type SlotProps } from 'input-otp';
import { MinusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OTPVariantProps extends Omit<
  React.ComponentProps<typeof OTPInput>,
  'render' | 'onChange' | 'maxLength' | 'children'
> {
  isError?: boolean;
  isDisabled?: boolean;
  onChange?: (value: string) => void;
}

export default function OTPVariant({
  isError = false,
  isDisabled = false,
  className,
  containerClassName,
  onChange,
  defaultValue,
  ...props
}: OTPVariantProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [isFocused, setIsFocused] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = React.useState<React.CSSProperties>({ opacity: 0 });

  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateIndicator = React.useCallback(() => {
    if (!containerRef.current || isDisabled || isError || !isFocused || activeIndex === null) {
      setIndicatorStyle({ opacity: 0 });
      return;
    }

    const slots = containerRef.current.querySelectorAll('[data-slot="input-otp-slot-item"]');
    const targetSlot = slots[activeIndex] as HTMLElement;

    if (targetSlot) {
      setIndicatorStyle({
        transform: `translate(${targetSlot.offsetLeft}px, ${targetSlot.offsetTop}px)`,
        width: `${targetSlot.offsetWidth}px`,
        height: `${targetSlot.offsetHeight}px`,
        opacity: 1,
      });
    }
  }, [activeIndex, isFocused, isDisabled, isError]);

  React.useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  React.useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isDisabled) return;
    const slots = containerRef.current.querySelectorAll('[data-slot="input-otp-slot-item"]');
    let foundIndex: number | null = null;

    slots.forEach((slot, index) => {
      const rect = slot.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        foundIndex = index;
      }
    });
    setHoveredIndex(foundIndex);
  };

  const handleContainerClick = () => {
    if (isDisabled) return;
    inputRef.current?.focus();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full cursor-text"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIndex(null)}
      onClick={handleContainerClick}
    >
      {!isDisabled && !isError && isFocused && activeIndex !== null && (
        <div
          style={indicatorStyle}
          className="absolute top-0 left-0 rounded-lg border border-border-primary pointer-events-none transition-all duration-200 ease-out z-10 bg-transparent"
        />
      )}

      <OTPInput
        ref={inputRef}
        maxLength={6}
        disabled={isDisabled}
        onChange={(value) => {
          onChange?.(value);

          if (value.length < 6) {
            setActiveIndex(value.length);
          } else {
            setActiveIndex(null);
          }
        }}
        defaultValue={defaultValue}
        pattern="^[0-9]*$"
        spellCheck={false}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        containerClassName={cn(
          'flex items-center gap-2 has-disabled:opacity-50 w-full justify-between',
          containerClassName
        )}
        className={cn(
          'absolute inset-0 z-0 w-full h-full opacity-0 pointer-events-none disabled:cursor-not-allowed placeholder:text-text-muted',
          className
        )}
        {...props}
        render={({ slots }: { slots: SlotProps[] }) => {
          return (
            <div className="flex items-center gap-1.5 w-full justify-between relative z-0">
              {slots.map((slot, index) => {
                const isHovered = hoveredIndex === index;
                const showStaticHover = isHovered && index !== activeIndex;

                return (
                  <div
                    key={index}
                    data-slot="input-otp-slot-item"
                    className={cn(
                      'relative flex size-11 items-center justify-center text-base font-medium transition-colors outline-none rounded-lg border border-border-soft bg-bg-plain text-text-plain',
                      // تطبيق الـ Hover بشكل ثابت وفوري بدون أي أنيميشن انتقال مرئي بين الخانات
                      !isDisabled && !isError && showStaticHover && 'border-border-default',
                      isError && 'border-border-danger text-text-danger bg-bg-plain z-20',
                      isDisabled && 'border-border-subtle bg-bg-subtle text-text-muted opacity-50'
                    )}
                  >
                    {slot.char}
                    {slot.hasFakeCaret && isFocused && (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-20">
                        <div className="h-4 w-px animate-caret-blink bg-bg-primary duration-1000" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        }}
      />
    </div>
  );
}

export function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('', className)} {...props} />;
}

export function InputOTPSlot({
  className,
  ...props
}: React.ComponentProps<'div'> & { index: number }) {
  return <div className={cn('', className)} {...props} />;
}

export function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-otp-separator"
      className="flex items-center justify-center px-1"
      role="separator"
      {...props}
    >
      <MinusIcon className="size-4 text-text-muted" />
    </div>
  );
}

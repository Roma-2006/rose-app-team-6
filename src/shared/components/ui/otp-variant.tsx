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
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isDisabled) return;

    const slots = containerRef.current.querySelectorAll('[data-slot="input-otp-slot-item"]');
    let foundIndex: number | null = null;

    slots.forEach((slot, index) => {
      const rect = slot.getBoundingClientRect();
      // التحقق مما إذا كان مؤشر الفأرة يقع تماماً داخل حدود هذه الخانة بمفردها
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

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <OTPInput
        maxLength={6}
        disabled={isDisabled}
        onChange={onChange}
        defaultValue={defaultValue}
        pattern="^[0-9]*$"
        spellCheck={false}
        containerClassName={cn(
          'flex items-center gap-2 has-disabled:opacity-50 w-full justify-between',
          containerClassName
        )}
        className={cn(
          'absolute inset-0 z-20 w-full h-full opacity-0 cursor-text disabled:cursor-not-allowed',
          className
        )}
        {...props}
        render={({ slots }: { slots: SlotProps[] }) => (
          <div className="flex items-center gap-1.5 w-full justify-between relative">
            {slots.map((slot, index) => {
              const isActive = slot.isActive; // حالة الـ Focus للخانة النشطة
              const isHovered = hoveredIndex === index; // حالة الـ Hover الفردية لهذه الخانة فقط

              return (
                <div
                  key={index}
                  data-slot="input-otp-slot-item"
                  className={cn(
                    'relative flex size-11 items-center justify-center text-base font-medium transition-all outline-none rounded-lg border border-border-subtle bg-bg-plain text-text-plain  pointer-events-none',

                    !isDisabled && !isError && isHovered && 'border-border-default ',

                    !isDisabled && !isError && isActive && 'border-border-primary  z-10',

                    isError && 'border-border-danger text-text-danger',
                    isDisabled && 'border-border-subtle bg-bg-subtle text-text-muted'
                  )}
                >
                  {slot.char}
                  {slot.hasFakeCaret && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="h-4 w-px animate-caret-blink bg-bg-primary  duration-1000" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
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

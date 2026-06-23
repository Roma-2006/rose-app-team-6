'use client';

import * as React from 'react';
import { OTPInput, type SlotProps } from 'input-otp';
import { MinusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OTPVariantProps extends Omit<
  React.ComponentProps<typeof OTPInput>,
  'render' | 'onChange' | 'maxLength'
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
  // تتبع الـ index للخانة التي يقف عليها الماوس (Hover) حالياً بشكل منفرد
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // دالة رياضية تحسب مكان الفأرة وتحدد الخانة الحالية بدقة لتفعيل الـ Hover الفردي
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
      onMouseLeave={() => setHoveredIndex(null)} // تصفير الـ hover عند خروج الفأرة تماماً
    >
      <OTPInput
        maxLength={6} // تطبيق شرط نطاق الـ 6 خانات بشكل صارم
        disabled={isDisabled}
        onChange={onChange}
        defaultValue={defaultValue}
        pattern="^[0-9]*$"
        spellCheck={false}
        containerClassName={cn(
          'flex items-center gap-2 has-disabled:opacity-50 w-full justify-between',
          containerClassName
        )}
        // تمديد الحقل المخفي فوق الخانات لاستقبال الـ Focus والكتابة 100%
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
                    // 1. الحالة العادية: إطار رمادي zinc-200 وحواف دائرية منفصلة وحجم متناسق (size-11)
                    'relative flex size-11 items-center justify-center text-base font-medium transition-all outline-none rounded-lg border border-zinc-200 dark:bg-zinc-700/30 text-zinc-800 dark:text-zinc-50 pointer-events-none',

                    // 2. الـ Hover يعمل على كل خانة بمفردها وبشكل مستقل تماماً
                    !isDisabled && !isError && isHovered && 'border-zinc-300 dark:border-zinc-500',

                    // 3. الـ Focus باللون العنابي للخانة النشطة (ويلغي تأثير الـ Hover عليها أثناء الكتابة)
                    !isDisabled &&
                      !isError &&
                      isActive &&
                      'border-maroon-600 dark:border-soft-pink-400 z-10',

                    // 4. ألوان حالات الخطأ والتعطيل الممررة من الـ CustomInput
                    isError && 'border-red-600 dark:border-red-500 text-red-600',
                    isDisabled &&
                      'border-zinc-100 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 text-zinc-400'
                  )}
                >
                  {slot.char}
                  {slot.hasFakeCaret && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="h-4 w-px animate-caret-blink bg-maroon-600 dark:bg-soft-pink-400 duration-1000" />
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

// المكونات التصديرية الفرعية المساعدة للحفاظ على التوافقية ومنع أخطاء الاستدعاء الخارجية
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
      <MinusIcon className="size-4 text-muted-foreground" />
    </div>
  );
}

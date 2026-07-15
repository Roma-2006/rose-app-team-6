'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils/tailwind-cn';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  showCount?: boolean;
  maxLength?: number;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, showCount, maxLength, error, value, onChange, ...props }, ref) => {
    // Translation
    const t = useTranslations('common.textarea');

    // Ref
    // (Passed through to the underlying <textarea />)

    // Variables (Derived)
    const count = typeof value === 'string' ? value.length : 0;

    // Functions
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);
    };

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <div className="relative w-full">
          <textarea
            ref={ref}
            value={value}
            maxLength={maxLength}
            onChange={handleChange}
            aria-invalid={!!error}
            className={cn(
              'field-sizing-content min-h-24 w-full resize-none rounded-lg border border-border-soft bg-bg-plain px-3 py-3 text-sm outline-none transition-all',
              'hover:border-border-default focus-visible:border-border-primary focus-visible:ring-3 focus-visible:ring-ring-default',
              'aria-invalid:border-border-danger aria-invalid:ring-3 aria-invalid:ring-ring-danger',
              'disabled:bg-bg-muted disabled:text-text-muted disabled:cursor-not-allowed placeholder:text-text-muted',
              className
            )}
            {...props}
          />
          {showCount && maxLength && (
            <div className="mt-1 text-right text-xs text-text-muted">
              {t('charCount', { current: count, max: maxLength })}
            </div>
          )}
        </div>
        {error && <p className="text-text-danger text-xs">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };

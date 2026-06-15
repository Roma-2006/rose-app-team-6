'use client';

import * as React from 'react';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import { useTextarea } from '@/shared/hooks/use-textarea';
import { TextareaProps } from '@/shared/types/components';

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error,
      showCount,
      maxLength,
      value,
      onChange,
      charCountText = '{current}/{max}',
      ...props
    },
    ref
  ) => {
    const errorId = React.useId();

    const { formattedCharCount, isLimitReached } = useTextarea({
      value,
      maxLength,
      charCountText,
    });

    return (
      <div className="w-full space-y-1.5 text-start">
        <textarea
          ref={ref}
          data-slot="textarea"
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          className={cn(
            'flex field-sizing-content h-38 min-h-16 w-full resize-none rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-800 transition-all outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:bg-zinc-100 md:text-sm hover:border-zinc-400 focus-visible:border-maroon-600  focus-visible:ring-maroon-600/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-400 dark:disabled:bg-zinc-900 aria-invalid:border-red-600  aria-invalid:focus-visible:border-red-600',
            className
          )}
          {...props}
        />

        <div className="flex justify-between items-start ps-1 pe-1">
          {error ? (
            <p
              id={errorId}
              className="text-xs text-red-600 animate-in fade-in-0 slide-in-from-top-1"
            >
              {error}
            </p>
          ) : (
            <div />
          )}

          {showCount && maxLength && (
            <span
              className={cn(
                'text-xs transition-colors',
                isLimitReached ? 'text-red-600 font-bold' : 'text-zinc-500'
              )}
            >
              {formattedCharCount}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export { Textarea };

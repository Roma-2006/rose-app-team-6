'use client';

import * as React from 'react';
import { useMemo, useId, useRef, useEffect } from 'react';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import { TextareaProps } from '@/shared/types/components';

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error,
      showCount,
      autoResize = true,
      maxLength,
      value,
      onChange,
      label,
      charCountText = '{current}/{max}',
      ...props
    },
    forwardedRef
  ) => {
    const errorId = useId();
    const innerRef = useRef<HTMLTextAreaElement>(null);

    React.useImperativeHandle(forwardedRef, () => innerRef.current!);

    const adjustHeight = () => {
      if (autoResize && innerRef.current) {
        const textarea = innerRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    useEffect(() => {
      adjustHeight();
    }, [value, autoResize]);

    const currentLength = useMemo(() => (value ? String(value).length : 0), [value]);
    const isLimitReached = !!maxLength && currentLength >= maxLength;

    const formattedCharCount = useMemo(() => {
      if (!maxLength) return '';
      return charCountText
        .replace('{current}', currentLength.toString())
        .replace('{max}', maxLength.toString());
    }, [charCountText, currentLength, maxLength]);

    return (
      <div className="w-full space-y-1.5 text-start" dir="auto">
        {label && (
          <label className="text-sm font-medium px-1 text-zinc-700 dark:text-zinc-300">
            {label}
          </label>
        )}

        <textarea
          ref={innerRef}
          value={value}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => {
            onChange?.(e);
            adjustHeight();
          }}
          className={cn(
            'flex min-h-[80px] w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-800 transition-all outline-none md:text-sm dark:border-zinc-800 dark:bg-zinc-700 dark:text-zinc-50 dark:placeholder:text-zinc-400 hover:border-zinc-400 focus-visible:border-maroon-600 focus-visible:ring-2 focus-visible:ring-maroon-600/10 disabled:cursor-not-allowed disabled:bg-zinc-100 dark:disabled:bg-zinc-900',
            autoResize ? 'resize-none overflow-hidden' : 'resize-y',
            error && 'border-red-600 focus-visible:border-red-600 focus-visible:ring-red-600/10',
            className
          )}
          {...props}
        />

        <div className="flex justify-between items-start px-1 min-h-[20px]">
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
                'text-xs transition-colors tabular-nums',
                isLimitReached ? 'text-red-600 font-bold' : 'text-zinc-500 dark:text-zinc-400'
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

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
          <label className="text-sm text-foreground font-medium px-1 text-foreground">
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
            'flex min-h-[80px] w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground transition-all outline-none md:text-sm dark:border-border dark:bg-background dark:text-foreground dark:placeholder:text-muted-foreground hover:border-muted-foreground focus-visible:border-primary focus-visible:ring-primary/10 disabled:cursor-not-allowed disabled:bg-muted dark:disabled:bg-muted',
            autoResize ? 'resize-none overflow-hidden' : 'resize-y',
            error && 'border-error focus-visible:border-error ',
            className
          )}
          {...props}
        />

        <div className="flex justify-between items-start px-1 min-h-[20px]">
          {error ? (
            <p id={errorId} className="text-xs text-error animate-in fade-in-0 slide-in-from-top-1">
              {error}
            </p>
          ) : (
            <div />
          )}

          {showCount && maxLength && (
            <span
              className={cn(
                'text-xs transition-colors tabular-nums',
                isLimitReached ? 'text-error font-bold' : 'text-muted-foreground'
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

'use client';

import * as React from 'react';
import { cn } from '@/shared/lib/utils/tailwind-cn';

export interface TextareaProps extends React.ComponentProps<'textarea'> {
  error?: string;
  showCount?: boolean;
  charCountText?: string;
  currentCount?: number;
}

function Textarea({
  className,
  error,
  showCount,
  maxLength,
  value,
  defaultValue,
  onChange,
  charCountText = '{current}/{max} characters',
  currentCount = 0,
  id,
  ...props
}: TextareaProps) {
  const errorId = React.useId();

  const formattedCharCount = charCountText
    .replace('{current}', currentCount.toString())
    .replace('{max}', maxLength?.toString() || '0');

  return (
    <div className="w-full space-y-1.5 text-start">
      <textarea
        data-slot="textarea"
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        className={cn(
          'flex field-sizing-content h-38 min-h-16 w-full resize-none rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-800 transition-[color,box-shadow,background-color] outline-none placeholder:text-zinc-400 focus-visible:border-maroon-600 focus-visible:ring-maroon-600/30 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500 md:text-sm hover:border-zinc-400',
          'dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:disabled:bg-zinc-900',
          error && 'border-red-600  focus-visible:ring-red-600/30',
          className
        )}
        {...props}
      />

      <div className="flex justify-between items-start ps-1 pe-1">
        {error ? (
          <p
            id={errorId}
            className="text-xs text-destructive animate-in fade-in-0 slide-in-from-top-1"
          >
            {error}
          </p>
        ) : (
          <div />
        )}

        {showCount && maxLength && (
          <span className="text-xs text-muted-foreground transition-colors">
            {formattedCharCount}
          </span>
        )}
      </div>
    </div>
  );
}

export { Textarea };

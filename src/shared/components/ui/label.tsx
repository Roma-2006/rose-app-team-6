'use client';
//////// font inter
import * as React from 'react';

import { cn } from '@/shared/lib/utils/tailwind-cn';

function Label({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'label'> & { variant?: 'default' | 'checkbox' }) {
  return (
    <label
      data-slot="label"
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        variant === 'checkbox' && 'font-normal text-zinc-800 font-inter dark:text-zinc-50',
        className
      )}
      {...props}
    />
  );
}

export { Label };

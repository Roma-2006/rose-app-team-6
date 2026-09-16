import * as React from 'react';

// Lib
import { cn } from '@/shared/lib/utils/tailwind-cn';

function Breadcrumb({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav aria-label="breadcrumb" data-slot="breadcrumb" className={cn(className)} {...props} />
  );
}

export { Breadcrumb };

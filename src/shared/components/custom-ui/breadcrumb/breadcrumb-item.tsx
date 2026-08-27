import * as React from 'react';

// Lib
import { cn } from '@/shared/lib/utils/tailwind-cn';

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn('inline-flex items-center gap-1', className)}
      {...props}
    />
  );
}
export { BreadcrumbItem };

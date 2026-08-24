import * as React from 'react';

// Lib
import { cn } from '@/shared/lib/utils/tailwind-cn';

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('font-normal text-foreground', className)}
      {...props}
    />
  );
}
export { BreadcrumbPage };

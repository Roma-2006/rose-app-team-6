import * as React from 'react';

// Lib
import { cn } from '@/shared/lib/utils/tailwind-cn';

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        'flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}
export { BreadcrumbList };

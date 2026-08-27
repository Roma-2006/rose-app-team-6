import * as React from 'react';

// Lib
import { cn } from '@/shared/lib/utils/tailwind-cn';

// Relatives
import { MoreHorizontalIcon } from 'lucide-react';

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn('flex size-5 items-center justify-center [&>svg]:size-4', className)}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More</span>
    </span>
  );
}
export { BreadcrumbEllipsis };

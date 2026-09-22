import * as React from 'react';

// Lib
import { cn } from '@/shared/lib/utils/tailwind-cn';

// Relatives
import { ChevronRightIcon } from 'lucide-react';

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <ChevronRightIcon className="text-text-muted" size={16} />}
    </li>
  );
}
export { BreadcrumbSeparator };

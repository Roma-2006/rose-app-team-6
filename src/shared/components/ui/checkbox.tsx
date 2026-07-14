'use client';

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';

import { cn } from '@/shared/lib/utils/tailwind-cn';
import { CheckIcon } from 'lucide-react';

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'border border-border-primary bg-bg-plain focus-visible:ring-3 focus-visible:ring-ring-default  disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-border-danger     data-checked:bg-bg-primary  data-checked:text-text-inverse  peer relative flex size-5 shrink-0 items-center justify-center radius-lg  transition-shadow outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2  ',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="bg-bg-primary grid place-content-center text-text-inverse transition-none [&>svg]:size-4"
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };

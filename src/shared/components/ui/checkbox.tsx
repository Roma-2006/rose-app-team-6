'use client';

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';

import { cn } from '@/shared/lib/utils/tailwind-cn';
import { CheckIcon } from 'lucide-react';

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'border border-default  focus-visible:shadow-[0_0_0_3px_#741C2140] dark:focus-visible:shadow-[0_0_0_3px_#FF85A240]  disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-error     data-checked:bg-default  data-checked:text-background  peer relative flex size-5 shrink-0 items-center justify-center rounded-[8px]  transition-shadow outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2  ',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="bg-default grid place-content-center text-current transition-none [&>svg]:size-4"
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };

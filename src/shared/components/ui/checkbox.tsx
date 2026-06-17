'use client';

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';

import { cn } from '@/shared/lib/utils/tailwind-cn';
import { CheckIcon } from 'lucide-react';

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer relative flex size-5 shrink-0 items-center justify-center rounded-[8px] border border-maroon-700 dark:border-soft-pink-300 transition-shadow outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:shadow-[0_0_0_3px_#741C2140] dark:focus-visible:shadow-[0_0_0_3px_#FF85A240] dark:focus-visible:border-soft-pink-300 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-600    dark:aria-invalid:border-red-500 dark:bg-zinc-800  data-checked:bg-maroon-700 data-checked:text-white dark:data-checked:text-zinc-800 dark:data-checked:bg-soft-pink-300  ',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="bg-maroon-700 dark:bg-soft-pink-300 grid place-content-center text-current transition-none [&>svg]:size-4"
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };

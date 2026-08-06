import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils/tailwind-cn';

const badgeVariants = cva(
  'group/badge inline-flex w-fit min-h-6  rounded-full shrink-0 items-center justify-center gap-1 overflow-hidden  border border-transparent px-2 py-0.5 text-xs font-medium font-sans whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!',
  {
    variants: {
      variant: {
        primary: 'bg-bg-primary text-text-inverse hover:bg-bg-primary-saturated',
        secondary: 'bg-bg-secondary-faint text-text-primary hover:bg-bg-secondary-fade',
        subtle: 'bg-bg-soft text-text-plain hover:bg-bg-muted',
        //SoftPink-product
        softPink: 'bg-soft-pink-50  text-maroon-600 border-0 shadow-sm hover:bg-soft-pink-100',
        destructive: 'bg-bg-danger text-rose ',
        outline: 'border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
        ghost: 'hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

function Badge({
  className,
  variant,
  render,
  'aria-label': ariaLabel,
  'aria-live': ariaLive,
  'aria-hidden': ariaHidden,
  ...props
}: useRender.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    'aria-label'?: string;
    'aria-live'?: 'polite' | 'assertive' | 'off';
    'aria-hidden'?: boolean;
  }) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ variant }), className),
        role: ariaHidden ? 'presentation' : 'status',
        'aria-label': ariaLabel,
        'aria-live': ariaLive,
        'aria-hidden': ariaHidden,
      },
      props
    ),
    render,
    state: {
      slot: 'badge',
      variant,
    },
  });
}

export { Badge, badgeVariants };

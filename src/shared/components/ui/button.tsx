import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils/tailwind-cn';

const buttonVariants = cva(
  "disabled:bg-disabled disabled:text-disabled-foreground  group/button inline-flex shrink-0 items-center justify-center   border border-transparent bg-clip-padding text-base rounded-10 font-medium dark:font-semibold dark:text-sm whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none  aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground  hover:bg-primary-hover ',
        outline:
          'border border-outline bg-outline-bg text-outline hover:bg-outline-hover disabled:bg-muted disabled:border-muted-border disabled:text-muted-foreground  aria-expanded:bg-muted aria-expanded:text-foreground ',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary-hover   aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        subtle:
          'bg-subtle border border-subtle-border text-subtle-foreground hover:bg-subtle-hover disabled:bg-muted disabled:border-muted-border disabled:text-muted-foreground',
        ghost:
          ' text-subtle-foreground hover:bg-subtle-hover disabled:text-muted-foreground disabled:bg-subtle-hover   aria-expanded:bg-muted aria-expanded:text-foreground ',
        destructive: 'bg-error text-error-foreground hover:bg-error-hover',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        custom: 'h-11 w-45.25 gap-1.5',
        default:
          'h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5',
        xs: "h-6 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: 'h-8 gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        lg: 'h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        icon: 'size-9',
        'icon-xs': "size-6 [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant = 'primary',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

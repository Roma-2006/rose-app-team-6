import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils/tailwind-cn';
import { TButtonProps } from '@/shared/types/button';
import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const buttonVariants = cva(
  "disabled:bg-bg-soft  disabled:text-text-muted disabled:border-none group/button inline-flex shrink-0 items-center justify-center   border border-transparent bg-clip-padding text-base radius-lg font-medium dark:font-semibold dark:text-sm whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none  aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: 'bg-bg-primary text-text-inverse  hover:bg-bg-primary-saturated',
        outline:
          'border border-border-primary bg-bg-plain text-text-primary hover:bg-bg-primary-fade ',
        secondary: 'bg-bg-primary-fade text-text-primary  hover:bg-bg-primary-faint  ',
        subtle: 'bg-bg-muted border border-border-soft text-text-plain hover:bg-bg-soft ',
        ghost: ' text-text-plain hover:bg-bg-soft  ',
        destructive: 'bg-bg-danger text-text-inverse hover:bg-bg-danger-saturated',
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
  variant,
  loading,
  title,
  disabled,
  onClick,
  leftIcon,
  rightIcon,
  iconOnly,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants> & TButtonProps) {
  const t = useTranslations();
  return (
    <ButtonPrimitive
      data-slot="button"
      aria-busy={loading}
      aria-label={title ? t(title) : undefined}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(buttonVariants({ variant, size: iconOnly ? 'icon' : 'custom', className }))}
      {...props}
    >
      {loading && iconOnly ? (
        <LoaderCircle className="animate-spin" size={18} />
      ) : loading ? (
        <>
          {t('button.loading')}
          <LoaderCircle className="animate-spin" size={18} />
        </>
      ) : (
        <>
          {leftIcon}
          {!title ? iconOnly : t(title)}
          {rightIcon}
        </>
      )}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };

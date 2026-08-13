import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils/tailwind-cn';
// import { TButtonProps } from '@/shared/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { TButtonProps } from '@/shared/types/button';
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
        link: 'bg-bg-subtle border border-border-subtle text-text-plain',
        softPink: 'bg-soft-pink-50 text-maroon-600 hover:bg-soft-pink-100 shadow-sm border-none',
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
        number: 'w-8 h-8 p-2.5 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);
function Button(props: ButtonPrimitive.Props & VariantProps<typeof buttonVariants> & TButtonProps) {
  const t = useTranslations();
  const isIcon = props.buttonVariant === 'icon';
  const isText = props.buttonVariant === 'text';
  const isNumber = props.buttonVariant === 'number';
  const getDomProps = () => {
    if (isIcon) {
      const {
        className,
        variant,
        loading,
        title,
        disabled,
        onClick,
        iconOnly,
        buttonVariant,
        ...domProps
      } = props;
      return domProps;
    } else if (isText) {
      const {
        className,
        variant,
        loading,
        title,
        disabled,
        onClick,
        leftIcon,
        rightIcon,
        buttonVariant,
        ...domProps
      } = props;
      return domProps;
    } else if (isNumber) {
      const { className, variant, loading, disabled, onClick, buttonVariant, number, ...domProps } =
        props;
      return domProps;
    }
  };
  return (
    <ButtonPrimitive
      data-slot="button"
      aria-busy={props.loading}
      // aria-label={props.title ? t(props.title) : undefined}
      disabled={props.disabled || props.loading}
      onClick={props.onClick}
      // buttonVariant={buttonVariant}
      className={cn(
        buttonVariants({
          variant: props.variant,
          size: isIcon ? 'icon' : isText ? 'custom' : 'number',
          className: props.className,
        })
      )}
      {...getDomProps()}
    >
      {props.loading && isIcon ? (
        <LoaderCircle className="animate-spin" size={18} />
      ) : props.loading ? (
        <>
          {t('button.loading')}
          <LoaderCircle className="animate-spin" size={18} />
        </>
      ) : (
        <>
          {isText && props.leftIcon}
          {isIcon ? props.iconOnly : isText ? (props.children ?? t(props.title!)) : props.number}
          {isText && props.rightIcon}
        </>
      )}
    </ButtonPrimitive>
  );
}
export { Button, buttonVariants };

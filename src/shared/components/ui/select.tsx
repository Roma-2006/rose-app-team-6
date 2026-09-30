'use client';

import * as React from 'react';
import { Select as SelectPrimitive } from '@base-ui/react/select';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
const Select = SelectPrimitive.Root;

function SelectValue({ className, placeholder, ...props }: SelectPrimitive.Value.Props) {
  // Translation
  const t = useTranslations('common.select');
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      placeholder={placeholder ?? t('placeholder')}
      className={cn('flex flex-1 text-left ', className)}
      {...props}
    />
  );
}

function SelectTrigger({
  className,
  size = 'default',
  children,
  disabled,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: 'sm' | 'default';
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      disabled={disabled}
      className={cn(
        'group flex  w-fit items-center  text-text-plain justify-between gap-1.5 radius-xl w-full border border-border-soft bg-bg-plain px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow,background-color] outline-none  disabled:cursor-not-allowed disabled:opacity-50 ',
        'disabled:cursor-not-allowed text-zinc-400 bg-bg-muted',
        'aria-invalid:border-border-danger aria-invalid:ring-3 aria-invalid:ring-ring-danger',
        ' data-placeholder:text-text-muted data-[size=default]:h-12 data-[size=sm]:h-9 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5',
        'dark:bg-bg-plain dark:data-placeholder:text-text-muted dark:text-text-plain',
        'dark:focus-visible:border-border-soft dark:focus-visible:ring-border-soft',
        'dark:aria-invalid:border-border-danger dark:aria-invalid:ring-3 dark:aria-invalid:ring-ring-danger',
        className
      )}
      {...props}
    >
      {children}
      {!disabled && (
        <SelectPrimitive.Icon
          render={
            <ChevronDownIcon
              className={cn(
                'size-4 opacity-50 transition-transform duration-200',

                'group-data-[popup-open]:rotate-180'
              )}
            />
          }
        />
      )}
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  side = 'bottom',
  sideOffset = 6,

  ...props
}: SelectPrimitive.Popup.Props & {
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
}) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner side={side} sideOffset={sideOffset} alignItemWithTrigger={false}>
        <SelectPrimitive.Popup
          className={cn(
            'relative z-50 min-w-[var(--anchor-width)] overflow-hidden rounded-lg border border-border-soft bg-bg-plain  shadow-xl animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',

            className
          )}
          {...props}
        >
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn('px-3 py-2.5 text-xs text-text-default ', className)}
      {...props}
    />
  );
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        'relative flex w-full cursor-default items-center gap-2.5  py-2 pr-8 pl-3 text-sm text-text-plain font-normal outline-hidden   leading-none select-none',
        'focus:bg-bg-muted focus:text-text-plain',

        'data-[selected]:bg-bg-muted data-[selected]:text-text-primary data-[selected]:font-medium',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        ' dark:focus:bg-bg-muted dark:focus:text-text-plain dark:data-[selected]:bg-bg-muted dark:data-[selected]:text-text-primary',
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('pointer-events-none -mx-1.5 my-1.5 h-px bg-border', className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};

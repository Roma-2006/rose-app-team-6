'use client';

import * as React from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import { cn } from '@/shared/lib/utils/tailwind-cn';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/components/ui/input-group';
import { ChevronDownIcon, XIcon, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

function Combobox({ value, onValueChange, ...props }: ComboboxPrimitive.Root.Props<string>) {
  // Variables (Derived)
  const safeValue = value === '' ? null : value;

  // Functions
  return (
    <ComboboxPrimitive.Root
      {...props}
      value={safeValue}
      onValueChange={(val, details) => {
        onValueChange?.(val ?? '', details);
      }}
    />
  );
}

function ComboboxValue({
  className,
  placeholder,
  ...props
}: ComboboxPrimitive.Value.Props & { className?: string }) {
  return (
    <span
      className={cn(
        'text-sm font-normal text-text-plain',
        'group-data-[placeholder]:text-text-muted',
        className
      )}
    >
      <ComboboxPrimitive.Value placeholder={placeholder} {...props} />
    </span>
  );
}

function ComboboxTrigger({ className, children, ...props }: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      className={cn(
        'group flex h-12 w-full items-center justify-between gap-2 radius-xl border border-border-soft bg-bg-plain px-4 py-2 text-sm transition-all outline-none',
        'focus:ring-0',
        'data-placeholder:text-text-muted',
        'dark:data-placeholder:text-text-muted',
        'dark:bg-bg-plain dark:border border-border-soft dark:text-text-muted',
        'aria-invalid:border-border-danger aria-invalid:ring-3 aria-invalid:ring-ring-danger',
        'dark:aria-invalid:border-border-danger dark:aria-invalid:ring-3 dark:aria-invalid:ring-ring-danger',

        className
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.Icon>
        <ChevronDownIcon
          className={cn(
            'size-4 opacity-50 transition-transform duration-200',
            'group-data-[popup-open]:rotate-180'
          )}
        />
      </ComboboxPrimitive.Icon>
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <XIcon className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  );
}

function ComboboxSearchInput({ className, ...props }: ComboboxPrimitive.Input.Props) {
  const t = useTranslations('common.select');
  return (
    <div className="p-2">
      <ComboboxPrimitive.Input
        placeholder={t('search')}
        className={cn(
          'w-full h-10 rounded-lg border border-border-soft bg-bg-plain px-3 py-2 text-sm outline-none placeholder:text-text-muted',
          className
        )}
        {...props}
      />
    </div>
  );
}
function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
}) {
  return (
    <InputGroup className={cn('w-auto', className)}>
      <ComboboxPrimitive.Input render={<InputGroupInput disabled={disabled} />} {...props} />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            render={<ComboboxTrigger />}
            data-slot="input-group-button"
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            disabled={disabled}
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  );
}

function ComboboxContent({
  className,
  children,
  isLoading,
  side = 'bottom',
  sideOffset = 6,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props & {
  isLoading?: boolean;
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
  anchor?: React.RefObject<HTMLElement | null> | HTMLElement | null;
}) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        anchor={anchor}
        className="z-50"
      >
        <ComboboxPrimitive.Popup
          className={cn(
            'w-[var(--anchor-width)] min-w-[220px] overflow-hidden rounded-lg ',
            'border border-border-soft bg-bg-plain shadow-2xl outline-none',

            'dark:bg-bg-plain dark:border-border-soft ',
            className
          )}
          {...props}
        >
          {children}

          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="size-5 animate-spin text-text-muted" />
            </div>
          )}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}
function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      className={cn(
        ' no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1.5 overflow-y-auto overscroll-contain p-1.5 data-empty:p-0',

        className
      )}
      {...props}
    />
  );
}
function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      className={cn(
        'relative flex w-full cursor-pointer items-center gap-2.5 py-3 px-4 text-sm transition-colors outline-none',

        'data-[highlighted]:bg-bg-muted data-[highlighted]:text-text-plain',
        'dark:data-[highlighted]:bg-bg-muted dark:data-[highlighted]:text-text-plain',

        'data-[selected]:bg-bg-muted  data-[selected]:text-text-primary data-[selected]:font-medium',

        className
      )}
      {...props}
    >
      <span className="flex-1 truncate">{children}</span>
    </ComboboxPrimitive.Item>
  );
}

function ComboboxLabel({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn('px-3 py-2.5 text-xs text-text-muted', className)}
      {...props}
    />
  );
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  const t = useTranslations('common.select');
  return (
    <ComboboxPrimitive.Empty
      className={cn('py-6 text-center text-sm text-text-muted', className)}
      {...props}
    >
      {t('noOptions')}
    </ComboboxPrimitive.Empty>
  );
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxLabel,
  ComboboxEmpty,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxSearchInput,
  ComboboxPrimitive as ComboboxInputPrimitive,
};

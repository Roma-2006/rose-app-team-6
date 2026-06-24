"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"

import { cn } from "@/lib/utils/tailwind-cn"
import { Button } from "@/shared/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/shared/components/ui/input-group"
import { ChevronDownIcon, XIcon, CheckIcon, Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"


function Combobox({ value, onValueChange, ...props }: ComboboxPrimitive.Root.Props<string>) {
  const safeValue = value === "" ? null : value;

  return (
    <ComboboxPrimitive.Root
      {...props}
      value={safeValue}
       onValueChange={(val, details) => {
        onValueChange?.(val ?? "", details); 
      }}
    />
  );
}

function ComboboxValue({ className, placeholder, ...props }: any) {
  return (
    <span className={cn(
      "text-sm font-normal",
      "group-data-[placeholder]:text-text-muted", 
      className
    )}>
       <ComboboxPrimitive.Value placeholder={placeholder} {...props} />
    </span>
  )
}


function ComboboxTrigger({ className, children, ...props }: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      className={cn(
             "group flex h-12 w-full items-center justify-between gap-2 rounded-lg border border-border-soft bg-bg-plain px-4 py-2 text-sm transition-all outline-none",
        "focus:ring-0",
           "data-placeholder:text-text-muted", 
        "dark:data-placeholder:text-text-muted",
        "dark:bg-bg-plain dark:border border-border-soft dark:text-muted",
        "aria-invalid:border-border-danger aria-invalid:ring-3 aria-invalid:ring-ring-danger",
        "dark:aria-invalid:border-border-danger dark:aria-invalid:ring-3 dark:aria-invalid:ring-ring-danger",

        className
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.Icon>
              <ChevronDownIcon 
          className={cn(
            "size-4 opacity-50 transition-transform duration-200", // أضفنا transition و duration للنعومة
            "group-data-[popup-open]:rotate-180",
            
        
          )} 
        />

      </ComboboxPrimitive.Icon>
    </ComboboxPrimitive.Trigger>
  )
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
  )
}

function ComboboxSearchInput({ className, ...props }: any) {
    return (
      <div className="p-2 ">
        <ComboboxPrimitive.Input
          className={cn(
   "w-full h-10 rounded-lg border border-border-muted dark: border border-border-soft bg-bg-plain px-3 py-2 text-sm outline-none placeholder:text-text-muted dark:placeholder:text-text-muted ",
        
                 
               className
          )}
          {...props}
        />
      </div>
    )
}
function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
}) {
  return (
    <InputGroup className={cn("w-auto", className)}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
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
  )
}

function ComboboxContent({
  className,
  children,
  isLoading,
  side = "bottom", 
  sideOffset = 6, 

  anchor,
  ...props
}: any) {
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
               "w-[var(--anchor-width)] min-w-[220px] overflow-hidden rounded-lg ",
               "border border-border-soft bg-bg-plain shadow-2xl outline-none",
        
            "dark:bg-bg-plain dark:border-border-soft ",
            className
          )}
          {...props}
        >
          {children}
          
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            </div>
          )}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}
function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      className={cn(" no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1.5 overflow-y-auto overscroll-contain p-1.5 data-empty:p-0",

        className
      )}
      {...props}
    />
  )
}
function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      className={cn(
         "relative flex w-full cursor-pointer items-center gap-2.5 py-3 px-4 text-sm transition-colors outline-none",
      
     
        "data-[highlighted]:bg-bg-muted data-[highlighted]:text-text-plain", 
        "dark:data-[highlighted]:bg-bg-muted dark:data-[highlighted]:text-text-plain",

        "data-[selected]:bg-bg-muted  data-[selected]:text-text-primary data-[selected]:font-medium",
        
        className
      )}
      {...props}
    >
      <span className="flex-1 truncate">{children}</span>
   
    </ComboboxPrimitive.Item>
  )
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn(className)}
      {...props}
    />
  )
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn("px-3 py-2.5 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  )
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
    const t = useTranslations('common.select');
    return (
      <ComboboxPrimitive.Empty
        className={cn("py-6 text-center text-sm text-muted-foreground", className)}
        {...props}
      >
        {t('noOptions')}
      </ComboboxPrimitive.Empty>
    )
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("-mx-1.5 my-1.5 h-px bg-border", className)}
      {...props}
    />
  )
}

function ComboboxChips({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(
        "flex min-h-9 flex-wrap items-center gap-1.5 rounded-3xl border border-transparent bg-input/50 bg-clip-padding px-3 py-1.5 text-sm transition-[color,box-shadow,background-color] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30 has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 has-data-[slot=combobox-chip]:px-1.5 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "flex h-[calc(--spacing(5.5))] w-fit items-center justify-center gap-1 rounded-3xl bg-input px-2 text-xs font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0 dark:bg-input/60",
        className
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="ghost" size="icon-xs" />}
          className="-ml-1 opacity-50 hover:opacity-100"
          data-slot="combobox-chip-remove"
        >
          <XIcon className="pointer-events-none" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn("min-w-16 flex-1 outline-none", className)}
      {...props}
    />
  )
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}






export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
  ComboboxSearchInput,
  ComboboxPrimitive as ComboboxInputPrimitive
}

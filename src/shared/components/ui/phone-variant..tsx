'use client';

import * as React from 'react';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import * as RPNInput from 'react-phone-number-input';

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Input } from '@/shared/components/ui/input';
import flags from 'react-phone-number-input/flags';

type PhoneInputProps = Omit<React.ComponentProps<'input'>, 'onChange' | 'value' | 'ref'> & {
  isDisabled?: boolean;
  isError?: boolean;
  defaultValue?: number;
  isRtl?: boolean;
  placeholder?: string;
} & Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneVariant: React.ForwardRefExoticComponent<PhoneInputProps> = React.forwardRef<
  React.ElementRef<typeof RPNInput.default>,
  PhoneInputProps
>(({ className, onChange, isRtl, value, isError, isDisabled, ...props }, ref) => {
  return (
    <RPNInput.default
      ref={ref}
      disabled={isDisabled}
      className={cn(
        'flex w-full rounded-lg border transition-colors bg-bg-plain h-11.5 items-center',
        isRtl ? 'flex-row-reverse' : 'flex-row',

        isError
          ? 'border-border-danger focus-within:border-border-danger'
          : 'border-border-soft hover:border-border-default focus-within:border-border-primary focus-within:ring-0',
        isDisabled && 'cursor-not-allowed border-border-subtle bg-bg-subtle opacity-50',
        className
      )}
      flagComponent={FlagComponent}
      countrySelectComponent={(selectProps) => (
        <CountrySelect {...selectProps} isRtl={isRtl} disabled={isDisabled} isError={isError} />
      )}
      inputComponent={(inputProps) => (
        <InputComponent {...inputProps} isDisabled={isDisabled} isError={isError} />
      )}
      smartCaret={false}
      value={value || undefined}
      defaultCountry="EG"
      onChange={(value) => onChange?.(value || ('' as RPNInput.Value))}
      {...props}
    />
  );
});
PhoneVariant.displayName = 'PhoneVariant';

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & { isError?: boolean; isDisabled?: boolean }
>(({ className, isError, isDisabled, ...props }, ref) => {
  return (
    <Input
      disabled={isDisabled}
      className={cn(
        'flex-1 w-full h-10 border-0 text-text-plain rounded-s-none rounded-e-md focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-0 focus:outline-none placeholder:text-text-muted bg-transparent px-3 outline-none',
        className
      )}
      {...props}
      ref={ref}
    />
  );
});
InputComponent.displayName = 'InputComponent';

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  isError?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  isRtl?: boolean;
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  isError,
  value: selectedCountry,
  options: countryList,
  onChange,
  isRtl,
}: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        if (disabled) return;
        setIsOpen(open);
        open && setSearchValue('');
      }}
    >
      <PopoverTrigger>
        <span
          role="button"
          tabIndex={disabled ? -1 : 0}
          className={cn(
            'flex h-10 text-text-plain gap-2 px-3 items-center transition-colors shrink-0 whitespace-nowrap bg-transparent border-0 border-e border-border-soft outline-none p-0 focus:outline-none rounded-s-lg',
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer select-none',
            isError && 'text-text-danger',
            isOpen && 'bg-black/5'
          )}
          style={disabled ? { pointerEvents: 'none' } : undefined}
        >
          <FlagComponent country={selectedCountry} countryName={selectedCountry} />
          {selectedCountry && (
            <span className="text-xs font-medium text-text-default">
              {selectedCountry} (+{RPNInput.getCountryCallingCode(selectedCountry)})
            </span>
          )}
          <ChevronsUpDown className="size-3.5 opacity-50 shrink-0" />
        </span>
      </PopoverTrigger>

      <PopoverContent className="w-375 p-0 self-start">
        <Command dir={isRtl ? 'rtl' : 'ltr'}>
          <CommandInput
            value={searchValue}
            onValueChange={(value) => {
              setSearchValue(value);
              setTimeout(() => {
                if (scrollAreaRef.current) {
                  const viewportElement = scrollAreaRef.current.querySelector(
                    '[data-radix-scroll-area-viewport]'
                  );
                  if (viewportElement) {
                    viewportElement.scrollTop = 0;
                  }
                }
              }, 0);
            }}
            placeholder={isRtl ? 'ابحث عن الدولة...' : 'Search country...'}
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-72">
              <CommandGroup>
                {countryList
                  .filter(({ label }) => label.toLowerCase().includes(searchValue.toLowerCase()))
                  .map(({ value, label }) =>
                    value ? (
                      <CountrySelectOption
                        key={value}
                        country={value}
                        countryName={label}
                        selectedCountry={selectedCountry}
                        onChange={onChange}
                        onSelectComplete={() => setIsOpen(false)}
                      />
                    ) : null
                  )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
  onSelectComplete: () => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  const handleSelect = () => {
    onChange(country);
    onSelectComplete();
  };

  return (
    <CommandItem className="gap-2 " onSelect={handleSelect}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm text-text-muted">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
      <CheckIcon
        className={`ms-auto size-4 text-text-primary ${country === selectedCountry ? 'opacity-100' : 'opacity-0'}`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-border-subtle [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneVariant };

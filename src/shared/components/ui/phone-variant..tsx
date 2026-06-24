import * as React from 'react';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import * as RPNInput from 'react-phone-number-input';
import { useTranslations } from 'next-intl';

import {
  Command,
  CommandEmpty,
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
>(({ className, onChange, value, isError, isDisabled, ...props }, ref) => {
  return (
    <RPNInput.default
      ref={ref}
      className={cn('flex', className)}
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      inputComponent={InputComponent}
      smartCaret={false}
      value={value || undefined}
      defaultCountry="EG"
      /**
       * Handles the onChange event.
       *
       * react-phone-number-input might trigger the onChange event as undefined
       * when a valid phone number is not entered. To prevent this,
       * the value is coerced to an empty string.
       *
       * @param {E164Number | undefined} value - The entered value
       */
      onChange={(value) => onChange?.(value || ('' as RPNInput.Value))}
      {...props}
    />
  );
});
PhoneVariant.displayName = 'PhoneVariant';

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & { isError?: boolean; isDisabled?: boolean }
>(({ className, isError, isDisabled, ...props }, ref) => (
  <Input
    disabled={isDisabled}
    className={cn(
      'flex-1 w-full h-10 border-0  text-text-plain rounded-l-none rounded-r-md focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-0 focus:outline-none  placeholder:text-text-muted bg-transparent px-3',
      isError && 'border-border-danger focus:border-border-danger',
      className
    )}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = 'InputComponent';

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  isError?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  isError,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const t = useTranslations('HomePage');
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        setIsOpen(open);
        open && setSearchValue('');
      }}
    >
      <PopoverTrigger>
        <div
          className={cn(
            'flex h-10 text-text-plain gap-2 px-3 items-center transition-colors shrink-0 whitespace-nowrap bg-transparent',
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer select-none'
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
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-375 p-0">
        <Command>
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
            placeholder={t('searchCountryPlaceholder')}
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-72">
              <CommandEmpty>{t('noCountryFound')}</CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
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
    <CommandItem className="gap-2" onSelect={handleSelect}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm text-text-muted">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
      <CheckIcon
        className={`ml-auto size-4 text-text-primary ${country === selectedCountry ? 'opacity-100' : 'opacity-0'}`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-0 bg-border-subtle [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneVariant };

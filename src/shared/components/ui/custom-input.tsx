'use client';
import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { cn } from '@/lib/utils';
import FileVariant from './file-variant';
import { Eye, EyeOff, Search, X } from 'lucide-react';
import { Field } from '@base-ui/react/field';
import OTPVariant from './otp-variant';
import NumberVariant from './number-variant';
import { PhoneVariant } from './phone-variant.';

export type TInputValue = string | number | File[] | FileList | null;
export type TInputVariant =
  | 'default'
  | 'number'
  | 'search'
  | 'password'
  | 'otp'
  | 'file'
  | 'phone'
  | 'error'
  | 'disabled';

interface InputProps {
  variant: TInputVariant;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  isRtl?: boolean;
  className?: string;
  id?: string;
  min?: number;
  max?: number;
  step?: number;
  accept?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export default function CustomInput({
  variant,
  label,
  errorMessage,
  isRtl = false,
  placeholder = ' ',
  disabled = false,
  error = false,
  className = '',
  id,
  min,
  max,
  step = 1,
  accept,
  defaultValue,
  onChange,
  ...props
}: Omit<React.ComponentProps<'input'>, 'onChange'> & InputProps) {
  // disabled and error states based on props and variant
  const isDisabled = disabled || variant === 'disabled';
  const isError = !!errorMessage || variant === 'error' || error;

  // Local states for managing input behavior
  const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false);
  const [hasSearchValue, setHasSearchValue] = React.useState<boolean>(!!defaultValue);
  const [resetKey, setResetKey] = React.useState<number>(0);
  const internalRef = React.useRef<HTMLInputElement | null>(null);

  // Handle input changes for number and search variants
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (variant === 'number') {
      const sanitized = val.replace(/[^0-9.-]/g, '');
      if (e.target.value !== sanitized) {
        e.target.value = sanitized;
      }
    }

    if (variant === 'search') {
      setHasSearchValue(val.length > 0);
    }

    // Forward the original event natively to parent listeners
    (onChange as React.ChangeEventHandler<HTMLInputElement>)?.(e);
  };

  // Handle input changes for OTP variant
  const handleOtpStringChange = (value: string) => {
    if (internalRef.current) {
      internalRef.current.value = value;
    }
    const syntheticEvent = {
      target: { value, name: props.name || id, id },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    (onChange as React.ChangeEventHandler<HTMLInputElement>)?.(syntheticEvent);
  };

  // Determine the input type
  const getInputType = () => {
    if (variant === 'password') return isPasswordVisible ? 'text' : 'password';
    if (variant === 'number') return 'text';
    if (variant === 'search') return 'search';
    if (variant === 'phone') return 'tel';
    return 'text';
  };

  // Compute placeholder
  let computedPlaceholder = placeholder;
  if (placeholder === ' ' || placeholder === '') {
    if (variant === 'search') {
      computedPlaceholder = 'Search...';
    } else if (variant === 'password') {
      computedPlaceholder = '*********';
    }
  }

  // Handle clearing search input
  const handleClearSearch = () => {
    if (isDisabled) return;
    setHasSearchValue(false);
    setResetKey((prev) => prev + 1); // Triggers component re-render to clean default text value

    // Bubble a synthetic native change event upstream to register the reset clearing
    setTimeout(() => {
      if (internalRef.current) {
        internalRef.current.value = '';
        const event = new Event('input', { bubbles: true });
        internalRef.current.dispatchEvent(event);
      }
    }, 0);
  };

  // Handle toggling password visibility
  const handleTogglePassword = () => {
    if (!internalRef.current) return;
    const start = internalRef.current.selectionStart;
    const end = internalRef.current.selectionEnd;

    setIsPasswordVisible((prev) => !prev);

    setTimeout(() => {
      if (internalRef.current) {
        internalRef.current.focus();
        internalRef.current.setSelectionRange(start, end);
      }
    }, 0);
  };

  // Label styles Definitions
  const baseLableStyle = `w-fit h-17 block  text-sm font-medium text-start`;
  const normalLableStyle = `text-zinc-800 dark:text-zinc-50`;
  const errorLableStyle = `text-red-600 dark:text-red-500`;
  const disabledLableStyle = `text-zinc-400 dark:text-zinc-600`;
  const labeltStyle = isDisabled
    ? disabledLableStyle
    : isError
      ? errorLableStyle
      : normalLableStyle;

  // Input styles Definitions
  const normalInputStyle = `
    border-zinc-300 text-zinc-800 bg-white hover:border-zinc-400 placeholder:text-zinc-400
    focus-visible:border-maroon-600 dark:text-zinc-50 dark:hover:border-zinc-500 
    dark:bg-zinc-700 dark:placeholder:text-zinc-400 dark:border-zinc-600 dark:focus-visible:border-soft-pink-400 
  `;
  const errorInputStyle = ` 
    border-red-600 bg-white text-zinc-800 placeholder:text-zinc-400
    dark:text-zinc-50 dark:bg-zinc-700 dark:border-red-500 focus-visible:border-red-600
  `;
  const disableInputStyle = `
    border-zinc-100 bg-zinc-100 text-zinc-400 placeholder:text-zinc-400
    dark:text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700 pointer-events-none cursor-not-allowed
  `;

  const inputStyle = isDisabled ? disableInputStyle : isError ? errorInputStyle : normalInputStyle;

  return (
    <Field.Root
      className={cn('items-start justify-start flex-col w-full max-w-[327px]', className)}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {label && variant !== 'otp' && (
        <Field.Label htmlFor={id} className={`${baseLableStyle} ${labeltStyle}`}>
          {label}
        </Field.Label>
      )}

      <div className="relative flex items-center w-full">
        {/* Render the search button */}
        {variant === 'search' && (
          <Search
            className={cn(
              'absolute h-4 w-4 text-zinc-400 dark:text-zinc-500 pointer-events-none top-1/2 -translate-y-1/2 z-10',
              isRtl ? 'right-3' : 'left-3'
            )}
            aria-hidden="true"
            strokeWidth={2}
          />
        )}
        {/* Render the base input */}

        {variant !== 'otp' && variant !== 'phone' && variant !== 'file' && variant !== 'number' && (
          <InputPrimitive
            key={resetKey}
            ref={internalRef}
            type={getInputType()}
            id={id}
            disabled={isDisabled}
            defaultValue={defaultValue as string | number | undefined}
            onChange={handleChange}
            autoComplete="off"
            placeholder={computedPlaceholder}
            min={min}
            max={max}
            step={step}
            data-slot="input"
            className={cn(
              'h-9 w-full min-w-0 rounded-lg border px-3 py-1.5 text-base transition-colors outline-none md:text-sm',
              'focus-visible:outline-none focus-visible:ring-0',
              variant === 'search' && (isRtl ? 'pr-9 pl-9' : 'pl-9 pr-9'),
              variant === 'password' && (isRtl ? 'pl-9' : 'pr-9'),
              '[&::-webkit-search-decoration]:appearance-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none',
              inputStyle
            )}
            {...(props as React.ComponentProps<'input'>)}
          />
        )}

        {/* Render the file input variant */}
        {variant === 'file' && (
          <FileVariant isError={isError} isDisabled={isDisabled} accept={accept} />
        )}
        {/* Render the Number input variant */}
        {variant === 'number' && (
          <NumberVariant
            isError={isError}
            isDisabled={isDisabled}
            min={min}
            max={max}
            step={step}
            defaultValue={defaultValue as number}
            placeholder={computedPlaceholder}
          />
        )}
        {/* Render the Phone input variant */}

        {variant === 'phone' && (
          <PhoneVariant
            isError={isError}
            isDisabled={isDisabled}
            className={`  focus-visible:outline-none
               focus-visible:ring-0h-9 w-full min-w-0 
               rounded-lg border px-3 py-1.5
                text-base transition-colors outline-none
                 md:text-sm
                ${inputStyle} `}
            placeholder={computedPlaceholder}
          />
        )}

        {/* Render the Otp input variant */}

        {variant === 'otp' && (
          <OTPVariant
            isError={isError}
            isDisabled={isDisabled}
            defaultValue={defaultValue as string}
            onChange={handleOtpStringChange}
          />
        )}

        {/* Render the search clear button */}
        {variant === 'search' && hasSearchValue && (
          <button
            type="button"
            onClick={handleClearSearch}
            disabled={isDisabled}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors z-10',
              isRtl ? 'left-9' : 'right-9'
            )}
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Render the password visibility toggle button */}
        {variant === 'password' && (
          <button
            type="button"
            onClick={handleTogglePassword}
            disabled={isDisabled}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors z-10',
              isRtl ? 'left-3' : 'right-3'
            )}
          >
            {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>

      {/* Render the dynamic validation error layout tracking */}
      {/* {isError && errorMessage && (
        <p className="mt-1.5 text-xs text-red-600 dark:text-red-500 text-start">
          {errorMessage}
        </p>
      )} */}
    </Field.Root>
  );
}

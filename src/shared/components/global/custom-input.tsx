'use client';

import * as React from 'react';
import { Field, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '../ui/input';
import { Triangle } from 'lucide-react';
import { Button } from '@base-ui/react';

export type TInputVariant =
  | 'defualt'
  | 'number'
  | 'search'
  | 'password'
  | 'otp'
  | 'file'
  | 'phone'
  | 'error'
  | 'disabled';

export interface ICustomInputProps {
  variant: TInputVariant;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: string;
  isRtl?: boolean;
  className?: string;
  id?: string;
  defaultValue?: number | string;
  min?: number;
  max?: number;
  step?: number;
  value?: number | string;
  onChange?: (value: number | string) => void;
}

export default function CustomInput({
  variant,
  label,
  errorMessage,
  isRtl = false,
  placeholder = ' ',
  disabled = false,
  className = '',
  id,
  defaultValue,
  min,
  max,
  step = 1,
  value: controlledValue,
  onChange,
}: ICustomInputProps) {
  const isDisabled = disabled || variant === 'disabled';
  const isError = !!errorMessage || variant === 'error';

  // 1. Initialize local state with your value/defaultValue priorities
  const [localValue, setLocalValue] = React.useState<string>(() => {
    if (controlledValue !== undefined) return controlledValue.toString();
    if (defaultValue !== undefined) return defaultValue.toString();
    return '';
  });

  // 2. Track previous prop values to handle runtime prop changes safely
  const [prevControlledValue, setPrevControlledValue] = React.useState(controlledValue);

  // 3. Update local state DURING render if the parent prop changes (No useEffect used!)
  if (controlledValue !== prevControlledValue) {
    setLocalValue(controlledValue !== undefined ? controlledValue.toString() : '');
    setPrevControlledValue(controlledValue);
  }

  // دالة حساب الخانات العشرية الآمنة لمنع الـ Crash
  const getDecimalPlaces = (num: number): number => {
    const parts = num.toString().split('.');
    return parts && parts[1] ? parts[1].length : 0;
  };

  const updateValue = (newValue: string) => {
    if (newValue === '') {
      setLocalValue('');
      onChange?.('');
      return;
    }

    let parsed = parseFloat(newValue);
    if (isNaN(parsed)) return;

    if (min !== undefined && parsed < min) parsed = min;
    if (max !== undefined && parsed > max) parsed = max;

    const stepDecimals = getDecimalPlaces(step);
    const minDecimals = min !== undefined ? getDecimalPlaces(min) : 0;
    const precision = Math.max(stepDecimals, minDecimals);

    const fixedValue = parseFloat(parsed.toFixed(precision));

    setLocalValue(fixedValue.toString());
    onChange?.(fixedValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    if (variant === 'number') {
      // السماح بالأرقام، الإشارة السالبة، والنقطة العشرية فقط
      val = val.replace(/[^0-9.-]/g, '');

      // السماح للمستخدم بطباعة الإشارات والكسور بحرية قبل اكتمال الرقم الحقيقي
      if (val === '' || val === '-' || val === '.' || val === '-.') {
        setLocalValue(val);
        return;
      }
      updateValue(val);
    } else {
      setLocalValue(val);
      onChange?.(val);
    }
  };

  // دالة موحدة للتحكم في الأسهم (الزيادة والنقصان)
  const handleStep = (direction: 'up' | 'down') => {
    if (isDisabled) return;
    const current = localValue === '' || localValue === '-' ? 0 : parseFloat(localValue);
    const change = direction === 'up' ? step : -step;
    updateValue((current + change).toString());
  };

  const numericValue = parseFloat(localValue);
  const isMinReached = min !== undefined && !isNaN(numericValue) && numericValue <= min;
  const isMaxReached = max !== undefined && !isNaN(numericValue) && numericValue >= max;

  // Styles
  const baseLableStyle = ` w-37 h-17 block mb-1.5 text-sm font-medium `;
  const normalLableStyle = `text-zinc-800 dark:text-zinc-50 `;
  const errorLableStyle = `text-red-600 dark:text-red-500 `;
  const disabledLableStyle = `text-zinc-400 dark:text-zinc-600 `;

  const baseInputStyle = `w-full border rounded-10 placeholder:text-sm px-2.5 py-1.5 outline-none transition-colors`;
  const normalInputStyle = `
    border-zinc-300 text-zinc-800 bg-white hover:border-zinc-400 placeholder:text-zinc-400
    focus-visible:border-maroon-600 dark:text-zinc-50 dark:hover:border-zinc-500 
    dark:bg-zinc-700 dark:placeholder:text-zinc-400 dark:border-zinc-600 dark:focus-visible:border-soft-pink-400 
  `;
  const errorInputStyle = ` 
    border-red-600 bg-white text-zinc-800 placeholder:text-zinc-400
    dark:text-zinc-50 dark:bg-zinc-700 dark:border-red-500 
  `;
  const diableInputStyle = `
    border-zinc-100 bg-zinc-100 text-zinc-400 placeholder:text-zinc-400
    dark:text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700 
  `;

  const inputStyle = isDisabled ? diableInputStyle : isError ? errorInputStyle : normalInputStyle;
  const labeltStyle = isDisabled
    ? disabledLableStyle
    : isError
      ? errorLableStyle
      : normalLableStyle;

  const getInputType = () => {
    if (variant === 'password') return 'password';
    if (variant === 'number') return 'text';
    if (variant === 'search') return 'search';
    if (variant === 'phone') return 'tel';
    if (variant === 'file') return 'file';
    return 'text';
  };

  return (
    <Field className={`w-327 ${className}`} style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      {label && variant !== 'otp' && (
        <FieldLabel htmlFor={id} className={`${baseLableStyle} ${labeltStyle}`}>
          {label}
        </FieldLabel>
      )}

      <div className="relative flex items-center w-full">
        <Input
          id={id}
          type={getInputType()}
          disabled={isDisabled}
          value={localValue}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          className={`${baseInputStyle} ${inputStyle} ${variant === 'number' ? (isRtl ? 'pl-6' : 'pr-6') : ''}`}
          autoComplete="off"
          placeholder={placeholder}
        />

        {variant === 'number' && (
          <div
            className={`absolute flex flex-col items-center h-[calc(100%-2px)] my-px justify-center ${isRtl ? 'left-1' : 'right-1'}`}
          >
            <Button
              type="button"
              onClick={() => handleStep('up')}
              disabled={isMaxReached || isDisabled}
              className="flex items-center justify-center w-5 h-1/2 enabled:hover:bg-zinc-100 dark:enabled:hover:bg-zinc-600 disabled:cursor-default transition-colors  "
            >
              <Triangle className="w-2.5 rounded-min h-2 text-zinc-500 fill-zinc-500   dark:text-zinc-300 dark:fill-zinc-300" />
            </Button>
            <Button
              type="button"
              onClick={() => handleStep('down')}
              disabled={isMinReached || isDisabled}
              className="flex items-center justify-center w-5 h-1/2 enabled:hover:bg-zinc-100 dark:enabled:hover:bg-zinc-600 disabled:cursor-default transition-colors"
            >
              <Triangle className="w-2.5 h-2 rounded-min  rotate-180 text-zinc-500 fill-zinc-500   dark:text-zinc-300 dark:fill-zinc-300" />
            </Button>
          </div>
        )}
      </div>
    </Field>
  );
}

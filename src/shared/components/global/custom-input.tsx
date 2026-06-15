import { Field, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '../ui/input';

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
}: ICustomInputProps) {
  const isDisabled = disabled || variant === 'disabled';
  const isError = !!errorMessage || variant === 'error';
  const baseLableStyle = ` w-37 h-17 block mb-1.5 text-sm 
  font-inter font-medium  `;
  const normalLableStyle = `text-zinc-800 dark:text-zinc-50 `;
  const errorLableStyle = `text-red-600 dark:text-red-500 `;
  const disabledLableStyle = `text-zinc-400 dark:text-zinc-600 `;
  const baseInputStyle = `w-full  border rounded-10 
   placeholder:text:sm 
`;
  const normalInputStyle = `  border-zinc-300 
      text-zinc-800 bg-white
       hover:border-zinc-400
      placeholder:text-zinc-400
      
      focus-visible:border-maroon-600 

      dark:text-zinc-50 
      dark:hover:border-zinc-500 
       dark:bg-zinc-700 
      dark:placeholder:text-zinc-400  
       dark:border-zinc-600 
       dark:focus-visible:border-soft-pink-400 
      `;
  const errorInputStyle = ` 
           
           border-red-600  bg-white
           text-zinc-800
            placeholder:text-zinc-400
            dark:text-zinc-50 
             dark:bg-zinc-700 
           dark:border-red-500 
      `;
  const diableInputStyle = `
        border-zinc-100  bg-zinc-100
           text-zinc-400
            placeholder:text-zinc-400
            dark:text-zinc-600 
             dark:bg-zinc-800 
           dark:border-zinc-700 
      `;
  const inputStyle = isDisabled ? diableInputStyle : isError ? errorInputStyle : normalInputStyle;
  const labeltStyle = isDisabled
    ? disabledLableStyle
    : isError
      ? errorLableStyle
      : normalLableStyle;

  const getInputType = () => {
    if (variant === 'password') return 'password';
    if (variant === 'number') return 'number';
    if (variant === 'search') return 'search';
    if (variant === 'phone') return 'tel';
    if (variant === 'file') return 'file';
    else return 'text';
  };

  return (
    <Field className={`w-327    ${className}`}>
      {label && variant !== 'otp' && (
        <FieldLabel
          htmlFor={`${id}`}
          className={`${baseLableStyle} 
        ${labeltStyle}`}
        >
          {label}
        </FieldLabel>
      )}

      <Input
        id={id}
        disabled={isDisabled}
        className={`${baseInputStyle} ${inputStyle}`}
        autoComplete="off"
        placeholder={placeholder}
      />
    </Field>
  );
}

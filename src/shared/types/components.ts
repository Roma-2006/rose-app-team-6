export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string | null) => void;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  maxLength?: number;
  showCounter?: boolean;
}
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  showCount?: boolean;
  autoResize?: boolean;
  charCountText?: string;
}

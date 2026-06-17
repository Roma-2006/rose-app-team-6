export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: SelectOption[];
  value?: string | null;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  maxLength?: number;
  showCounter?: boolean;
  isAsync?: boolean;
  onSearch?: (query: string) => Promise<void>;
  loading?: boolean;
}

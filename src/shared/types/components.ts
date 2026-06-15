// @/shared/components/ui/forms-logic/types.ts

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: { label: string; value: string }[];
  value?: string;
  onValueChange?: (value: string | null) => void;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  error?: string;
  label?: string;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  showCount?: boolean;
  maxLength?: number;
  charCountText?: string;
  label?: string;
}

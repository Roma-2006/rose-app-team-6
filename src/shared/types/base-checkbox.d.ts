export type TBaseCheckboxProps = {
  onChange: (isChecked: boolean) => void;
  value?: boolean;
  error?: string;
  list: {
    id: string;
    label: string;
  }[];
};

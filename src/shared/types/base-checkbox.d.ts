export type TBaseCheckboxProps = {
  value?: boolean | string[];
  onChange: (value: boolean | string[]) => void;
  error?: string;
  list: {
    id: string;
    label: string;
  }[];
};

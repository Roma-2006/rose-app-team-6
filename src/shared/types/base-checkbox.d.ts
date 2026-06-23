export type TBaseCheckboxProps = {
  onChange: (isChecked: boolean) => void;
  error: string;
  list: {
    id: string;
    label: string;
  }[];
};

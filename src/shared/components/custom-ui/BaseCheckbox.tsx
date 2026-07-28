'use client';

import { Checkbox } from '@/shared/components/ui/checkbox';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from '@/shared/components/ui/field';
import { Label } from '@/shared/components/ui/label';
import { TBaseCheckboxProps } from '@/shared/types/base-checkbox';

export function BaseCheckbox({ list, error, value, onChange }: TBaseCheckboxProps) {
  // State to manage selected checkboxes
  const isItemChecked = (id: string) => {
    if (typeof value === 'boolean') {
      return value;
    }
    return Array.isArray(value) ? value.includes(id) : false;
  };

  const toggle = (id: string, isChecked: boolean) => {
    if (typeof value === 'boolean') {
      onChange(isChecked);
    } else if (Array.isArray(value)) {
      const updatedValue = isChecked ? [...value, id] : value.filter((itemId) => itemId !== id);
      onChange(updatedValue);
    }
  };

  return (
    <div>
      <FieldGroup className="max-w-64.5 max-h-42.75 " variant="checkbox">
        {list.map((item) => (
          <Field orientation="horizontal" key={item.id}>
            <Checkbox
              aria-invalid={error ? true : false}
              id={item.id}
              name={item.id}
              // checked={selected.includes(item.id)}
              checked={isItemChecked(item.id)}
              onCheckedChange={(isChecked: boolean) => toggle(item.id, isChecked)}
            />
            <Label htmlFor={item.id} variant="checkbox">
              {item.label}
            </Label>
          </Field>
        ))}
      </FieldGroup>
      {error && (
        <p className="text-text-danger font-normal text-xs mt-1.5 ">
          You must accept terms and conditions
        </p>
      )}
    </div>
  );
}

'use client';

import { Checkbox } from '@/shared/components/ui/checkbox';
import { Field, FieldGroup } from '@/shared/components/ui/field';
import { Label } from '@/shared/components/ui/label';
import { TBaseCheckboxProps } from '@/shared/types/base-checkbox';

export function BaseCheckbox({ list, error, onChange, value = false }: TBaseCheckboxProps) {
  const selectedIds = value ? list.map((item) => item.id) : [];

  const toggle = (id: string) => {
    const isChecked = selectedIds.includes(id);
    onChange(!isChecked);
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
              checked={selectedIds.includes(item.id)}
              onCheckedChange={() => toggle(item.id)}
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

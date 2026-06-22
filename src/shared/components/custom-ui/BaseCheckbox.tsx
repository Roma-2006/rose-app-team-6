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
import { useState } from 'react';

export function BaseCheckbox({ list, error = true }) {
  // const [selected, setSelected] = useState<string[]>([]);
  // const toggle = (id: string) => {
  //   setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  // };
  // const allChecked = selected.length === list.length;
  // const someChecked = selected.length > 0;
  // const state = allChecked ? true : someChecked ? 'indeterminate' : false;
  // const toggleState = () => {};
  return (
    <>
      <FieldGroup className="max-w-64.5 max-h-42.75" variant="checkbox">
        {list.map((item) => (
          <Field orientation="horizontal" key={item.id}>
            <Checkbox id={item.id} name={item.id} />
            <Label htmlFor={item.id} variant="checkbox">
              {item.label}
            </Label>
          </Field>
        ))}
      </FieldGroup>
      {error && (
        <p className="text-error font-normal text-12 mt-2 ">You must accept terms and conditions</p>
      )}
    </>
  );
}

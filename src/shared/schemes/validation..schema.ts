import { z } from 'zod';

export const formComponentsSchema = z.object({
  selectField: z.string().nonempty('This field is required '),

  comboboxField: z.string().nonempty('This field is required'),

  textareaField: z
    .string()
    .min(10, 'Please enter at least 10 characters')
    .max(199, 'Maximum 200 characters allowed'),
});

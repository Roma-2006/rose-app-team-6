// features/address/schemas/address.schema.ts
import { z } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const addressSchema = z.object({
  city: z.string().min(1, 'City is required'),
  street: z.string().min(1, 'Full address is required'),
  phone: z.string().refine((val) => isValidPhoneNumber(val), {
    message: 'Invalid phone number',
  }),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
});

export type AddressFormValues = z.infer<typeof addressSchema>;

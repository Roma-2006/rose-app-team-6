import z from 'zod';

export const profileSchema = z
  .object({
    firstName: z.string().nonempty('errors.first-name'),
    lastName: z.string().nonempty('errors.last-name'),
    photo: z.string().nonempty(),
    phone: z
      .string()
      .trim()
      .nonempty('errors.phone')
      .regex(/^\+[1-9]\d{0,3}\s?\d{7,14}$/, 'errors.invalid-phone-number'),
  })
  .strict()
  .partial();

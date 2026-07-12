import z from 'zod';
export const userInfoSchema = z
  .object({
    firstName: z.string().nonempty('user-info.errors.first-name'),
    lastName: z.string().nonempty('user-info.errors.last-name'),
    username: z.string().min(2, 'user-info.errors.user-name'),
    phone: z
      .string()
      .trim()
      .nonempty('user-info.errors.phone')
      .regex(/^\+[1-9]\d{0,3}\s?\d{7,14}$/, 'user-info.errors.invalid-phone-number'),
    gender: z.string().nonempty('user-info.errors.gender'),
  })
  .strict();

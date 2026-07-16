import z from 'zod';
export const createPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'create-password.errors.password-min-length')
      .regex(/[A-Z]/, 'create-password.errors.password-uppercase')
      .regex(/[a-z]/, 'create-password.errors.password-lowercase')
      .regex(/[0-9]/, 'create-password.errors.password-number')
      .regex(/[^A-Za-z0-9]/, 'create-password.errors.password-special'),
    confirmPassword: z.string().nonempty('create-password.errors.confirm-password'),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: 'create-password.errors.passwords-do-not-match',
    path: ['confirmPassword'],
  });

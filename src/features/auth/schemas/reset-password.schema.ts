import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(1, { message: 'fieldRequired' }).regex(passwordRegex, {
      message: 'passwordInvalid',
    }),

    confirmPassword: z.string().min(1, { message: 'fieldRequired' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'passwordMatch',
  });

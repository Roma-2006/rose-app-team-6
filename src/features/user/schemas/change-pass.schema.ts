import z from 'zod';

export const CHANGE_PASS_SCHEMA = z
  .object({
    oldPassword: z.string().nonempty('create-password.errors.confirm-password'),

    newPassword: z
      .string()
      .min(8, 'create-password.errors.password-min-length')
      .regex(/[A-Z]/, 'create-password.errors.password-uppercase')
      .regex(/[a-z]/, 'create-password.errors.password-lowercase')
      .regex(/[0-9]/, 'create-password.errors.password-number')
      .regex(/[^A-Za-z0-9]/, 'create-password.errors.password-special'),

    confirmNewPassword: z.string().nonempty('create-password.errors.confirm-password'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

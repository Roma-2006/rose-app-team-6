import { z } from 'zod';

export const changePasswordSchema = (t: (key: string) => string) =>
  z
    .object({
      currentPassword: z.string().min(1, t('errors.current-password-required')),

      newPassword: z
        .string()
        .min(8, t('errors.password-min-length'))
        .regex(/[A-Z]/, t('errors.password-uppercase'))
        .regex(/[a-z]/, t('errors.password-lowercase'))
        .regex(/[0-9]/, t('errors.password-number'))
        .regex(/[^A-Za-z0-9]/, t('errors.password-special')),

      confirmPassword: z.string().min(1, t('errors.confirm-password')),
    })
    .strict()
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('errors.passwords-do-not-match'),
      path: ['confirmPassword'],
    });

export type ChangePasswordFormValues = z.infer<ReturnType<typeof changePasswordSchema>>;

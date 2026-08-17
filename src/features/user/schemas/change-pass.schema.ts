'use server';
import { getTranslations } from 'next-intl/server';
import z from 'zod';

const t = getTranslations('auth.auth-register.create-password.errors');

export const CHANGE_PASS_SCHEMA = z
  .object({
    oldPassword: z.string().nonempty(t('confirm-password')),

    newPassword: z
      .string()
      .min(8, '.password-min-length')
      .regex(/[A-Z]/, t('password-uppercase'))
      .regex(/[a-z]/, t('password-lowercase'))
      .regex(/[0-9]/, t('password-number'))
      .regex(/[^A-Za-z0-9]/, t('password-special')),

    confirmNewPassword: z.string().nonempty(t('confirm-password')),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

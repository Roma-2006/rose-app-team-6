'use server';
import type { TranslationValues } from 'next-intl';
import z from 'zod';
type Translate = (key: string, values?: TranslationValues) => string;

export const CHANGE_PASS_SCHEMA = z
  .object({
    oldPassword: z
      .string()
      .nonempty(t('auth.auth-register.create-password.errors.confirm-password')),

    newPassword: z
      .string()
      .min(8, '.password-min-length')
      .min(1, { message: t('schema.username.required') })

      .regex(/[A-Z]/, t('auth.auth-register.create-password.errors.password-uppercase'))
      .regex(/[a-z]/, t('auth.auth-register.create-password.errors.password-lowercase'))
      .regex(/[0-9]/, t('auth.auth-register.create-password.errors.password-number'))
      .regex(/[^A-Za-z0-9]/, t('auth.auth-register.create-password.errors.password-special')),

    confirmNewPassword: z
      .string()
      .nonempty(t('auth.auth-register.create-password.errors.confirm-password')),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

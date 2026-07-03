import { z } from 'zod';
import type { TranslationValues } from 'next-intl';

type Translate = (key: string, values?: TranslationValues) => string;

export const LOGIN_SCHEMA = (t: Translate) =>
  z
    .object({
      username: z
        .string(t('username.invalid'))
        .nonempty(t('username.required'))
        .min(3, t('username.required'))
        .max(20, t('username.invalid'))
        .regex(/^[a-zA-Z0-9]+$/, t('username.invalid')),
      password: z
        .string(t('password.invalid'))
        .nonempty(t('password.required'))
        .min(8, t('password.required'))
        .regex(/[A-Z]/, t('password.uppercase'))
        .regex(/[a-z]/, t('password.lowercase'))
        .regex(/[0-9]/, t('password.number'))
        .regex(/[@$!%*?&]/, t('password.special')),
    })
    .strict();

import { z } from 'zod';
import type { TranslationValues } from 'next-intl';

type Translate = (key: string, values?: TranslationValues) => string;

export const LOGIN_SCHEMA = (t: Translate) =>
  z
    .object({
      username: z
        .string({ message: t('schema.username.required') })
        .min(1, { message: t('schema.username.required') })
        .min(3, { message: t('schema.username.invalid') })
        .max(20, { message: t('schema.username.invalid') }),

      password: z
        .string({ message: t('schema.password.required') })
        .min(1, { message: t('schema.password.required') })
        .min(8, { message: t('schema.password.required') })
        .regex(/[A-Z]/, { message: t('schema.password.uppercase') })
        .regex(/[a-z]/, { message: t('schema.password.lowercase') })
        .regex(/[0-9]/, { message: t('schema.password.number') })
        .regex(/[@$!%*?&]/, { message: t('schema.password.special') }),

      rememberMe: z.boolean().optional(),
    })
    .strict();

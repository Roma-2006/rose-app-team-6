import { z } from 'zod';
import type { TranslationValues } from 'next-intl';

type Translate = (key: string, values?: TranslationValues) => string;

export const LOGIN_SCHEMA = (t: Translate) =>
  z
    .object({
      username: z
        .string()
        .min(1, { message: t('schema.username.required') })
        .min(3, { message: t('schema.username.invalid') })
        .max(20, { message: t('schema.username.invalid') }),

      password: z.string().min(1, { message: t('schema.password.required') }),

      rememberMe: z.boolean().optional(),
    })
    .strict();

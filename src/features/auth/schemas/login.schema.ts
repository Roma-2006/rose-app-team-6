import { z } from 'zod';
import type { TranslationValues } from 'next-intl';

type Translate = (key: string, values?: TranslationValues) => string;

export const LOGIN_SCHEMA = (t: Translate) =>
  z
    .object({
      username: z.string(t('username.invalid')).nonempty(t('username.required')),

      password: z
        .string(t('password.invalid'))
        .nonempty(t('password.required'))
        .min(8, 'Your password is required')
        .regex(/[A-Z]/, 'Uppercase required')
        .regex(/[a-z]/, 'Lowercase required')
        .regex(/[0-9]/, 'Number required')
        .regex(/[@$!%*?&]/, 'Special character required'),
    })
    .strict();

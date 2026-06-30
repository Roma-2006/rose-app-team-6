import { z } from 'zod';
import type { TranslationValues } from 'next-intl';

type Translate = (key: string, values?: TranslationValues) => string;

export const loginSchema = (t: Translate) =>
  z.object({
      username: z.string(t('username.invalid')).min(1, t('username.required')),

      password: z.string(t('password.invalid')).min(1, t('password.required')),
    })
    .strict();

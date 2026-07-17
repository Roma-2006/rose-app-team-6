import * as z from 'zod';

export const RegisterEmailSchema = z.object({
  email: z.string().min(1, 'step1.errors.email-required').email('step1.errors.invalid-email'),
});

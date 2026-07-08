import * as z from 'zod';

export const RegisterEmailSchema = z.object({
  email: z.string().min(1, { message: 'noAccount' }).email({ message: 'noAccount' }),
});

import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'invalidEmail' }),
});

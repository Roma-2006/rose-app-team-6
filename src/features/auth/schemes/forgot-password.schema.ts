import * as z from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
});

import { z } from 'zod';

export const RegisterEmailSchema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
});

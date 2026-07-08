import * as z from 'zod';

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'passwordRequirement')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'passwordRequirement'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'passwordMatch',
    path: ['confirmPassword'],
  });

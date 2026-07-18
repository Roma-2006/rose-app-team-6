import { z } from 'zod';

export const otpSchema = z.object({
  otp: z.string().length(6, 'Please enter the 6-digit verification code'),
});

export type OtpSchema = z.infer<typeof otpSchema>;

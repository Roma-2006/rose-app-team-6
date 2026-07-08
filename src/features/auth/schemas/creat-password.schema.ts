import z from 'zod';

export const creatPasswordSchema = z.object({
  password: z.string(), //.min(8, 'passwordMinLength')
  //.regex(/[A-Z]/, 'passwordUppercase')
  //.regex(/[a-z]/, 'passwordLowercase')
  //.regex(/[0-9]/, 'passwordNumber')
  //.regex(/[^A-Za-z0-9]/, 'passwordSpecial'),
  confirmPassword: z.string(), //.nonempty('Confirm Password is required'),
});
//.strict()
//.refine((data) => data.password === data.confirmPassword, {
// message: 'Passwords do not match',
// path: ['confirmPassword'],
//});

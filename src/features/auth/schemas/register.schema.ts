import z from 'zod';

export const RegisterSchema = z
  .object({
    username: z.string('Invalid Username').nonempty('Username is required'),
    email: z.string().email(),
    password: z.string().nonempty('Password is required'),
    confirmPassword: z.string().nonempty('Confirmed Password is required'),
    firstName: z.string().nonempty('Firstname is required'),
    lastName: z.string().nonempty('Lastname is required'),
    gender: z.string().nonempty('Gender is required'),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

import z from 'zod';

export const userInfoSchema = z
  .object({
    firstName: z.string().nonempty('First Name is required'),
    lastName: z.string().nonempty('Last Name is required'),
    username: z.string().min(2, 'User Name  must be at least 2 characters.'),
    phone: z
      .string()
      .nonempty('Phone is required')
      .regex(/^\+20(10|11|12|15)[0-9]{8}$/, 'Invalid phone number'),
    gender: z.string().nonempty('Gender is required'),
  })
  .strict();

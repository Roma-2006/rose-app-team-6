import z from 'zod';

export const userInfoSchema = z.object({
  firstName: z.string(), //.nonempty('First Name is required'),
  lastName: z.string(), //.nonempty('Last Name is required'),
  username: z.string(),
  phone: z.string(), //.nonempty('Phone is required'),//.regex(/^01[0-9]{9}$/, 'Invalid phone number'),
  gender: z.string(), //.nonempty('Gender is required'),
});

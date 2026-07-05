import z from 'zod';

export const RegisterSchema = z.object({
  firstName: z.string(), //.nonempty('First Name is required'),
  lastName: z.string(), //.nonempty('Last Name is required'),
  email: z.string(), //.nonempty('Email is required').email(),
  phone: z.string(), //.nonempty('Phone is required'),//.regex(/^01[0-9]{9}$/, 'Invalid phone number'),
  gender: z.string(), //.nonempty('Gender is required'),
  password: z.string(), //.nonempty('Password is required'),
  confirmPassword: z.string(), //.nonempty('Confirmed Password is required'),
});
//.strict()
//.refine((data) => data.password === data.confirmPassword, {
// message: 'Passwords do not match',
// path: ['confirmPassword'],
//});

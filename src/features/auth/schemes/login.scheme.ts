import { z } from "zod";

export const loginSchema = z.object({
    username: z.string('Invalid Username').min(1 , 'Username is required'),
    password: z.string('Invalid Password').min(1 ,"Password is required"),
}).strict();
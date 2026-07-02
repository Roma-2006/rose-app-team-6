
import { User } from "./user";
import { z } from "zod";
import { loginSchema } from "../schemes/login.scheme";

//Login
export type LoginFields = z.infer<typeof loginSchema>;


// API response types
export interface LoginResponse  {
    user: User;
    token: string;
}

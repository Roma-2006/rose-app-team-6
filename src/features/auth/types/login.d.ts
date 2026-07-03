import { LOGIN_SCHEMA } from '../schemas/login.schema';

type TLoginData = z.infer<typeof LOGIN_SCHEMA>;

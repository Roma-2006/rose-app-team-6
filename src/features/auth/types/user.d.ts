export type TUser = {
  id: string;
  username: string;
  email: string;
  phone?: sting;
  firstName: string;
  lastName: string;
  gender: 'FEMALE' | 'MALE';
  emailVerified: boolean;
  phoneVerified: boolean;
  role: 'USER';
  createdAt: string;
};

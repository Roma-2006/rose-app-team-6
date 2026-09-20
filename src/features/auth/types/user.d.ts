//mkarar

export type TUser = {
  id: string;
  username: string;
  email: string;
  phone?: sting;
  firstName: string;
  lastName: string;
  gender: 'FEMALE' | 'MALE';
  photo?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: 'USER';
  createdAt: string;
  updatedAt?: string;
};
import { USER_ROLES, USER_GENDER } from '../constants/user.constants';

/**
 * A union of all valid user role string literals derived from {@link USER_ROLES}.
 *
 * @example
 * const role: UserRole = "ADMIN";
 */
export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export type UserGender = (typeof USER_GENDER)[keyof typeof USER_GENDER];

/**
 * Represents an authenticated user in the system.
 */
export interface User {
  /** Unique identifier for the user. */
  id: string;
  /** The user's login username. */
  username: string;
  /** The user's email address. */
  email: string;
  /** The user's phone number, or `null` if not provided. */
  phone: string | null;
  /** The user's first name. */
  firstName: string;
  /** The user's last name. */
  lastName: string;
  /** The user's gender */
  gender: UserGender;
  /** The user's photo, or `null` if not provided */
  photo: string | null;
  /** Whether the user has verified their email address. */
  emailVerified: boolean;
  /** Whether the user has verified their phone number. */
  phoneVerified: boolean;
  /** The user's assigned role, controlling access permissions. */
  role: UserRole;
  rememberMe?: boolean;
}

/**
 * A constant map of all user roles available in the application.
 *
 * Declared `as const` so the values can be used to derive the
 * {@link UserRole} union type, ensuring roles are never mistyped.
 *
 * @example
 * if (user.role === USER_ROLES.admin) {
 *   // grant admin access
 * }
 */
export const USER_ROLES = {
    /** Standard user with default permissions. */
    user: "USER",
    /** Administrator with elevated permissions. */
    admin: "ADMIN",
    /** Super administrator with full system access. */
    superAdmin: "SUPER_ADMIN",
} as const;

export const USER_GENDER = {
    male: "MALE",
    female: "FEMALE",
}as const;
import { AuthErrorProps } from '@/shared/types/auth-error';

export default function AuthError({ zodError, beError }: AuthErrorProps) {
  return <p className="text-text-danger mt-1">{zodError ? zodError : beError}</p>;
}

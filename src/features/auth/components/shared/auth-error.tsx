import { AuthErrorProps } from '@/shared/types/auth-error';
import { useTranslations } from 'next-intl';
export default function AuthError({ zodError, beError }: AuthErrorProps) {
  const t = useTranslations('auth.auth-register');
  return <p className="text-text-danger mt-1">{zodError ? t(zodError) : beError}</p>;
}

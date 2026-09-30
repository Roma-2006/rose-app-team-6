import { AuthErrorProps } from '@/shared/types/auth-error';
import { useTranslations } from 'next-intl';
export default function AuthError({
  zodError,
  beError,
  namespace = 'auth.auth-register',
}: AuthErrorProps) {
  const t = useTranslations(namespace);
  return <p className="text-text-danger mt-1">{zodError ? t(zodError) : beError}</p>;
}

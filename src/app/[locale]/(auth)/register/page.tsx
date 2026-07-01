import RegisterForm from '@/features/auth/components/register/register.form';
import { useTranslations } from 'next-intl';

export default function Register() {
  const t = useTranslations('auth.register');
  return (
    <section>
      <h1 className="font-normal text-text-primary text-5xl mb-6 pb-4 px-5.5 border-b border-border-muted">
        {t('title')}
      </h1>
      <RegisterForm />
    </section>
  );
}

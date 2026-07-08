import LoginForm from '@/features/auth/components/login/login-form';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export default async function LoginPage() {
  const tLogin = await getTranslations('login');

  return (
    <main>
      <LoginForm />

      <div className=" flex justify-center w-full max-w-96 gap-1">
        <p className=" text-sm font-medium text-zinc-800 pt-0.5 "> {tLogin('noAccount')} </p>
        <span>
          <Link className="text-sm font-bold text-text-primary " href="/register">
            {tLogin('register')}
          </Link>
        </span>
      </div>
    </main>
  );
}

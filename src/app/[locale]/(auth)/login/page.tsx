import LoginForm from '@/features/auth/components/login/login-form';
import { Link } from '@/i18n/navigation';
import CustomInput from '@/shared/components/custom-input';
import { getTranslations } from 'next-intl/server';

export default async function LoginPage() {
  const tLogin = await getTranslations('auth.login');
  return (
    <main className="flex flex-col items-center    max-h-100 max-w-102">
      <LoginForm />

      <div className=" flex justify-center w-3/4 max-w-96 gap-1">
        <p className=" text-sm font-medium text-text-plain pt-0.5 "> {tLogin('noAccount')} </p>
        <span>
          <Link className="text-sm font-bold text-text-primary " href="/register">
            {tLogin('register')}
          </Link>
        </span>
      </div>
    </main>
  );
}

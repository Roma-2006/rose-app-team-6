import CreatePassword from '@/features/auth/components/register/create-password';
import UserInfoForm from '@/features/auth/components/register/user-info.form';
import { RegisterEmailForm } from '@/features/auth/components/register-email-form';
import { OtpForm } from '@/features/auth/components/register/otp-form';

interface RegisterPageProps {
  params:
    | Promise<{
        register: string[];
      }>
    | {
        register: string[];
      };
}

export default async function RegisterPage(props: RegisterPageProps) {
  const resolvedParams = 'then' in props.params ? await props.params : props.params;

  const steps = resolvedParams?.register || [];
  console.log(resolvedParams);
  console.log(steps);

  // 1.register

  if (steps.length === 0 || (steps[0] === 'register' && steps.length === 1)) {
    return <RegisterEmailForm />;
  }

  // 2.register/otp
  if (steps[0] === 'otp' || (steps[0] === 'register' && steps[1] === 'otp')) {
    return <OtpForm />;
  }

  // 3./register/userInfo
  if (steps[0] === 'user-info' || (steps[0] === 'register' && steps[1] === 'user-info')) {
    return <UserInfoForm />;
  }
  // 4./register/create-password
  if (
    steps[0] === 'create-password' ||
    (steps[0] === 'register' && steps[1] === 'create-password')
  ) {
    return <CreatePassword />;
  }
}

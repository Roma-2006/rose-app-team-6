import { OtpForm } from '@/features/auth/components/otp-form';
import { RegisterEmailForm } from '@/features/auth/components/register-email-form';

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

  // 1.register

  if (steps.length === 0 || (steps[0] === 'register' && steps.length === 1)) {
    return <RegisterEmailForm />;
  }

  // 2.register/otp
  if (steps[0] === 'otp' || (steps[0] === 'register' && steps[1] === 'otp')) {
    return <OtpForm />;
  }

  // 3./register/register-userInfo
  if (
    steps[0] === 'register-userInfo' ||
    (steps[0] === 'register' && steps[1] === 'register-userinfo')
  ) {
    return <></>;
  }
  // 4./register/register-password
  if (
    steps[0] === 'register-password' ||
    (steps[0] === 'register' && steps[1] === 'register-password')
  ) {
    return <></>;
  }
}

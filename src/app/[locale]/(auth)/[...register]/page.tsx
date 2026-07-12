import RegisterSteps from '@/features/auth/components/register/register-steps';
import { RegisterPageProps } from '@/features/auth/types/register';

export default async function RegisterPage(props: RegisterPageProps) {
  const resolvedParams = 'then' in props.params ? await props.params : props.params;
  const steps = resolvedParams?.register || [];
  console.log(resolvedParams);
  console.log(steps);
  return <RegisterSteps steps={steps} />;
}

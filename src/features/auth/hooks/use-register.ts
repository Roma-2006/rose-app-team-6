import { useRouter } from '@/i18n/navigation';
import { useMutation } from '@tanstack/react-query';
import { TRegisterFields, TUseRegisterProps } from '../types/register';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { registerAction } from '../actions/register.action';

export default function useRegister({ setErrors, setUserInfo, setStep }: TUseRegisterProps) {
  const router = useRouter();
  const t = useTranslations('auth.auth-register.create-password');
  return useMutation({
    mutationFn: async (fields: TRegisterFields) => {
      const response = await registerAction(fields);
      if (response && !response.status) throw response.errors ? response.errors : response.message;
      return response;
    },
    onSuccess: (data) => {
      setErrors([]);
      setUserInfo({});
      toast.success(t('success'));
      router.push('/login');
    },
    onError: (data) => {
      if (data) {
        if (Array.isArray(data)) {
          setErrors(data);
          const paths = data.map((err) => err.path);
          if (
            paths?.includes('username') ||
            paths?.includes('firstName') ||
            paths?.includes('lastName') ||
            paths?.includes('gender')
          ) {
            setStep('user-info');
          }
        } else if (typeof data === 'string') {
          const error = data as string;
          if (error.includes('username')) {
            setErrors([{ path: 'username', message: error }]);
            setStep('user-info');
          } else if (error.includes('phone')) {
            setErrors([{ path: 'phone', message: error }]);
            setStep('user-info');
          }
          if (error.includes('verify')) {
            setErrors([{ path: 'verify', message: error }]);
            setStep('register');
          }
        }
      }
    },
  });
}
// This phone number is already registered.

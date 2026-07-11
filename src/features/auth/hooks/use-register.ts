import { useRouter } from '@/i18n/navigation';
import { useMutation } from '@tanstack/react-query';
import { TRegisterFields } from '../types/register';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export default function useRegister() {
  const router = useRouter();
  const t = useTranslations('auth.auth-register.create-password');
  return useMutation({
    mutationFn: async (fields: TRegisterFields) => {
      const response = await fetch(`/api/register`, {
        method: 'POST',
        body: JSON.stringify(fields),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const payload = await response.json();
      console.log(payload);
      if (payload && !payload.status) throw payload.errors ? payload.errors : payload.message;
      return payload;
    },
    onSuccess: (data, variables) => {
      console.log(data, 'successRegister');
      sessionStorage.removeItem(`register-user-info-${variables.email}`);
      sessionStorage.removeItem('register-error');
      toast.success(t('success'));
      router.push('/login');
    },
    onError: (data, variables) => {
      if (data) {
        if (Array.isArray(data)) {
          const paths = data.map((err) => err.path);
          if (
            paths?.includes('username') ||
            paths?.includes('firstName') ||
            paths?.includes('lastName') ||
            paths?.includes('gender')
          ) {
            router.push(`/register/user-info?email=${encodeURIComponent(variables.email)}`);
          }
        }
        console.log(data, 'errorRegister');
        sessionStorage.setItem('register-error', JSON.stringify(data));
      }
    },
  });
}

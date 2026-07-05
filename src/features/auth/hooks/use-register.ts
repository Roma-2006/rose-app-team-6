import { useRouter } from '@/i18n/navigation';
import { useMutation } from '@tanstack/react-query';
import { TRegisterFields, TRegisterResponse } from '../types/register';
import { TApiResponce } from '@/shared/types/api';
import { TUser } from '../types/user';

export default function useRegister() {
  const router = useRouter();
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
    onSuccess: (data) => {
      console.log(data, 'successRegister');
      // router.push("/login")
      // location.href="/login"
    },
    onError: (data) => {
      console.log(data, 'errorRegister');
    },
  });
}

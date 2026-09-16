import { useMutation } from '@tanstack/react-query';
import { deleteProfileAction } from '../actions/profile.action';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { signOut } from 'next-auth/react';
import { useRouter } from '@/i18n/navigation';
export default function useDeleteProfile() {
  const t = useTranslations();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      const response = await deleteProfileAction();
      if (!response.status) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: async (data) => {
      if (data.status) {
        await signOut({ redirect: false });
        router.replace('/login');
      }
      console.log(data, 's');
      toast.success(t('account-settings.profile.delete-success'));
    },
    onError: (error) => {
      console.log(error, 'e');
      toast.success(t('account-settings.profile.delete-error'));
    },
  });
}

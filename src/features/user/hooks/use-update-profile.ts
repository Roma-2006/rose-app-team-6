import { useMutation } from '@tanstack/react-query';
import { ProfileFields } from '../types/profile';
import { updateProfileAction } from '../actions/profile.action';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { ValidationError } from '@/shared/types/api';

export default function useUpdateProfile(setErrors: (errors: ValidationError[]) => void) {
  const t = useTranslations();
  return useMutation({
    mutationFn: async (fields: ProfileFields) => {
      const response = await updateProfileAction({ fields });
      if (response && !response.status) throw response.errors ? response.errors : response.message;
      return response;
    },
    onSuccess: (data) => {
      toast.success(t('account-settings.profile.update-success'));
    },
    onError: (data) => {
      console.log(data, 'eeeeeeeeeee');
      if (Array.isArray(data)) {
        setErrors(data);
      } else if (typeof data === 'string') {
        setErrors([
          {
            path: 'phone',
            message: data,
          },
        ]);
      }
      toast.error(t('account-settings.profile.update-error'));
    },
  });
}

import { useMutation } from '@tanstack/react-query';
import { ProfileFields } from '../types/profile';
import { updateProfileAction } from '../actions/profile.action';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { ValidationError } from '@/shared/types/api';
import { useSession } from 'next-auth/react';
export default function useUpdateProfile(setErrors: (errors: ValidationError[]) => void) {
  const t = useTranslations();
  const { update } = useSession();
  return useMutation({
    mutationFn: async (fields: ProfileFields) => {
      const response = await updateProfileAction({ fields });
      if (response && !response.status) throw response.errors ? response.errors : response.message;
      return response;
    },
    onSuccess: async (data, variables) => {
      const updatedUser = data.payload.user;
      await update({
        firstName: variables.firstName,
        lastName: variables.lastName,
        photo: updatedUser.photo,
      });
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

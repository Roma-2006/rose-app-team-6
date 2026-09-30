'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  ChangePasswordFormValues,
  changePasswordSchema,
} from '@/features/dashboard/schemas/chanage-password.schema';
import { changePassword } from '@/features/dashboard/apis/change-password.api';

const DEFAULT_VALUES: ChangePasswordFormValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export function useChangePassword() {
  const t = useTranslations('dashboard.account.change-password');

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema(t)),
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await changePassword(data);

      toast.success(t('success'));

      form.reset(DEFAULT_VALUES);
    } catch (err) {
      const message = err instanceof Error ? err.message : t('errors.something-went-wrong');

      form.reset(DEFAULT_VALUES);

      toast.error(message);

      form.setFocus('currentPassword');
    }
  });

  return {
    form,
    onSubmit,
    isLoading: form.formState.isSubmitting,
  };
}

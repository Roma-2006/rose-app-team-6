'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

import { changePassword } from '../apis/change-password.api';
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from '../schemas/chanage-password.schema';

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

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: ChangePasswordFormValues) => changePassword(data),
    onSuccess: () => {
      toast.success(t('success'));
      form.reset(DEFAULT_VALUES);

      signOut({ callbackUrl: '/login' });
    },
    onError: (err) => {
      const message = err instanceof Error ? err.message : t('errors.something-went-wrong');

      form.reset(DEFAULT_VALUES);
      toast.error(message);
      form.setFocus('currentPassword');
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(data).catch(() => {});
  });

  return {
    form,
    onSubmit,
    isLoading: isPending,
  };
}

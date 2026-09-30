'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { ChangePasswordPayload, ActionResponse } from '../types/api';
import { changePasswordAction } from '../actions/change-pass.action';

interface UseChangePasswordResult {
  mutation: UseMutationResult<ActionResponse, Error, ChangePasswordPayload>;
  changePassword: (data: ChangePasswordPayload, options?: { onSuccess?: () => void }) => void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
}

export function useChangePassword(): UseChangePasswordResult {
  const mutation = useMutation<ActionResponse, Error, ChangePasswordPayload>({
    mutationFn: async (data: ChangePasswordPayload) => {
      const result = await changePasswordAction(data);
      if (!result.success) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: () => {
      setTimeout(() => {
        signOut({ callbackUrl: '/login' });
      }, 1000);
    },
  });

  return {
    mutation,
    changePassword: (data, options) => {
      mutation.mutate(data, {
        onSuccess: () => {
          if (options?.onSuccess) options.onSuccess();
        },
      });
    },
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error ? mutation.error.message : null,
  };
}

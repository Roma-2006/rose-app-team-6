'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { ChangePasswordPayload } from '../types/api';
import { changePasswordAction } from '../actions/change-pass.action';

interface UseChangePasswordResult {
  mutation: UseMutationResult<string, Error, ChangePasswordPayload>;
  changePassword: (data: ChangePasswordPayload) => void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
}

export function useChangePassword(): UseChangePasswordResult {
  // Mutation
  const mutation = useMutation<string, Error, ChangePasswordPayload>({
    mutationFn: async (data: ChangePasswordPayload) => {
      return await changePasswordAction(data);
    },
    onSuccess: () => {
      signOut({ callbackUrl: '/login' });
    },
    onError: (error: Error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Mutation Error:', error.message);
      }
    },
  });

  return {
    mutation,
    changePassword: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
}

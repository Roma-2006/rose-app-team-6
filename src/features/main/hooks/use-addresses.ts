// 'use client';

// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { useTranslations } from 'next-intl';
// import { toast } from 'sonner';

// import {
//   getAddressesAction,
//   createAddressAction,
//   updateAddressAction,
//   deleteAddressAction,
// } from '../api/address-model.api';

// import type { CreateAddressRequest, UpdateAddressRequest } from '../types/address-model';

// export const addressesKeys = {
//   all: ['addresses'] as const,
// };

// export function useAddresses() {
//   const queryClient = useQueryClient();
//   const t = useTranslations('address');

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: addressesKeys.all,
//     queryFn: getAddressesAction,
//   });

//   const invalidate = () =>
//     queryClient.invalidateQueries({
//       queryKey: addressesKeys.all,
//     });

//   const createMutation = useMutation({
//     mutationFn: (data: CreateAddressRequest) => createAddressAction(data),
//     onSuccess: () => {
//       invalidate();
//       toast.success(t('added'));
//     },
//     onError: (error: Error) => {
//       toast.error(error.message);
//     },
//   });

//   const updateMutation = useMutation({
//     mutationFn: ({ id, data }: { id: string; data: UpdateAddressRequest }) => {
//       console.log('update mutation');
//       return updateAddressAction(id, data);
//     },
//     onSuccess: () => {
//       invalidate();
//       toast.success(t('updated'));
//     },
//     onError: (error: Error) => {
//       toast.error(error.message);
//     },
//   });

//   const deleteMutation = useMutation({
//     mutationFn: (id: string) => deleteAddressAction(id),
//     onSuccess: () => {
//       invalidate();
//       toast.success(t('deleted'));
//     },
//     onError: (error: Error) => {
//       toast.error(error.message);
//     },
//   });

//   return {
//     addresses: data ?? [],
//     isLoading,
//     isError,
//     error,
//     createAddress: createMutation.mutateAsync,
//     updateAddress: updateMutation.mutateAsync,
//     deleteAddress: deleteMutation.mutateAsync,
//     isMutating: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
//   };
// }

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import {
  getAddressesAction,
  createAddressAction,
  updateAddressAction,
  deleteAddressAction,
} from '../api/address-model.api';

import type { CreateAddressRequest, UpdateAddressRequest } from '../types/address-model';

export const addressesKeys = {
  all: ['addresses'] as const,
};

export function useAddresses() {
  const queryClient = useQueryClient();
  const t = useTranslations('address');

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: addressesKeys.all,
    queryFn: getAddressesAction,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: addressesKeys.all,
    });

  const createMutation = useMutation({
    mutationFn: (data: CreateAddressRequest) => createAddressAction(data),
    onSuccess: () => {
      invalidate();
      toast.success(t('added'));
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAddressRequest }) =>
      updateAddressAction(id, data),
    onSuccess: () => {
      invalidate();
      toast.success(t('updated'));
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAddressAction(id),
    onSuccess: () => {
      invalidate();
      toast.success(t('deleted'));
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    addresses: data ?? [],
    isLoading,
    isError,
    error,
    refetch,
    createAddress: createMutation.mutateAsync,
    updateAddress: updateMutation.mutateAsync,
    deleteAddress: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isMutating: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
  };
}

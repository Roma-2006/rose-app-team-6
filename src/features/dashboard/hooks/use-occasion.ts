import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOccasionAction } from '../actions/occasions/create-occasion.action';
import { CreateOccasionType } from '../types/occasions/occasions';
import { updateOccasionAction } from '../actions/occasions/update-occasion.action';
import { deleteOccasionAction } from '../actions/occasions/delete-occasion.action';

export function useOccasion() {
  const queryClient = useQueryClient();

  // 1. Mutation
  const createMutation = useMutation({
    mutationFn: async (data: CreateOccasionType) => {
      const res = await createOccasionAction(data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['occasions'] });
    },
  });

  // 2. Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateOccasionType> }) => {
      const res = await updateOccasionAction({ id, data });
      if (!res.success) throw new Error(res.message);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['occasions'] });
    },
  });

  // 3. Mutation الحذف
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteOccasionAction(id);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['occasions'] });
    },
  });

  return {
    createOccasion: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error,

    updateOccasion: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,

    deleteOccasion: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error,
  };
}

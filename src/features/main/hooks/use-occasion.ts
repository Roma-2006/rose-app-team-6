import { createOccasionAction } from '@/features/dashboard/actions/occasions/create-occasion.action';
import { deleteOccasionAction } from '@/features/dashboard/actions/occasions/delete-occasion.action';
import { updateOccasionAction } from '@/features/dashboard/actions/occasions/update-occasion.action';
import { CreateOccasionType } from '@/features/dashboard/types/occasions/occasions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

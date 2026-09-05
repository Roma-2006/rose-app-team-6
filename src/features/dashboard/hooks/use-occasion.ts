import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateCategoryType } from '../types/categories/categories';
import { createCategoryAction } from '../actions/categories/create-category.action';
import { updateCategoryAction } from '../actions/categories/update-category.action';
import { deleteCategoryAction } from '../actions/categories/delete-category.action';

export function useOccasion() {
  const queryClient = useQueryClient();

  // 1. Mutation
  const createMutation = useMutation({
    mutationFn: async (data: CreateCategoryType) => {
      const res = await createCategoryAction(data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  // 2. Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateCategoryType> }) => {
      const res = await updateCategoryAction({ id, data });
      if (!res.success) throw new Error(res.message);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  // 3. Mutation الحذف
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteCategoryAction(id);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return {
    createCategory: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error,

    updateCategory: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,

    deleteCategory: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error,
  };
}

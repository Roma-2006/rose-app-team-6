import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateCategoryType } from '../types/categories';
import { createCategoryAction } from '../actions/categories/create-category.action';
import { updateCategoryAction } from '../actions/categories/update-category.action';
import { deleteCategoryAction } from '../actions/categories/delete-category.action';

export function useCategory() {
  const queryClient = useQueryClient();

  // Mutation الإضافة
  const createMutation = useMutation({
    mutationFn: (data: CreateCategoryType) => createCategoryAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  // Mutation التعديل
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateCategoryType> }) =>
      updateCategoryAction({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  // Mutation الحذف
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCategoryAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return {
    createCategory: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateCategory: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteCategory: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}

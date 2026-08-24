import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateCategoryType } from '../types/categories/categories';
import { createCategoryAction } from '../actions/categories/create-category.action';
import { updateCategoryAction } from '../actions/categories/update-category.action';
import { deleteCategoryAction } from '../actions/categories/delete-category.action';

export function useCategory() {
  const queryClient = useQueryClient();

  // 1. Mutation الإضافة
  const createMutation = useMutation({
    mutationFn: (data: CreateCategoryType) => createCategoryAction(data),
    onSuccess: () => {
      // إجبار كاش المكونات على التحديث الفوري وتصفير الذاكرة المخزنة
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  // 2. Mutation التعديل
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateCategoryType> }) =>
      updateCategoryAction({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  // 3. Mutation الحذف
  const deleteMutation = useMutation({
    // تعديل الـ Fn لتمرير الكائن المحتوي على المعرف والـ token
    mutationFn: ({ id, token }: { id: string; token: string }) => deleteCategoryAction(id, token),
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

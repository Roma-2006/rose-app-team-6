import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IAddReviewFormData } from '../types/product-reviews';
import { CreateReviewAction } from '../actions/review.action';

export function UseReview(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IAddReviewFormData) => CreateReviewAction({ ...data, productId }),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['product-reviews', productId] });
      }
    },
  });
}

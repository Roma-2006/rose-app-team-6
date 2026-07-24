import { useQuery } from '@tanstack/react-query';
import type { GetProductsParams } from '@/shared/types/product-query';
import { getProducts } from '@/features/dashboard/apis/product.api';

export const useProducts = (params: GetProductsParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  });
};

import { useQuery } from '@tanstack/react-query';
import type { GetProductsParams } from '@/features/dashboard/types/product-query';
import { getProducts } from '@/features/dashboard/api/product.api';

export const useProducts = (params: GetProductsParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  });
};

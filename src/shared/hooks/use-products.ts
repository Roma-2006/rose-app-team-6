import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/shared/api/product.api';
import type { GetProductsParams } from '@/shared/types/product-query-type';

export const useProducts = (params: GetProductsParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  });
};

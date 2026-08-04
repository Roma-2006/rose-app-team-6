import { getProducts } from '@/features/dashboard/apis/product.api';
import { GetProductsParams } from '@/shared/types/product-query';
import { useQuery } from '@tanstack/react-query';

export default function useAllProducts(params: GetProductsParams, enabled = true) {
  return useQuery({
    queryKey: ['AllProducts', params],
    queryFn: () => getProducts(params),
    enabled,
  });
}

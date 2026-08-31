import { getProducts } from '@/features/main/api/product.api';
import { useQuery } from '@tanstack/react-query';
import { GetProductsParams } from '../types/product-query';

export default function useAllProducts(params: GetProductsParams, enabled = true) {
  return useQuery({
    queryKey: ['AllProducts', params],
    queryFn: () => getProducts(params),
    enabled,
  });
}

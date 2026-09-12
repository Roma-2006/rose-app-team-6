import { useQuery } from '@tanstack/react-query';
import { GetProductsParams } from '../types/product-query';
import { getProducts } from '../api/product.api';

export default function useAllProducts(params: GetProductsParams, enabled = true) {
  return useQuery({
    queryKey: ['AllProducts', params],
    queryFn: () => getProducts(params),
    enabled,
  });
}

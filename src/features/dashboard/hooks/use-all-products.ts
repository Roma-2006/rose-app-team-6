import { getProducts } from '@/features/dashboard/apis/product.api';

import { GetProductsParams } from '@/features/dashboard/types/product-query';
import { useQuery } from '@tanstack/react-query';

export default function UseAllProducts(params: GetProductsParams, enabled = true) {
  return useQuery({
    queryKey: ['AllProducts', params],
    queryFn: () => getProducts(params),
    enabled,
  });
}

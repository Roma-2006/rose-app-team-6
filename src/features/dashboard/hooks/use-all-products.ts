import { getProducts } from '@/features/dashboard/api/product.api';
import { GetProductsParams } from '@/shared/types/product-query';
import { useQuery } from '@tanstack/react-query';

export default function UseAllProducts(params: GetProductsParams) {
  return useQuery({
    queryKey: ['AllProducts', params],
    queryFn: () => getProducts(params),
  });
}

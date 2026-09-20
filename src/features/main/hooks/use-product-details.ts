import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../api/product-details.api';

export function useProductDetails(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
}

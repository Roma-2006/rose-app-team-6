import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/product.api';
const BEST_SELLING_LIMIT = 6;
export const useBestSellingProducts = () => {
  return useQuery({
    queryKey: ['products', 'best-selling'],
    queryFn: async () => {
      const products = await getProducts();
      return products
        .sort((a, b) => (b._count?.cartItems ?? 0) - (a._count?.cartItems ?? 0))
        .slice(0, BEST_SELLING_LIMIT);
    },
  });
};

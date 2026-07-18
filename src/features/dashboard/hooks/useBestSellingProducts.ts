import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/product.api';

const BEST_SELLING_LIMIT = 6;

export const useBestSellingProducts = () => {
  return useQuery({
    queryKey: ['products', 'best-selling'],
    queryFn: () => getProducts(undefined, BEST_SELLING_LIMIT, 'bestSelling'),
  });
};

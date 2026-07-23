import { getProducts } from '@/features/dashboard/apis/product.api';
import { BestSellingSectionClient } from './bestselling-client';

const BEST_SELLING_LIMIT = 6;

export const BestSellingSection = async () => {
  const products = await getProducts({
    limit: BEST_SELLING_LIMIT,
    sortBy: 'bestSelling',
    sortOrder: 'desc',
  });
  return <BestSellingSectionClient products={products?.data} isLoading={false} />;
};

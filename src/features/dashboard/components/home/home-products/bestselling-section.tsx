import { getProducts } from '@/features/dashboard/apis/product.api';
import { BestSellingSectionClient } from './bestselling-client';

export const BestSellingSection = async () => {
  const products = await getProducts({
    limit: 6,
    sortBy: 'bestSelling',
    sortOrder: 'desc',
  });
  return <BestSellingSectionClient products={products?.data} isLoading={false} />;
};

import { Suspense } from 'react';
import { getProducts } from '@/features/dashboard/apis/product.api';
import { BestSellingSectionClient } from './bestselling-client';
import { BestSellingSectionLoading } from './bestselling-loading';

const BestSellingSectionContent = async () => {
  const products = await getProducts({
    limit: 6,
    sortBy: 'bestSelling',
    sortOrder: 'desc',
  });
  return <BestSellingSectionClient products={products?.data} />;
};

export const BestSellingSection = () => {
  return (
    <Suspense fallback={<BestSellingSectionLoading />}>
      <BestSellingSectionContent />
    </Suspense>
  );
};

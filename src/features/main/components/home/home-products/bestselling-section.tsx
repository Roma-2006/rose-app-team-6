import { Suspense } from 'react';
<<<<<<< HEAD
=======
import { getProducts } from '@/features/main/api/product.api';
>>>>>>> 659edca08438c8fbdee261fbaa779f8ba3e26173
import { BestSellingSectionClient } from './bestselling-client';
import { BestSellingSectionLoading } from './bestselling-loading';
import { getProducts } from '@/features/main/api/product.api';

const BestSellingSectionContent = async () => {
  const products = await getProducts({
    limit: 6,
    sortBy: 'bestSelling',
    sortOrder: 'desc',
  });
  return <BestSellingSectionClient products={products?.data} isLoading={false} />;
};

export const BestSellingSection = () => {
  return (
    <Suspense fallback={<BestSellingSectionLoading />}>
      <BestSellingSectionContent />
    </Suspense>
  );
};

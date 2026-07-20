import { getProducts } from '../../../api/product.api';

import { BestSellingSectionClient } from './BestSellingSection.client';

const BEST_SELLING_LIMIT = 6;

export const BestSellingSection = async () => {
  const products = await getProducts(undefined, BEST_SELLING_LIMIT, 'bestSelling');

  return <BestSellingSectionClient products={products} isLoading={false} />;
};

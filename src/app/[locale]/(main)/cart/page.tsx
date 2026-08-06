import { getProducts } from '@/features/main/api/product.api';
import CartPageClient from './cart-page-client';

export default async function Page() {
  const products = await getProducts({
    limit: 6,
    sortBy: 'bestSelling',
    sortOrder: 'desc',
  });
  return <CartPageClient suggestedProducts={products?.data ?? []} />;
}

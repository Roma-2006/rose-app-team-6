import { getProducts } from '@/features/main/api/product.api';
import { getAuthToken } from '@/features/main/lib/get-auth-token';
import { getCart } from '@/features/main/api/cart';
import type { GetCartResponse } from '@/features/main/types/server-cart';
import CartPageClient from './cart-page-client';

export default async function Page() {
  const products = await getProducts({
    limit: 6,
    sortBy: 'bestSelling',
    sortOrder: 'desc',
  });

  let initialCart: GetCartResponse = {
    payload: {
      cartItems: [],
    },
  };
  try {
    const token = await getAuthToken();
    initialCart = await getCart(token);
  } catch {
    // Guests have no server cart; the client falls back to the localStorage cart.
  }

  return <CartPageClient suggestedProducts={products?.data ?? []} />;
}

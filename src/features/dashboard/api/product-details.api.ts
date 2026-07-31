import { ProductDetailsResponse } from '../types/product-details.types';

export async function getProductById(id: string): Promise<ProductDetailsResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch product details. Status: ${response.status}`);
  }

  return response.json();
}

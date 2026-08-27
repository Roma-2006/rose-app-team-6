import { ProductDetailsResponse } from '../types/product-details.types';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function getProductById(id: string): Promise<ProductDetailsResponse> {
  if (!id || !UUID_REGEX.test(id)) {
    return {
      status: false,
      code: 400,
      payload: {
        product: null as never,
      },
    };
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    return {
      status: false,
      code: response.status,
      payload: {
        product: null as never,
      },
    };
  }

  return response.json();
}

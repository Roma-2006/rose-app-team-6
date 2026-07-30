import { Product } from '../types/products';

export interface IRelatedProductsProps {
  categoryId?: string;
  subCategoryId?: string;
  search?: string;
  currentProductId: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

interface IApiResponse {
  payload?:
    | {
        products?: Product[];
        data?: Product[];
      }
    | Product[];
}

export async function getRelatedProducts({
  categoryId,
  subCategoryId,
  search,
  currentProductId,
  minPrice,
  maxPrice,
  minRating,
}: IRelatedProductsProps): Promise<Product[]> {
  try {
    const params = new URLSearchParams();

    // Request 25 items to guarantee enough data after local filtering
    params.append('limit', '25');

    // Append supported query parameters to the server request
    if (subCategoryId) params.append('subCategoryId', subCategoryId);
    if (categoryId) params.append('categoryId', categoryId);
    if (search) params.append('search', search.trim().substring(0, 200));
    if (minPrice !== undefined) params.append('minPrice', minPrice.toString());
    if (maxPrice !== undefined) params.append('maxPrice', maxPrice.toString());
    if (minRating !== undefined) {
      params.append('minRating', minRating.toString());
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?${params.toString()}`,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) return [];

    const data = (await response.json()) as IApiResponse;
    let products: Product[] = [];

    // Parse the products array based on response payload structure
    if (data?.payload && typeof data.payload === 'object' && !Array.isArray(data.payload)) {
      products = data.payload.products || data.payload.data || [];
    } else if (Array.isArray(data?.payload)) {
      products = data.payload;
    } else if (Array.isArray(data)) {
      products = data as unknown as Product[];
    }

    if (!Array.isArray(products)) return [];

    // Filter out the current product and slice the first 20 results for the carousel
    return products
      .filter((filteredProduct: Product) => filteredProduct.id !== currentProductId)
      .slice(0, 20);
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

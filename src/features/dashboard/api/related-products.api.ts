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
    // Strategy 1: Full filters (category, price, rating)
    const params1 = new URLSearchParams();
    params1.append('limit', '25');
    if (subCategoryId) params1.append('subCategoryId', subCategoryId);
    if (categoryId) params1.append('categoryId', categoryId);
    if (minPrice !== undefined) params1.append('minPrice', minPrice.toString());
    if (maxPrice !== undefined) params1.append('maxPrice', maxPrice.toString());
    if (minRating !== undefined) params1.append('minRating', minRating.toString());

    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?${params1.toString()}`,
      { method: 'GET', headers: { Accept: 'application/json' }, next: { revalidate: 3600 } }
    );

    if (response.ok) {
      const products = extractProducts(await response.json());
      const filtered = products.filter((p) => p.id !== currentProductId);
      if (filtered.length > 0) return filtered.slice(0, 20);
    }

    // Strategy 2: Category + subcategory only (drop price/rating)
    const params2 = new URLSearchParams();
    params2.append('limit', '25');
    if (subCategoryId) params2.append('subCategoryId', subCategoryId);
    if (categoryId) params2.append('categoryId', categoryId);

    response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?${params2.toString()}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      const products = extractProducts(await response.json());
      const filtered = products.filter((p) => p.id !== currentProductId);
      if (filtered.length > 0) return filtered.slice(0, 20);
    }

    // Strategy 3: Price/rating range only (drop category)
    const params3 = new URLSearchParams();
    params3.append('limit', '25');
    if (minPrice !== undefined) params3.append('minPrice', minPrice.toString());
    if (maxPrice !== undefined) params3.append('maxPrice', maxPrice.toString());
    if (minRating !== undefined) params3.append('minRating', minRating.toString());

    response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?${params3.toString()}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      const products = extractProducts(await response.json());
      const filtered = products.filter((p) => p.id !== currentProductId);
      if (filtered.length > 0) return filtered.slice(0, 20);
    }

    // Strategy 4: Just get top rated products
    const params4 = new URLSearchParams();
    params4.append('limit', '25');
    params4.append('minRating', '0');
    params4.append('sortBy', 'rating');
    params4.append('sortOrder', 'desc');

    response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?${params4.toString()}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      const products = extractProducts(await response.json());
      const filtered = products.filter((p) => p.id !== currentProductId);
      if (filtered.length > 0) return filtered.slice(0, 20);
    }

    return [];
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

function extractProducts(data: IApiResponse): Product[] {
  let products: Product[] = [];

  if (data?.payload && typeof data.payload === 'object' && !Array.isArray(data.payload)) {
    products = data.payload.products || data.payload.data || [];
  } else if (Array.isArray(data?.payload)) {
    products = data.payload;
  } else if (Array.isArray(data)) {
    products = data as unknown as Product[];
  }

  return Array.isArray(products) ? products : [];
}

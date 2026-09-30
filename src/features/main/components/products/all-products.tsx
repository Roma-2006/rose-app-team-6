import { Product, TAllProductsProps } from '../../types/products';
import { ProductCard } from '../home/home-products/Product-card';
import ProductPagination from './product-pagination';
import { getProducts } from '../../api/product.api';
import { getTranslations } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';
export default async function AllProducts({ searchParams }: TAllProductsProps) {
  const locale = await getLocale();
  // Translation
  const t = await getTranslations('products');
  // Variables
  const createPageUrl = (page: number) => {
    const newParams = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined) {
        newParams.set(key, String(value));
      }
    });

    newParams.set('page', String(page));

    return `/products?${newParams.toString()}`;
  };
  // const currentPage = Number(searchParams.page)||1;
  const rawPage = Number(searchParams.page);
  const currentPage = Number.isNaN(rawPage) ? 1 : rawPage;
  // handle 0 and negative pages before fetching
  if (currentPage <= 0) {
    redirect({
      href: createPageUrl(1),
      locale,
    });
  }
  // const safePage = currentPage <= 0 ? 1 : currentPage;
  const productFilters = {
    page: currentPage,
    limit: Number(searchParams.limit) || 12,
    occasionId: searchParams.occasionId,
    categoryId: searchParams.categoryId,
    subCategoryId: searchParams.subCategoryId,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    minRating: searchParams.minRating ? Number(searchParams.minRating) : undefined,
    sortBy: searchParams.sortBy,
    sortOrder: searchParams.sortOrder,
  };
  let products;
  try {
    products = await getProducts(productFilters);
  } catch (error) {
    return (
      <div className="flex items-center justify-center py-10">
        <p>{error instanceof Error && error.message}</p>
      </div>
    );
  }
  // handle page greater than total pages
  if (products?.metadata && currentPage > products.metadata.totalPages) {
    redirect({
      href: createPageUrl(products.metadata.totalPages),
      locale,
    });
  }
  return (
    <>
      <div className="  grid  md:grid-cols-2  xl:grid-cols-3 gap-4 2xl:grid-cols-4">
        {products?.data.length ? (
          products.data.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>{t('grid.product-empty')}</p>
        )}
      </div>
      {products?.metadata && <ProductPagination productMetaData={products?.metadata} />}
    </>
  );
}

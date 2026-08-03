import { Product, TAllProductsProps } from '../../types/products';
import { ProductCard } from '../home/home-products/Product-card';
import ProductPagination from './product-pagination';
import { redirect } from 'next/navigation';
import { getProducts } from '../../apis/product.api';
import { getTranslations } from 'next-intl/server';
export default async function AllProducts({ searchParams }: TAllProductsProps) {
  // Translation
  const t = await getTranslations('products');
  // Variables
  const currentPage = Number(searchParams.page) || 1;
  const safePage = currentPage < 1 ? 1 : currentPage;
  const productFilters = {
    page: safePage,
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
  // Navigation
  if ((products?.metadata && currentPage > products?.metadata.totalPages) || currentPage < 1) {
    const newParams = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, String(value));
      }
    });
    newParams.set('page', currentPage < 1 ? '1' : String(products?.metadata.totalPages));
    redirect(`/products?${newParams.toString()}`);
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

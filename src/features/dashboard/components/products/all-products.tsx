import useAllProducts from '../../hooks/use-all-products';
import { Product, TAllProductsProps } from '../../types/products';
import { ProductCard } from '../home/home-products/Product-card';
import { ProductCardSkeleton } from '../home/home-products/product-card-skelton';
import ProductPagination from './product-pagination';
import { redirect } from 'next/navigation';
import { getProducts } from '../../apis/product.api';
import { getTranslations } from 'next-intl/server';
export default async function AllProducts({ searchParams }: TAllProductsProps) {
  // Translation
  const t = await getTranslations('products');
  // Variables
  const productFilters = {
    page: Number(searchParams.page) || 1,
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
  const products = await getProducts(productFilters);
  const currentPage = Number(searchParams.page) || 1;
  // Navigation
  if (products?.metadata && currentPage > products?.metadata.totalPages) {
    const newParams = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, String(value));
      }
    });
    newParams.set('page', String(products.metadata.totalPages));
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

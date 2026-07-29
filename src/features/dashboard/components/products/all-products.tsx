'use client';
import UseAllProducts from '../../hooks/use-all-products';
import { Product, TAllProductsProps } from '../../types/products';
import { ProductCard } from '../home/home-products/Product-card';
import { ProductCardSkeleton } from '../home/home-products/product-card-skelton';
import ProductPagination from './product-pagination';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
export default function AllProducts({ params }: TAllProductsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, isLoading, isError, error } = UseAllProducts(params);
  useEffect(() => {
    const currentPage = params.page ?? 1;
    if (data?.metadata && currentPage > data.metadata.totalPages) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('page', String(data.metadata.totalPages));
      router.replace(`/products?${newParams.toString()}`);
    }
  }, [data, params.page, router, searchParams]);
  return (
    <>
      <div className="  grid  md:grid-cols-2  xl:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, index) => <ProductCardSkeleton key={index} />)
        ) : isError ? (
          <p>{error.message}</p>
        ) : data?.data.length ? (
          data.data.map((product: Product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>No products found matching your filters.</p>
        )}
      </div>
      {data?.metadata && <ProductPagination productMetaData={data?.metadata} />}
    </>
  );
}

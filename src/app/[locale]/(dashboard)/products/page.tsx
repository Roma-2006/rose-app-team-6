import AllProducts from '@/features/dashboard/components/products/all-products';
import { ProductGridSkeleton } from '@/features/dashboard/components/products/product-grid-skeleton';
import { TProductsPageProps } from '@/features/dashboard/types/products';
import { Suspense } from 'react';

export default async function ProductsPage({ searchParams }: TProductsPageProps) {
  const params = await searchParams;
  return (
    <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <section className="bg-red-600 lg:col-span-3">nesreen</section>
      <section className=" lg:col-span-9 grid gap-6">
        <Suspense fallback={<ProductGridSkeleton />}>
          <AllProducts searchParams={params} />
        </Suspense>
      </section>
    </main>
  );
}

import AllProducts from '@/features/main/components/products/all-products';

import { ProductGridSkeleton } from '@/features/main/components/skeleton/product-grid-skeleton';

import { TProductsPageProps } from '@/features/main/types/products';
import { Suspense } from 'react';
import Filter from '@/shared/components/custom-ui/products/filter/general/filter';

export default async function ProductsPage({ searchParams }: TProductsPageProps) {
  const params = await searchParams;
  return (
    <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <section className="lg:col-span-3">
        <Filter />
      </section>
      <section className=" lg:col-span-9 grid gap-6">
        <Suspense fallback={<ProductGridSkeleton />}>
          <AllProducts searchParams={params} />
        </Suspense>
      </section>
    </main>
  );
}

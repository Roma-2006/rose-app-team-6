import AllProducts from '@/features/dashboard/components/products/all-products';
import { TProductsPageProps } from '@/features/dashboard/types/products';
import Filter from '@/shared/components/custom-ui/products/filter/general/filter';

export default async function ProductsPage({ searchParams }: TProductsPageProps) {
  const params = await searchParams;
  const productFilters = {
    page: Number(params.page) || 1,
    limit: Number(params.limit) || 12,
    occasionId: params.occasionId,
    categoryId: params.categoryId,
    subCategoryId: params.subCategoryId,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    minRating: params.minRating ? Number(params.minRating) : undefined,
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
  };
  return (
    <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <section className="bg-red-600 lg:col-span-3">nesreen</section>
      <section className="lg:col-span-3">
        <Filter />
      </section>
      <section className=" lg:col-span-9 grid gap-6">
        <AllProducts params={productFilters} />
      </section>
    </main>
  );
}

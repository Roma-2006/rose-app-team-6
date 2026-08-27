import { getProducts } from '@/features/main/api/product.api';
import AllproductsDash from './../../../../features/dashboard/components/products/allproducts-dash';
import { redirect } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';
type productDashProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};
export default async function Page({ searchParams }: productDashProps) {
  const locale = await getLocale();
  const params = await searchParams;
  const pageParam = Number(params.page);
  if (pageParam < 1) {
    redirect({
      href: '/dashboard/products?page=1',
      locale,
    });
  }
  const requestedPage = pageParam || 1;
  const products = await getProducts({ page: requestedPage });
  const totalPages = products.metadata.totalPages;
  if (requestedPage > totalPages) {
    redirect({
      href: `/dashboard/products?page=${totalPages}`,
      locale,
    });
  }
  console.log(products);
  return (
    <>
      <AllproductsDash products={products} />
    </>
  );
}

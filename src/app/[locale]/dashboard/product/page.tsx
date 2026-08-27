import { getProducts } from '@/features/main/api/product.api';
import AllproductsDash from './../../../../features/dashboard/components/products/allproducts-dash';
type productDashProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};
export default async function Page({ searchParams }: productDashProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const products = await getProducts({ page });
  console.log(products, 'products');
  return (
    <>
      <AllproductsDash products={products} />
    </>
  );
}

'use client';
import UseAllProducts from '../../hooks/use-all-products';
import { Product, TAllProductsProps } from '../../types/products';
import { ProductCard } from '../home/home-products/Product-card';
import ProductPagination from './product-pagination';

export default function AllProducts({ params }: TAllProductsProps) {
  const { data } = UseAllProducts(params);
  return (
    <>
      <div className="  grid  md:grid-cols-2  xl:grid-cols-3 gap-4">
        {data &&
          data.data.map((product: Product) => <ProductCard key={product.id} product={product} />)}
      </div>
      {data?.metadata && <ProductPagination productMetaData={data?.metadata} />}
    </>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { ProductCard } from '@/features/main/components/home/home-products/Product-card';
import { ProductCardSkeleton } from '@/features/main/components/skeleton/product-card-skelton'; // تصحيح المسار الفعلي والموحد للهيكل العظمي لمنع فشل الـ Build
import SecTitle from '@/features/main/components/shared/section-title';
import { Carousel } from '@/features/main/components/shared/carousel';
import { Product } from '@/features/main/types/products';

interface IProductsYouMayLikeProps {
  products: Product[];
  isLoading: boolean;
  titleKey?: string;
}

export default function ProductsYouMayLike({
  products = [],
  isLoading,
  titleKey = 'title-2',
}: IProductsYouMayLikeProps) {
  //Translation
  const t = useTranslations('cart');

  //Functions
  if (!isLoading && products.length === 0) return null;

  return (
    <section className="mt-16 w-full">
      <div className="mb-8">
        <SecTitle text={t(titleKey)} />
      </div>
      <div className="flex-1 w-full">
        <Carousel>
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="snap-start">
                  <ProductCardSkeleton />
                </div>
              ))
            : products.map((product) => (
                <div key={product.id} className="snap-start">
                  <ProductCard product={product} />
                </div>
              ))}
        </Carousel>
      </div>
    </section>
  );
}

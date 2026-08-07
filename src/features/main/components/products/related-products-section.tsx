import { getTranslations } from 'next-intl/server';
import { getRelatedProducts } from '../../api/related-products.api';
import { IRelatedProductsSectionProps } from '../../types/products';
import SecTitle from '../shared/section-title';
import { Carousel } from '../shared/carousel';
import { ProductCard } from '../home/home-products/Product-card';

export default async function RelatedProductsSection({ product }: IRelatedProductsSectionProps) {
  const tRelatedProducts = await getTranslations('products.related-products');

  // Transform price from string to number
  const numericPrice = parseFloat(product.price) || 0;

  // Calculating the price range (30% margin above and below)
  const priceMargin = numericPrice * 0.3;
  const minPrice = Math.max(0, numericPrice - priceMargin);
  const maxPrice = numericPrice + priceMargin;

  // Minimum rating calculation: Current product rating minus 1 to ensure ample results
  const currentRating = product.rating || 0;
  const calculatedMinRating = currentRating > 1 ? currentRating - 1 : 0;

  const relatedProducts = await getRelatedProducts({
    categoryId: product.categoryId,
    subCategoryId: product.subCategoryId,
    search: product.title,
    currentProductId: product.id,
    minPrice: Number(minPrice.toFixed(2)),
    maxPrice: Number(maxPrice.toFixed(2)),
    minRating: Math.floor(calculatedMinRating),
  });

  const safeRelatedProducts = (relatedProducts || []).filter(
    (item) => item?.id && item.id !== product.id
  );

  if (!safeRelatedProducts || safeRelatedProducts.length === 0) {
    return (
      <section className="flex flex-col gap-4 w-full mt-12 border-t border-border-soft pt-8">
        <SecTitle text={tRelatedProducts('sec-title')} className="mb-5" />
        <div className="rounded-2xl border border-border-soft bg-bg-plain p-6 text-center text-sm text-text-muted">
          No related products available right now.
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4 w-full mt-12 border-t border-border-soft pt-8">
      <SecTitle text={tRelatedProducts('sec-title')} className="mb-5" />
      <div className="relative flex-1 lg:max-w-5xl w-full">
        <Carousel gap={11}>
          {safeRelatedProducts.map((item) => (
            <div key={item.id} className="snap-start shrink-0  w-49">
              <ProductCard product={item} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

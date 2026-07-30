import { getRelatedProducts } from '../../api/related-products.api';
import { IRelatedProductsSectionProps } from '../../types/products';
import SecTitle from '../shared/section-title';
import RelatedProductsCarousel from './related-products-carousel';

export default async function RelatedProductsSection({ product }: IRelatedProductsSectionProps) {
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

  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <section className="flex flex-col gap-4 w-full mt-12 border-t pt-8">
      <SecTitle text="Related Products" />
      <RelatedProductsCarousel products={relatedProducts} />
    </section>
  );
}

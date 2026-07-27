import { getTranslations } from 'next-intl/server';
import { Star, Package } from 'lucide-react';
import { calculateDiscountedPrice } from '../../utils/calculate-discount';
import { Product } from '../../types/product-details.types';

interface ProductCardProps {
  product: Product & {
    createdAt: string;
    stock?: number;
    id: string;
    title: string;
    originalPrice?: number;
    rating: number;
    ratings: number;
    description: string;
  };
}

export default async function ProductInfo({ product }: ProductCardProps) {
  const t = await getTranslations('products.product-details');

  const rawPrice = Number(product.price) || 0;
  const discountedPrice = calculateDiscountedPrice(product);
  const hasDiscount = Boolean(product.discountType && Number(product.discountValue) > 0);

  return (
    <div className="flex flex-col gap-5 w-full text-start">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-text-plain">{product.title}</h1>

      {/* Price & Stock */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          {hasDiscount && (
            <span className="text-text-muted text-2xl font-bold line-through">
              {rawPrice.toFixed(2)}
            </span>
          )}

          <span className="text-text-plain text-2xl font-bold">
            {discountedPrice.toFixed(2)} {t('currency')}
          </span>
        </div>

        {product.stock !== undefined && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 font-medium text-lg rounded-full bg-bg-muted text-text-plain">
            <Package className="w-5 h-5 text-text-muted shrink-0" />
            <span>
              {product.stock} {t('leftInStock')}
            </span>
          </span>
        )}
      </div>

      <hr className="border-border-subtle my-1" />

      {/* Rating */}
      <div className="flex items-center gap-2 text-sm text-text-muted">
        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
        <span className="font-semibold text-text-plain">
          {t('rating')}: {product.rating}/5
        </span>
        <span className="text-text-info">
          ({product.ratings} {t('ratings')})
        </span>
      </div>

      <hr className="border-border-subtle my-1" />

      {/* Description */}
      <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar">
        <p className="text-sm md:text-base text-text-default leading-relaxed">
          {product.description}
        </p>
      </div>
    </div>
  );
}

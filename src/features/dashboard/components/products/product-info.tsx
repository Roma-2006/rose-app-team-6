'use client';

import { Star, Package } from 'lucide-react';
import { calculateDiscountedPrice } from '../../utils/calculate-discount';
import { Product } from '../../types/product-details.types';
import { ProductActions } from './product-actions';

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
export default function ProductInfo({ product }: ProductCardProps) {
  const rawPrice = Number(product.price) || 0;
  const discountedPrice = calculateDiscountedPrice(product);
  const hasDiscount = product.discountType && Number(product.discountValue) > 0;

  return (
    <div className="flex flex-col gap-5 w-full text-start">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-text-plain">{product.title}</h1>

      {/* Price & Discount */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          {/* rawPrice*/}
          {hasDiscount && (
            <span className="text-text-muted text-2xl font-bold line-through">
              {rawPrice.toFixed(2)}
            </span>
          )}

          {/* discountedPrice*/}
          <span className="text-text-plain text-2xl font-bold">
            {discountedPrice.toFixed(2)} EGP
          </span>
        </div>

        {/* Stock */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 font-medium text-lg rounded-full bg-bg-muted text-text-plain">
          <Package className="w-5 h-5 text-text-muted shrink-0" />
          <span>{product.stock} left in stock</span>
        </span>
      </div>

      <hr className="border-border-subtle my-1" />

      {/* Rating */}
      <div className="flex items-center gap-2 text-sm text-text-muted">
        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
        <span className="font-semibold text-text-plain">Rating: {product.rating}/5</span>
        <span className="text-text-info">({product.ratings} ratings)</span>
      </div>

      <hr className="border-border-subtle my-1" />

      {/* Description */}
      <p className="text-sm md:text-base text-text-default leading-relaxed">
        {product.description}
      </p>

      {/* Button and wishlist */}
      <div className="mt-16">
        <ProductActions productId={product.id} stock={product.stock || 0} />
      </div>
    </div>
  );
}

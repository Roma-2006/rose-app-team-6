'use client';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ShoppingCart, Star, HeartPlus, HeartMinus } from 'lucide-react';
import { calculateDiscountedPrice } from '../../../utils/calculate-discount';
import { useTranslations } from 'next-intl';
import { useProductActions } from '../../../hooks/use-product-actions';
import { Product } from '@/features/main/types/products';
import type { LocalCartProduct } from '@/features/main/types/local-cart';
import { Button } from '@/shared/components/ui/button';
import RatingStarts from '@/shared/components/custom-ui/rating-stars';
import { Badge } from '@/shared/components/ui/badge';

export const ProductCard = ({
  product,
}: {
  product: Product & { createdAt: string; stock?: number };
}) => {
  // Translation
  const t = useTranslations('home.product-card');

  // Variables
  const rawPrice = Number(product.price);

  const discountedPrice = Number(calculateDiscountedPrice(product));

  const hasDiscount = product.discountType && Number(product.discountValue) > 0;

  const created = new Date(product.createdAt);
  const now = new Date();

  const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);

  const isNew = diffDays <= 30;
  const isOutOfStock = Number(product.stock) <= 0;

  const productSnapshot: LocalCartProduct = {
    id: product.id,
    title: product.title,
    cover: product.cover,
    price: product.price,
    discountType: product.discountType === 'NONE' ? null : product.discountType,
    discountValue: product.discountValue,
    rating: product.rating ?? 0,
    ratings: Number(product._count?.reviews ?? 0),
    stock: Number(product.stock ?? 0),
  };
  // Hooks
  const { addToCart, toggleWishlist, isAdding, isWishlisting, isInWishlist } = useProductActions(
    product.id,
    productSnapshot
  );
  return (
    <div className="flex justify-center">
      <div className="w-72 h-96 rounded-2xl flex flex-col gap-6 cursor-pointer group relative">
        {/* Wishlist Button  */}
        <Button
          variant={isInWishlist ? 'primary' : 'outline'}
          buttonVariant="icon"
          loading={isWishlisting}
          onClick={toggleWishlist}
          className="absolute top-3 left-3 z-30 w-9 h-9 rounded-full flex justify-center items-center transition-all active:scale-95 disabled:opacity-50 border-none cursor-pointer"
          iconOnly={isInWishlist ? <HeartMinus /> : <HeartPlus />}
        />

        {/* Image */}
        <Link
          href={`/products/${product.id}`}
          className="relative self-stretch h-64 p-2.5 rounded-2xl overflow-hidden bg-bg-muted block"
        >
          <Image
            src={product.cover}
            alt={product.title}
            fill
            className="object-cover transition-transform group-hover:scale-105 "
          />

          {/* Badges */}
          <div className="absolute top-3 right-3 flex  flex-row gap-1.5 items-end z-10">
            {isNew && <Badge variant="subtle">{t('new')}</Badge>}
            {isOutOfStock && <Badge variant="destructive"> {t('outOfStock')}</Badge>}
          </div>
        </Link>

        <div className="self-stretch px-1 flex flex-col gap-2">
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="text-text-primary self-stretch text-start text-lg font-semibold font-['Sarabun'] leading-6">
              {product.title}
            </h3>
          </Link>
          <div className="flex items-end justify-between">
            <Link href={`/products/${product.id}`} className="block">
              {/* stars */}
              <div className="flex items-center gap-0.5">
                <RatingStarts rating={product.rating} />
              </div>

              <div className="flex items-center gap-2 flex-wrap mt-2">
                <span className="text-text-primary text-base font-bold">
                  {discountedPrice.toFixed(2)} EGP
                </span>

                {hasDiscount && (
                  <span className="text-text-muted text-sm line-through">
                    {rawPrice.toFixed(2)} EGP
                  </span>
                )}
              </div>
            </Link>

            {/* Cart Button  */}
            <Button
              buttonVariant="icon"
              loading={isAdding}
              disabled={isOutOfStock}
              onClick={addToCart}
              variant="secondary"
              className={`w-11 h-11 bg-bg-primary hover:bg-bg-primary rounded-full transition-all cursor-pointer disabled:grayscale disabled:opacity-50`}
              iconOnly={<ShoppingCart className="text-text-inverse" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

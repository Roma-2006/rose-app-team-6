'use client';

import { HeartPlus, ShoppingCart } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useTranslations } from 'next-intl';
import { useProductActions } from '../../hooks/use-product-actions';
import type { LocalCartProduct } from '../../types/local-cart';

export function ProductActions({
  productId,
  stock,
  product,
}: {
  productId: string;
  stock: number;
  product: LocalCartProduct;
}) {
  const t = useTranslations('products');
  const isOutOfStock = Number(stock) <= 0;
  const { addToCart, toggleWishlist, isAdding, isWishlisting, isInWishlist } = useProductActions(
    productId,
    product
  );

  return (
    <>
      <Button
        buttonVariant="icon"
        variant="subtle"
        loading={isWishlisting}
        disabled={isWishlisting}
        className="w-12 h-12 rounded-xl border-none hover:bg-bg-muted"
        onClick={toggleWishlist}
        iconOnly={
          <HeartPlus
            className={
              isInWishlist ? 'text-text-primary size-6' : ' bg-bg-muted text-text-plain size-6'
            }
          />
        }
      />

      {/* cart */}
      <Button
        buttonVariant="text"
        variant="primary"
        className="flex-1 h-12"
        loading={isAdding}
        disabled={isOutOfStock || isAdding}
        onClick={addToCart}
        title={isOutOfStock ? t('outOfStock') : t('addToCart')}
        leftIcon={<ShoppingCart />}
      ></Button>
    </>
  );
}

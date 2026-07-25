'use client';

import { Heart, HeartPlus, ShoppingCart } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useTranslations } from 'next-intl';
import { LoginPromptModal } from '../home/home-products/login-prompt';
import { useState } from 'react';
import { useProductActions } from '../../hooks/use-product-actions';

export function ProductActions({ productId, stock }: { productId: string; stock: number }) {
  const t = useTranslations('product');
  const isOutOfStock = stock <= 0;
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { addToCart, toggleWishlist, isAdding, isWishlisting, isInWishlist } = useProductActions(
    productId,
    () => setShowLoginPrompt(true)
  );

  return (
    <div className="flex items-center gap-4 mt-12">
      <Button
        buttonVariant="icon"
        variant="subtle"
        loading={isWishlisting}
        disabled={isWishlisting}
        className="w-12 h-12 rounded-xl border-none "
        onClick={() => toggleWishlist()}
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
      <LoginPromptModal
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        loginHref="/login"
      />
    </div>
  );
}

'use client';
import { Button } from '@/shared/components/ui/button';
import { Star, Trash2, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import ProductPrice from '@/shared/components/custom-ui/product-price';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import { useRouter } from '@/i18n/navigation';
import { useProductActions } from '../../hooks/use-product-actions';
import { useWishlist } from '../../hooks/use-wishlist';
import { TWishlistItemProps } from '../../types/wishlist';

export default function WishlistItem({ wishlistItem }: TWishlistItemProps) {
  //Translations
  const t = useTranslations();
  //Navigation
  const router = useRouter();
  //Variables
  const isStock = Number(wishlistItem.product.stock) > 0;
  //Hooks
  const { addToCart, isAdding } = useProductActions(wishlistItem.product.id);
  const { removeItemFromWishlistMutation } = useWishlist();
  //Function
  const handleExplore = () => {
    const categoryId = wishlistItem.product.category?.id;
    if (!categoryId) return;
    router.push(`/products?categoryId=${categoryId}`);
  };
  return (
    <div className="flex  gap-4 py-5 border-b border-border-muted">
      <div className="relative w-29.25 h-35 radius-base">
        <Image
          src={wishlistItem.product.cover}
          alt={wishlistItem.product.title}
          fill
          className="object-cover object-center "
        />
        {!isStock && <div className="absolute inset-0 bg-white/70" />}
      </div>
      <div className="flex  grow justify-between">
        <div className="flex flex-col  justify-between">
          <div>
            <span
              className={cn(
                'text-sm font-semibold',
                isStock ? 'text-text-success' : 'text-text-danger'
              )}
            >
              {isStock ? t('products.in-stock') : t('products.outOfStock')}
            </span>
            <h2 className="mt-1.5 mb-2">{wishlistItem.product.title}</h2>
            <span className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-2 px-1.5 py-1 h-6 min:w-17 rounded bg-bg-warning text-text-plain">
                <Star size={16} fill="black" color="black" />
                {Number(wishlistItem.product.rating) > 0
                  ? Number(wishlistItem.product.rating).toFixed(1)
                  : Number(wishlistItem.product.rating)}
                /5
              </span>
              {wishlistItem.product.ratings > 0 && (
                <span className="text-text-info text-sm font-medium">
                  {' '}
                  ({wishlistItem.product.ratings} {t('products.filter.rating.subtitle')})
                </span>
              )}
            </span>
          </div>
          <div>
            <ProductPrice product={wishlistItem.product} />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <Button
            buttonVariant="icon"
            variant="danger"
            iconOnly={<Trash2 />}
            className="ml-auto"
            onClick={() => removeItemFromWishlistMutation(wishlistItem.id)}
          />
          {isStock ? (
            <Button
              loading={isAdding}
              onClick={addToCart}
              buttonVariant="text"
              variant="primary"
              title="products.addToCart"
              leftIcon={<ShoppingCart size={20} />}
            />
          ) : (
            <Button
              buttonVariant="text"
              variant="secondary"
              title="products.wishlist.explore-similar-products"
              onClick={handleExplore}
            />
          )}
        </div>
      </div>
    </div>
  );
}

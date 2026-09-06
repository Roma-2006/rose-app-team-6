'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight, BrushCleaning } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { ProductCard } from '@/features/main/components/home/home-products/Product-card';
import { ProductCardSkeleton } from '@/features/main/components/skeleton/product-card-skelton';
import CartItemRow, { CartItemType } from '@/features/main/components/cart/cart-item-row';
import CartEmptyState from '@/features/main/components/cart/cart-empty';
import CartSkeleton from '@/features/main/components/skeleton/cart-skeleton';
import ClearCartDialog from '@/features/main/components/cart/clear-cart-dialog';
import SecTitle from '@/features/main/components/shared/section-title';
import { useCart } from '@/features/main/hooks/use-cart';
import { Product } from '@/features/main/types/products';
import { Carousel } from '@/features/main/components/shared/carousel';
import type { GetCartResponse } from '@/features/main/types/server-cart';

interface CartPageProps {
  suggestedProducts: Product[];
  initialCart: GetCartResponse;
}

export default function CartPageClient({ suggestedProducts, initialCart }: CartPageProps) {
  const t = useTranslations('cart');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);

  const { cartItems, isLoading, updateQuantity, removeFromCart, clearCart } = useCart({
    initialItems: initialCart,
  });

  const formattedItems: CartItemType[] = cartItems.map((item) => ({
    id: item.id,
    title: item.product.title,
    image: item.product.cover ?? '/placeholder.png',
    price: Number(item.product.price),
    rating: item.product.rating ?? 0,
    ratingCount: item.product.ratings,
    quantity: item.quantity,
    maxStock: item.product.stock,
  }));

  return (
    <main className=" mx-auto px-4 py-8">
      {/* 2 Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between pb-4">
            <div className="flex gap-2 items-baseline">
              <h1 className="text-4xl font-bold text-text-primary">{t('title')}</h1>
              <span className="text-sm font-normal text-text-muted">
                {formattedItems.length} {t('products')}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsClearDialogOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-bg-primary-fade text-text-primary hover:bg-bg-primary-faint rounded-lg text-sm font-medium transition-colors"
            >
              <BrushCleaning className="h-4 w-4 text-text-primary" />
              <span>{t('clearCart')}</span>
            </button>
          </div>

          {isLoading ? (
            <CartSkeleton />
          ) : formattedItems.length === 0 ? (
            <CartEmptyState />
          ) : (
            <div className="divide-y border rounded-3xl py-4 px-4 border-border-plain pb-4">
              {formattedItems.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={(id, newQty) => updateQuantity(id, newQty)}
                  onRemove={(id) => removeFromCart(id)}
                />
              ))}
            </div>
          )}

          <div className="flex pt-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-bg-primary-saturated hover:bg-rose-950 text-white font-medium text-sm rounded-xl transition-colors shadow-sm"
            >
              {isRtl ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
              <span>{t('continueShopping')}</span>
            </Link>
          </div>
        </section>

        {/* Order Summary */}
        <aside className="lg:col-span-1">
          <div className="border border-dashed border-border-muted p-6 rounded-lg bg-bg-muted/20 text-center text-text-muted">
            [ Order Summary Panel Slot ]
          </div>
        </aside>
      </div>

      {/* Products You May Like Carousel */}
      <section className="mt-16 ">
        <div className="mb-8">
          <SecTitle text={t('title-2')} />
        </div>
        <div className=" flex-1 w-full">
          <Carousel>
            {isLoading
              ? [...Array(4)].map((_, i) => (
                  <div key={i} className="snap-start  ">
                    <ProductCardSkeleton />
                  </div>
                ))
              : suggestedProducts.map((product) => (
                  <div key={product.id} className="snap-start  ">
                    <ProductCard product={product} />
                  </div>
                ))}
          </Carousel>
        </div>
      </section>

      {/* Confirmation Dialog */}
      <ClearCartDialog
        isOpen={isClearDialogOpen}
        onClose={() => setIsClearDialogOpen(false)}
        onConfirm={() => {
          clearCart();
          setIsClearDialogOpen(false);
        }}
      />
    </main>
  );
}

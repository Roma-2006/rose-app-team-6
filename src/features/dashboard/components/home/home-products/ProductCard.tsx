'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Star, HeartPlus } from 'lucide-react';
import { Product } from '../../../types/product.type';
import { calculateDiscountedPrice } from '../../../utils/calculateDiscount';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import { useProductActions } from '../../../hooks/use-product-actions';
import { LoginPromptModal } from './loginpromptlogin';

interface ProductCardProps {
  product: Product & {
    createdAt: string;
    stock?: number;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const t = useTranslations('home.product-card');

  const locale = useLocale();
  const loginHref = `/${locale}/login`;

  const handleNavigate = () => router.push(`/products/${product.id}`);

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const { addToCart, toggleWishlist } = useProductActions(product.id, () =>
    setShowLoginPrompt(true)
  );

  const rawPrice = Number(product.price);

  const discountedPrice = Number(calculateDiscountedPrice(product));

  console.log({
    rawPrice,
    discountedPrice,
    discountType: product.discountType,
    discountValue: product.discountValue,
  });

  const hasDiscount = product.discountType && Number(product.discountValue) > 0;

  const ratingValue = Math.round(product.rating);

  const created = new Date(product.createdAt);
  const now = new Date();

  const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);

  const isNew = diffDays <= 30;

  return (
    <div>
      <div
        onClick={handleNavigate}
        className="w-72 h-96 self-stretch rounded-2xl inline-flex flex-col justify-start items-start gap-6 cursor-pointer group "
      >
        {/* 1. image */}
        <div className="relative self-stretch h-64 p-2.5 rounded-2xl flex flex-col justify-start items-end overflow-hidden bg-bg-muted">
          <button
            onClick={(e) => toggleWishlist(e)}
            className="absolute top-3 left-3 z-20 w-9 h-9 bg-bg-plain rounded-full shadow-[0px_2px_8px_rgba(0,0,0,0.1)] flex justify-center items-center group/heart hover:bg-bg-subtle transition-all active:scale-90"
          >
            <HeartPlus
              size={20}
              strokeWidth={1.5}
              className="text-secondary group-hover/heart:scale-110 transition-transform"
            />
          </button>
          <Image
            src={product.cover}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end z-10">
            {isNew && (
              <div className="px-2 py-1 bg-bg-muted rounded-full inline-flex justify-center items-center overflow-hidden">
                <span className="text-text-plain text-xs font-medium uppercase leading-3">
                  {t('new')}
                </span>
              </div>
            )}
            {Number(product.stock) === 0 && (
              <div className="px-2 py-1 bg-bg-danger rounded-full inline-flex justify-center items-center gap-2.5">
                <span className=" text-rose text-xs font-medium uppercase leading-3">
                  {t('outOfStock')}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="self-stretch px-1 flex flex-col gap-1">
          <h3 className="text-text-primary self-stretch justify-center text-lg font-semibold font-['Sarabun'] leading-4">
            {product.title}
          </h3>

          <div className="flex items-end justify-between mt-2">
            <div className="flex flex-col gap-1.5">
              {/* stars */}
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < ratingValue ? 'var(--color-yellow-400)' : 'none'}
                    stroke="var(--color-yellow-400)"
                  />
                ))}
              </div>

              {/* prices */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-text-primary text-base font-bold">
                  {discountedPrice.toFixed(2)} EGP
                </span>

                {hasDiscount && (
                  <span className="text-text-muted text-sm line-through">
                    {rawPrice.toFixed(2)} EGP
                  </span>
                )}
              </div>
            </div>

            {/* cart button*/}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(e);
              }}
              className="w-11 h-11 bg-secondary rounded-full inline-flex justify-center items-center hover:opacity-80 transition-opacity "
            >
              <ShoppingCart size={22} className="text-text-inverse" />
            </button>
          </div>
        </div>
      </div>

      <LoginPromptModal
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        loginHref={loginHref}
      />
    </div>
  );
};

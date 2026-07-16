'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Star, HeartPlus } from 'lucide-react';
import { Product } from '../types/product.type';
import { calculateDiscountedPrice } from '../types/utils/calculateDiscount';
import { useState } from 'react';

interface ProductCardProps {
  product: Product & {
    isNew?: boolean;
    isHot?: boolean;
    stock?: number;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNavigate = () => router.push(`/products/${product.id}`);
  const toggleWishlist = async (productId: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();

      if (data.status) {
        console.log('Success:', data.message);
      }
    } catch (error) {
      console.error('Error updating wishlist', error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div
      onClick={handleNavigate}
      className="w-72 h-96 self-stretch rounded-2xl inline-flex flex-col justify-start items-start gap-6 cursor-pointer group "
    >
      {/* 1. منطقة الصورة */}
      <div className="relative self-stretch h-64 p-2.5 rounded-2xl flex flex-col justify-start items-end overflow-hidden bg-bg-muted">
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log('Adding to wishlist:', product.id);
            // هنا تضع كود الـ API: POST /api/wishlist
          }}
          className="absolute top-3 left-3 z-20 w-9 h-9 bg-white rounded-full shadow-[0px_2px_8px_rgba(0,0,0,0.1)] flex justify-center items-center group/heart hover:bg-gray-50 transition-all active:scale-90"
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
          {(product.isNew || product.id.includes('2824')) && (
            <div className="px-2 py-1 bg-bg-muted rounded-full inline-flex justify-center items-center overflow-hidden">
              <span className="text-text-plain text-xs font-medium uppercase leading-3">NEW</span>
            </div>
          )}
          {Number(product.stock) === 0 && (
            <div className="px-2 py-1 bg-bg-danger rounded-full inline-flex justify-center items-center gap-2.5">
              <span className=" text-rose text-xs font-medium uppercase leading-3">
                OUT OF STOCK
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 2. منطقة البيانات (العنوان + النجوم + السعر والزرار) */}
      <div className="self-stretch px-1 flex flex-col gap-1">
        {/* العنوان - سطر واحد عشان ما يبوظش الارتفاع */}
        <h3 className="text-text-primary self-stretch justify-center text-lg font-semibold font-['Sarabun'] leading-4">
          {product.title}
        </h3>

        {/* الصف السفلي: مقسوم شمال (نجوم وسعر) ويمين (زرار) */}
        <div className="flex items-end justify-between mt-2">
          {/* المجموعة اليسرى: النجوم تحتها السعر */}
          <div className="flex flex-col gap-1.5">
            {/* النجوم */}
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

            {/* الأسعار */}
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

          {/* زر السلة الدائري في أقصى اليمين */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              // Logic add to cart
            }}
            className="w-11 h-11 bg-secondary rounded-full inline-flex justify-center items-center hover:bg-bg-primary transition-all active:scale-90"
          >
            <ShoppingCart size={22} className="text-text-inverse" />
          </button>
        </div>
      </div>
    </div>
  );
};

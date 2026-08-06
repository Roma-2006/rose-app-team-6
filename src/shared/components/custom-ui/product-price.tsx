import { Product } from '@/features/main/types/products';
import { calculateDiscountedPrice } from '@/features/main/utils/calculate-discount';
import { ProductPriceProps } from '@/shared/types/product-price';
import { useTranslations } from 'next-intl';
export default function ProductPrice({ product }: ProductPriceProps) {
  //Translation
  const t = useTranslations();
  //Variable
  const discountedPrice = Number(calculateDiscountedPrice(product));
  const hasDiscount = product.discountType && Number(product.discountValue) > 0;
  return (
    <span className="flex gap-2 items-end">
      <span className="font-bold text-3xl text-text-plain">
        {discountedPrice.toFixed(2)}
        <span className="text-xl font-semibold ">{t('products.filter.currency.egp')}</span>
      </span>
      {hasDiscount && (
        <span className="line-through text-sm text-text-muted">
          {Number(product.price).toFixed(2)}
          <span>{t('products.filter.currency.egp')}</span>
        </span>
      )}
    </span>
  );
}

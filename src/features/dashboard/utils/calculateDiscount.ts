import type { Product } from '../../../shared/types/product-type';

export const calculateDiscountedPrice = (
  product: Pick<Product, 'price' | 'discountType' | 'discountValue'>
): number => {
  const original = Number(product.price);
  const val = Number(product.discountValue);

  if (!Number.isFinite(original)) return 0;

  if (
    (product.discountType as string) === 'PERCENT' ||
    (product.discountType as string) === 'PERCENTAGE'
  ) {
    if (!Number.isFinite(val) || val === 0) return original;
    return original - (original * val) / 100;
  }

  if (product.discountType === 'FIXED') {
    if (!Number.isFinite(val) || val === 0) return original;
    return original - val;
  }

  return original;
};

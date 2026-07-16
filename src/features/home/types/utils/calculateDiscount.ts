import type { Product } from '../product.type';

export const calculateDiscountedPrice = (
  product: Pick<Product, 'price' | 'discountType' | 'discountValue'>
): number => {
  const original = Number(product.price);
  const val = Number(product.discountValue);

  if (!Number.isFinite(original)) return 0;

  if (product.discountType === 'PERCENT') {
    if (!Number.isFinite(val)) return original;
    return original - (original * val) / 100;
  }

  if (product.discountType === 'FIXED') {
    if (!Number.isFinite(val)) return original;
    return original - val;
  }

  return original;
};

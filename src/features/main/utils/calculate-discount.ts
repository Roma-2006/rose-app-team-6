import { Product } from '../types/products';

export const calculateDiscountedPrice = (
  product: Pick<Product, 'price' | 'discountType' | 'discountValue'>
): number => {
  const original = Number(product.price);
  const val = Number(product.discountValue);

  if (!Number.isFinite(original)) return 0;
  if (!Number.isFinite(val) || val <= 0) return original;

  const type = (product.discountType || '').toString().toUpperCase();

  if (type === 'PERCENT' || type === 'PERCENTAGE') {
    return Math.max(0, original - (original * val) / 100);
  }

  if (type === 'FIXED' || type === 'FLAT' || type === 'AMOUNT') {
    return Math.max(0, original - val);
  }

  return original;
};

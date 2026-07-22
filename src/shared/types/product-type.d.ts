import type { Occasion } from '@/shared/types/occasion.type.d';

export type ProductOccasion = {
  id: string;
  productId: string;
  occasionId: string;
  occasion: Occasion;
};

export type Product = {
  id: string;
  title: string;
  rating: number;
  price: string;
  createdAt: string;
  stock?: number;
  discountType: 'PERCENT' | 'FIXED' | 'NONE';
  discountValue: string;
  cover: string;

  _count: ProductCount;

  occasions: ProductOccasion[];
};
export interface ProductCount {
  reviews: number;
  cartItems: number;
  wishlistItems: number;
  orderItems: number;
}

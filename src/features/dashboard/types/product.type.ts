import type { Occasion } from './occasion.type';

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
  discountType: 'PERCENT' | 'FIXED' | 'NONE';
  discountValue: string;
  cover: string;

  _count: {
    reviews: number;
    cartItems: number;
    wishlistItems: number;
    orderItems: number;
  };

  occasions: ProductOccasion[];
};

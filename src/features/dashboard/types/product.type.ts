import type { Occasion } from './occasion.type';

export type Product = {
  id: string;
  title: string;
  rating: number;
  price: string;
  discountType: 'PERCENTAGE' | 'FIXED' | 'NONE';
  discountValue: string;
  cover: string;
  _count: {
    reviews: number;
    cartItems: number;
    wishlistItems: number;
  };
  occasions: Occasion[];
};

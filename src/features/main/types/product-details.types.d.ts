export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  headline: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubCategory {
  id: string;
  title: string;
  description: string;
  image: string | null;
  categoryId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCount {
  reviews: number;
  cartItems: number;
  wishlistItems: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  rating: number;
  ratings: number;
  stock: number;
  price: string;
  discountType: 'PERCENT' | 'FIXED' | 'NONE';
  discountValue: string;
  cover: string;
  gallery: string;
  categoryId: string;
  subCategoryId: string;
  immutable: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  subCategory?: SubCategory;
  occasions?: unknown[];
  reviews?: Review[];
  _count?: ProductCount;
}

export interface ProductDetailsResponse {
  status: boolean;
  code: number;
  payload: {
    product: Product;
  };
}

export interface ServerCartCategory {
  id: string;
  categoryId?: string;
}

export interface ServerCartProduct {
  id: string;
  category?: ServerCartCategory;
  categoryId?: string;
  cover?: string;
  createdAt?: string;
  deletedAt?: string | null;
  description?: string;
  discountType?: string;
  discountValue?: string;
  gallery?: string;
  immutable?: boolean;
  price: string;
  rating?: number;
  ratings: number;
  stock: number;
  subCategory?: ServerCartCategory;
  subCategoryId?: string;
  title: string;
  updatedAt?: string;
}

export interface ServerCartItem {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  productId: string;
  quantity: number;
  product: ServerCartProduct;
}

export type GetCartResponse = ServerCartItem[];

import { GetProductsParams, ProductSortBy, SortOrder } from '@/shared/types/product-query';
import { Product } from '@/shared/types/product.type';

import type { Occasion } from '../../features/main/types/occasion.type';

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
  ratings: number;
  price: string;
  createdAt: string;
  stock?: number;
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

//productPage
export type TGetProductsParams = {
  page?: string;
  limit?: string;
  occasionId?: string;
  categoryId?: string;
  subCategoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
  sortBy?: ProductSortBy;
  sortOrder?: SortOrder;
};
export type TProductsPageProps = {
  searchParams: Promise<TGetProductsParams>;
};
//allProducts
export type TAllProductsProps = {
  searchParams: TGetProductsParams;
};

export type TPaginationMetadata = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type TProductsResponse = {
  data: Product[];
  metadata: TPaginationMetadata;
};
//productPagination
export type TProductMetaDataProps = {
  productMetaData: TPaginationMetadata;
};

export interface IProductCount {
  reviews?: number;
  cartItems?: number;
  wishlistItems?: number;
  orderItems?: number;
}

export interface IRelatedProductsSectionProps {
  product: Product & {
    categoryId?: string;
    subCategoryId?: string;
    _count?: IProductCount;
    occasions?: unknown[];
  };
}

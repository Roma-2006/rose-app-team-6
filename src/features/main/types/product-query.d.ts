export type ProductSortBy = 'bestSelling' | 'mostPopular';

export type SortOrder = 'asc' | 'desc';

export interface GetProductsParams {
  page?: number;
  limit?: number;

  categoryId?: string;
  subCategoryId?: string;
  occasionId?: string;

  minPrice?: number;
  maxPrice?: number;
  minRating?: number;

  sortBy?: ProductSortBy;
  sortOrder?: SortOrder;
  search?: string;
}

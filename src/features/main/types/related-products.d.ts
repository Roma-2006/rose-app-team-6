interface IRelatedProductsProps {
  categoryId?: string;
  subCategoryId?: string;
  search?: string;
  currentProductId: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

interface IRelatedProductsSectionProps {
  product: {
    id: string;
    title: string;
    price: number;
    rating?: number;
    categoryId?: string;
    subCategoryId?: string;
  };
}

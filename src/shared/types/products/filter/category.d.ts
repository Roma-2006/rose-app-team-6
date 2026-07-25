export interface Category {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesRequestBody {
  page: number;
  limit: number;
}
export interface CategoryListProps {
  categories: Category[];
}
export interface CategoryItemProps {
  category: Category;
}

export interface CategoriesResponse {
  data: Category[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

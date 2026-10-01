interface Category {
  id: string;
  title: string;
  description?: string;
  image?: string;
  productsCount?: number;
}

interface ApiResponse {
  status: boolean;
  code: number;
  message: string;
  payload: {
    data: Category[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}
export interface CreateCategoryType {
  title: string;
  description: string;
  image: string;
}
interface CategoryTableProps {
  initialCategories: Category[];
  initialTotalPages: number;
  currentPage: number;
  currentSearch: string;
}

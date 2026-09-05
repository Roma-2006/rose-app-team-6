interface Occasion {
  id: string;
  title: string;
  description?: string;
  image?: string;
}

interface ApiResponse {
  status: boolean;
  code: number;
  message: string;
  payload: {
    data: Occasion[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}
export interface CreateOccasionType {
  title: string;
  description: string;
  image: string;
}
interface OccasionTableProps {
  initialOccasions: Occasion[];
  initialTotalPages: number;
  currentPage: number;
  currentSearch: string;
}

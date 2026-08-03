export interface Occasion {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OccasionsRequestBody {
  page: number;
  limit: number;
}
export interface OccasionListProps {
  occasions: Occasion[];
}
export interface OccasionItemProps {
  occasion: Occasion;
}

export interface OccasionsResponse {
  data: Occasion[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

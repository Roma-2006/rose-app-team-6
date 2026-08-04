export interface FilterListRequestBody {
  page?: number;
  limit?: number;
}

export interface FilterListMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface FilterListResponse<T> {
  data: T[];
  metadata: FilterListMetadata;
}

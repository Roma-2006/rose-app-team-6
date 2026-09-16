export type IApiResponse<T> = IErrorResponse | ISuccessResponse<T>;

export interface IErrorResponse {
  status: false;
  code: number;
  message: string;
}

export interface ISuccessResponse<T> {
  status: boolean;
  message?: string;
  payload?: T;
}

export interface IPaginatedResponse<T> {
  data: T[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface IAddReviewResponse {
  status: boolean;
  message?: string;
  code?: number;
  payload?: string;
}
export interface IAddReviewActionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

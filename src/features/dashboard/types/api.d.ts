export type IApiResponse<T> = IErrorResponse | ISuccessResponse<T>;

export interface IErrorResponse {
  status: false;
  code: number;
  message: string;
}

export interface ISuccessResponse<T> {
  status: true;
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

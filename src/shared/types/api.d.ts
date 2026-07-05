export interface IErrorResponce {
  status: false;
  message: string;
  code: number;
  errors?: TValidationError[];
}
export interface ISuccessResponce<T> {
  status: true;
  code: number;
  message: string;
  payload: T;
}
export type TApiResponce<T> = IErrorResponce | ISuccessResponce<T>;
export type TValidationError = {
  path: string;
  messages?: string[];
  message?: string;
};

export interface IDocumentFields {
  createdAt: string;
  updatedAt: string;
}

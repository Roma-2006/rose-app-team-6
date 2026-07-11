// export interface IDocumentFields {
//   createdAt: string;
//   updatedAt: string;
// }
/**
 * Represents a failed API response.
 */
export interface ErrorResponse {
  /** Always `false`, indicating the request failed. */
  status: false;
  /** A human-readable description of the error. */
  message: string;
  /** A numeric error code identifying the failure reason. */
  code: number;
  errors?: ValidationError[];
}

/**
 * Represents a successful API response.
 * @template T - The type of the response payload.
 */
export interface SuccessResponse<T> {
  /** Always `true`, indicating the request succeeded. */
  status: true;
  /** An optional human-readable message about the result. */
  message?: string;
  /** The optional data returned by the request. */
  code: number;
  payload?: T;
}
export type ValidationError = {
  path: string;
  messages?: string[];
  message?: string;
};
/**
 * A discriminated union of {@link SuccessResponse} and {@link ErrorResponse}.
 * Narrow the type by checking the `status` field before accessing other properties.
 * @template T - The type of the success payload.
 * @example
 * function handle(res: Response<User>) {
 *   if (res.status) {
 *     console.log(res.payload); // SuccessResponse<User>
 *   } else {
 *     console.error(res.code, res.message); // ErrorResponse
 *   }
 * }
 */
export type Response<T> = SuccessResponse<T> | ErrorResponse;

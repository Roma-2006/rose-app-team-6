export interface IReviewItem {
  id: string | number;
  userName: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
}

export interface IGeneralRatingData {
  generalRating: number;
  totalRatings: number;
}

export interface IAddReviewFormData {
  rating: number;
  title: string;
  review: string;
}
export interface IReviewItem {
  id: string | number;
  userName: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
}
export interface IReviewUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface IReviewProduct {
  id: string;
  title: string;
}

export interface IReview {
  id: string;
  userId: string;
  productId: string;
  headline: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: IReviewUser;
  product: IReviewProduct;
}

interface GetProductReviewsParams {
  productId: string;
  page?: number;
  limit?: number;
}

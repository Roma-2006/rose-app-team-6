export interface IAddReviewFormData {
  rating: number;
  title: string;
  review: string;
}

export interface IProductReview {
  id: string;
  rating: number;
  headline: string;
  content: string;
  createdAt: string;

  user: {
    firstName: string;
    lastName: string;
    username: string;
  };
}

interface GetProductReviewsParams {
  productId: string;
  page?: number;
  limit?: number;
}

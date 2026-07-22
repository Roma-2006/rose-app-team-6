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

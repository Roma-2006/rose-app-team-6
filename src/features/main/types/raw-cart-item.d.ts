export type RawCartItem = {
  id?: string;
  _id?: string;
  productId?: string;
  quantity?: number;
  product?: RawCartProduct;
  price?: number;
} & RawCartProduct;

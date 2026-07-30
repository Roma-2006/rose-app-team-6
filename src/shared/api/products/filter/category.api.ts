import { getFilterList } from './filter.api';
import {
  Category,
  CategoriesRequestBody,
  CategoriesResponse,
} from '@/shared/types/products/filter/category';

export const getCategories = (params: CategoriesRequestBody): Promise<CategoriesResponse> =>
  getFilterList<Category>('categories', params);

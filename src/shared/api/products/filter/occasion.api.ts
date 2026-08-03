import { getFilterList } from './filter.api';
import {
  Occasion,
  OccasionsRequestBody,
  OccasionsResponse,
} from '@/shared/types/products/filter/occasion';

export const getOccasions = (params: OccasionsRequestBody): Promise<OccasionsResponse> =>
  getFilterList<Occasion>('occasions', params);

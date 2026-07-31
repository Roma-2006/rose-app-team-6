export const DEFAULT_MIN = 0 as const;
export const DEFAULT_MAX = 1000000 as const;
export const DEBOUNCE_MS = 500 as const;

export const LIMIT = 20 as const;
export const SKELETON_COUNT = 6 as const;
export const NEXT_PAGE_SKELETON_COUNT = 2 as const;

export const STAR_VALUES = [1, 2, 3, 4, 5] as const;

export const FILTER_PARAM_KEYS = [
  'occasionId',
  'suboccasionId',
  'categoryId',
  'subCategoryId',
  'minPrice',
  'maxPrice',
  'minRating',
] as const;

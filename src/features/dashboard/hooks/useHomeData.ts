// src/features/home/hooks/useHomeData.ts
import { useQuery } from '@tanstack/react-query';
// 1. حذف getProducts لأنه غير مستخدم
import { getOccasions } from '../api/home/home-products/product.api';

const ALLOWED_OCCASIONS = ['Wedding', 'Anniversary', 'Birthday', 'Engagement'] as const;

// تعريف نوع (Type) بناءً على القيم المسموحة
type AllowedOccasion = (typeof ALLOWED_OCCASIONS)[number];

export const useOccasions = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['occasions', page, limit],
    queryFn: async () => {
      const { occasions } = await getOccasions(page, limit);

      // 2. الفلترة بدون استخدام any
      return occasions.filter((occ) =>
        (ALLOWED_OCCASIONS as readonly string[]).includes(occ.title)
      );
    },
  });
};

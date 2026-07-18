import { useQuery } from '@tanstack/react-query';

import { getOccasions } from '../api//product.api';

const ALLOWED_OCCASIONS = ['Wedding', 'Anniversary', 'Birthday', 'Engagement'] as const;

type AllowedOccasion = (typeof ALLOWED_OCCASIONS)[number];

export const useOccasions = () => {
  return useQuery({
    queryKey: ['occasions'],
    queryFn: async () => {
      const { occasions } = await getOccasions(1, 20);

      return occasions.filter((occ) =>
        (ALLOWED_OCCASIONS as readonly string[]).includes(occ.title)
      );
    },
  });
};

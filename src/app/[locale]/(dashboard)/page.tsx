import HomeContent from '@/features/dashboard/components/home/home-content';
import { BestSellingSection } from '@/features/dashboard/components/home/home-products/bestsellingsection';
import { MostPopularSection } from '@/features/dashboard/components/home/home-products/mostpopularsection';

export default async function HomePage() {
  return (
    <>
      <HomeContent />
      <BestSellingSection />
      <MostPopularSection />
    </>
  );
}

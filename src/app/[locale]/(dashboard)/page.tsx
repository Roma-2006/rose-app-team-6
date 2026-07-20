import HomeContent from '@/features/dashboard/components/home/home-content';
import { BestSellingSection } from '@/features/dashboard/components/home/home-products/bestSellingSection';
import { MostPopularSection } from '@/features/dashboard/components/home/home-products/mostPopularSection';

export default async function HomePage() {
  return (
    <>
      <HomeContent />
      <BestSellingSection />
      <MostPopularSection />
    </>
  );
}

import { getTranslations } from 'next-intl/server';
import HomeContent from '@/features/dashboard/components/home/home-content';
import { BestSellingSection } from '@/features/dashboard/components/home/home-products/bestSellingSection';
import { MostPopularSection } from '@/features/dashboard/components/home/home-products/mostPopularSection';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <>
      <HomeContent />
      <BestSellingSection />
      <MostPopularSection />
    </>
  );
}

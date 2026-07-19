import { getTranslations } from 'next-intl/server';
import HomeContent from '@/features/dashboard/components/home/home-content';
import { MostPopularSection } from '@/features/dashboard/components/home/home-products/mostPopularSection';
import AboutSection from '@/features/dashboard/components/home/home-about/about-section';
import GallerySection from '@/features/dashboard/components/home/home-gallery/gallery-section';
import { BestSellingSection } from '@/features/dashboard/components/home/home-products/bestSellingSection';

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
      <AboutSection />
      <GallerySection />
    </>
  );
}

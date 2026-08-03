import AboutSection from '@/features/dashboard/components/home/home-about/about-section';
import GallerySection from '@/features/dashboard/components/home/home-gallery/gallery-section';
import HomeContent from '@/features/dashboard/components/home/home-content';

import { MostPopularSection } from '@/features/dashboard/components/home/home-products/mostpopular-section';
import { BestSellingSection } from '@/features/dashboard/components/home/home-products/bestselling-section';
interface HomePageProps {
  searchParams: Promise<{ occasionId?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { occasionId } = await searchParams;
  return (
    <section className="min-h-screen">
      <HomeContent />
      <BestSellingSection />
      <MostPopularSection occasionId={occasionId} />
      <AboutSection />
      <GallerySection />
    </section>
  );
}

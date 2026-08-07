import AboutSection from '@/features/main/components/home/home-about/about-section';
import GallerySection from '@/features/main/components/home/home-gallery/gallery-section';
import PartnersSection from '@/features/main/components/home/home-partners/partners-section';
import HomeContent from '@/features/main/components/home/home-content';
import { BestSellingSection } from '@/features/main/components/home/home-products/bestselling-section';
import { MostPopularSection } from '@/features/main/components/home/home-products/mostpopular-section';
import TestimonialsSection from '@/features/main/components/home/home-testimonials/testimonials-section';
import OrderSummaryPanel from '@/features/main/components/order-summary/order-summary-panel';

interface HomePageProps {
  searchParams: Promise<{ occasionId?: string }>;
}
export default async function HomePage({ searchParams }: HomePageProps) {
  const { occasionId } = await searchParams;
  return (
    <>
      <HomeContent />
      <BestSellingSection />
      <MostPopularSection occasionId={occasionId} />
      <AboutSection />
      <GallerySection />
      <TestimonialsSection />
      <PartnersSection />
    </>
  );
}

import AboutSection from '@/features/dashboard/components/home/home-about/about-section';
import GallerySection from '@/features/dashboard/components/home/home-gallery/gallery-section';
import PartnersSection from '@/features/dashboard/components/home/home-partners/partners-section';
import HomeContent from '@/features/dashboard/components/home/home-content';
import { BestSellingSection } from '@/features/dashboard/components/home/home-products/bestselling-section';
import { MostPopularSection } from '@/features/dashboard/components/home/home-products/mostpopular-section';
import TestimonialsSection from '@/features/dashboard/components/home/home-testimonials/testimonials-section';

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

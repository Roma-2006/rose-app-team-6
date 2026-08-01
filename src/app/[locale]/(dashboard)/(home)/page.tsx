import AboutSection from '@/features/dashboard/components/home/home-about/about-section';
import GallerySection from '@/features/dashboard/components/home/home-gallery/gallery-section';
import HomeContent from '@/features/dashboard/components/home/home-content';
import { BestSellingSection } from '@/features/dashboard/components/home/home-products/bestselling-section';
import { MostPopularSection } from '@/features/dashboard/components/home/home-products/mostpopular-section';
import TestimonialsSection from '@/features/dashboard/components/home/home-testimonials/testimonials-section';
import PartnersSection from '@/features/dashboard/components/home/home-partners/partners-section';

export default async function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 gap-16">
      <HomeContent />
      <BestSellingSection />
      <MostPopularSection />
      <AboutSection />
      <GallerySection />
      <TestimonialsSection />
      <PartnersSection />
    </div>
  );
}

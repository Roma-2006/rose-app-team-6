import AboutSection from '@/features/dashboard/components/home/home-about/about-section';
import GallerySection from '@/features/dashboard/components/home/home-gallery/gallery-section';
import HomeContent from '@/features/dashboard/components/home/home-content';

import { MostPopularSection } from '@/features/dashboard/components/home/home-products/mostpopular-section';
import { BestSellingSection } from '@/features/dashboard/components/home/home-products/bestselling-section';

export default async function HomePage() {
  return (
    <section className="min-h-screen">
      <HomeContent />
      <BestSellingSection />
      <MostPopularSection />
      <AboutSection />
      <GallerySection />
    </section>
  );
}

import AboutSection from '@/features/dashboard/components/home/home-about/about-section';
import GallerySection from '@/features/dashboard/components/home/home-gallery/gallery-section';
import HomeContent from '@/features/dashboard/components/home/home-content';
import { BestSellingSection } from '@/features/dashboard/components/home/home-products/BestSellingSection';
import { MostPopularSection } from '@/features/dashboard/components/home/home-products/MostPopularSection';

export default async function HomePage() {
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

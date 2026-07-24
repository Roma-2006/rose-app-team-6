import LanguageSwitcher from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme';

import AboutSection from '@/features/dashboard/components/home/home-about/about-section';
import GallerySection from '@/features/dashboard/components/home/home-gallery/gallery-section';
import TestimonialsSection from '@/features/dashboard/components/home/home-testimonials/testimonials-section';
import PartnersSection from '@/features/dashboard/components/home/home-partners/partners-section';
import { BestSellingSection } from '@/features/dashboard/components/home/home-products/bestselling-section';
import { MostPopularSection } from '@/features/dashboard/components/home/home-products/mostpopular-section';
import HomeContent from '@/features/dashboard/components/home/home-content';
interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  return (
    <main className="bg-plain min-h-screen flex flex-col items-center justify-center p-6 text-center gap-10">
      {/* Language & Theme Switcher */}
      {/* <div className="mb-6 w-full flex justify-center gap-4">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
       */}
      <HomeContent />
      <BestSellingSection />
      <MostPopularSection />
      <AboutSection />
      <GallerySection />
      <TestimonialsSection />
      <PartnersSection />
    </main>
  );
}

import AboutSection from '@/features/dashboard/components/home/home-about/about-section';
import GallerySection from '@/features/dashboard/components/home/home-gallery/gallery-section';
import LanguageSwitcher from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme';
import { getTranslations } from 'next-intl/server';
import HomeContent from '@/features/dashboard/components/home/home-content';
import { BestSellingSection } from '@/features/dashboard/components/home/home-products/bestselling-section';
import { MostPopularSection } from '@/features/dashboard/components/home/home-products/mostpopular-section';
interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return (
    <section className="min-h-screen">
      {/* Language Switcher */}
      <div className="mb-6 w-full flex justify-end">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
      <HomeContent />
      <BestSellingSection />
      <MostPopularSection />
      <AboutSection />
      <GallerySection />
    </section>
  );
}

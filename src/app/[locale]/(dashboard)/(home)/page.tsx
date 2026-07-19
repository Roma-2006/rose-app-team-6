import AboutSection from '@/features/dashboard/components/home/home-about/about-section';
import GallerySection from '@/features/dashboard/components/home/home-gallery/gallery-section';
import LanguageSwitcher from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme';
import { getTranslations } from 'next-intl/server';
interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return (
    <section className="min-h-screen">
      <h1>HomePage</h1>
      {/* Language Switcher */}
      <div className="mb-6 w-full flex justify-end">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
      <AboutSection />
      <GallerySection />
    </section>
  );
}

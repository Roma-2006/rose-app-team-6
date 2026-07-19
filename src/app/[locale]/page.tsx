'use client';

import { use } from 'react';
import LanguageSwitcher from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme';
import { useTranslations } from 'next-intl';
import { signOut } from 'next-auth/react';
import AboutSection from '@/features/dashboard/components/home/home-about/about-section';
import GallerySection from '@/features/dashboard/components/home/home-gallery/gallery-section';
import { BestSellingSection } from '@/features/dashboard/components/home/home-products/bestSellingSection';
import { MostPopularSection } from '@/features/dashboard/components/home/home-products/mostPopularSection';
import TestimonialsSection from '@/features/dashboard/components/home/home-testimonials/testimonials-section';
import PartenersSection from '@/features/dashboard/components/home/home-partners/partners-section';
import PartnersSection from '@/features/dashboard/components/home/home-partners/partners-section';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function HomePage({ params }: PageProps) {
  const { locale } = use(params);

  const t = useTranslations('home');

  return (
    <main className="bg-plain min-h-screen flex flex-col items-center justify-center p-6 text-center">
      {/* Language & Theme Switcher */}
      <div className="mb-6 w-full flex justify-center gap-4">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      <AboutSection />
      <GallerySection />
      <TestimonialsSection />
      <PartnersSection />
      <button
        onClick={() => signOut({ callbackUrl: `/${locale}/login` })}
        className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors"
      >
        تسجيل الخروج
      </button>
    </main>
  );
}

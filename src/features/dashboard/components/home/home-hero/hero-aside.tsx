import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';
import { Card } from '@/shared/components/ui/card';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';

export default function HeroAside() {
  const t = useTranslations('home');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <Link href="/products" className="block h-full">
      <Card className="relative h-full min-h-111 overflow-hidden rounded-3xl border-0 p-0">
        {/* Background Image */}
        <Image
          src="/assets/images/image-8.png"
          alt="Special gifts"
          fill
          priority
          className="object-cover"
        />

        {/*  Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end gap-3 p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          {/* Badge */}
          <Badge variant="softPink">{t('hero-aside.badge')}</Badge>

          {/* Heading */}
          <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight">
            {t('hero-aside.title')}
          </h3>

          {/* Button*/}
          <Button
            buttonVariant="text"
            variant="softPink"
            title={t('hero-aside.button')}
            className="mt-2 h-auto w-fit rounded-xl px-5 py-2.5 text-sm font-bold"
            rightIcon={
              isRtl ? (
                <ArrowLeft className="h-4 w-4 text-maroon-600" />
              ) : (
                <ArrowRight className="h-4 w-4 text-maroon-600" />
              )
            }
          />
        </div>
      </Card>
    </Link>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';
import { Card } from '@/shared/components/ui/card';
import { useTranslations } from 'next-intl';

export default function HeroAside() {
  const t = useTranslations('home');
  return (
    <Link href="/products" className="block h-full">
      <Card className="relative h-full min-h-111 overflow-hidden rounded-3xl border-0 p-0">
        <Image
          src="/assets/images/image-8.png"
          alt="Special gifts"
          fill
          priority
          className="object-cover"
        />

        {/* Content Overlay */}

        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-4 p-6 bg-gradient-to-t from-black/40 via-transparent to-transparent">
          {/* Badge */}
          <Badge className="w-fit rounded-full bg-bg-primary-fade px-4 py-1.5 text-xs font-medium text-text-primary hover:bg-bg-primary-fade">
            {t('hero-aside.badge')}
          </Badge>

          {/* Heading */}

          <h3 className="min-w-70  text-3xl font-semibold  text-text-inverse tracking-tight">
            {t('hero-aside.title')}
          </h3>

          {/* Button */}
          <Link
            href="/products"
            style={{ direction: 'ltr' }}
            className="flex w-fit items-center gap-2  rounded-2xl bg-bg-primary-fade mt-3 px-4 py-2 text-lg font-medium text-text-primary transition-colors hover:bg-bg-primary-fade/90"
          >
            {t('hero-aside.button')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Card>
    </Link>
  );
}

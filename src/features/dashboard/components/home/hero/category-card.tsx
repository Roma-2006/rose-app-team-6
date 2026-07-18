import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/shared/components/ui/badge';
import { Card } from '@/shared/components/ui/card';
import { useTranslations } from 'next-intl';
export default function CategoryCards({ image, badge, title, href }: CardsPageProps) {
  const t = useTranslations('home');
  return (
    <Link href={href || '#'} className="block h-full">
      <Card className="relative h-full min-h-60 w-99 overflow-hidden rounded-2xl border-0 p-0 transition-transform duration-200 hover:scale-[1.01]">
        <Image src={image} alt={title} fill priority className="object-cover" />

        {/* Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col  gap-4 p-6 bg-gradient-to-t from-black/40 via-transparent to-transparent">
          {/* Badge */}
          <Badge className="w-fit rounded-full bg-bg-primary-fade px-4 py-1.5 text-xs font-medium text-text-primary hover:bg-bg-primary-fade">
            {t(badge)}
          </Badge>

          {/* Heading */}

          <h3 className="min-w-60  text-start text-2xl font-semibold  text-text-inverse tracking-tight">
            {t(title)}
          </h3>
        </div>
      </Card>
    </Link>
  );
}

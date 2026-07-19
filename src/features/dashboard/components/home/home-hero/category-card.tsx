'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/shared/components/ui/badge';
import { Card } from '@/shared/components/ui/card';
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/shared/components/ui/skeleton';

export default function CategoryCard({ image, badge, title, href }: CategoryCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(image);
  const t = useTranslations('home');

  return (
    <Link href={href} className="block h-full">
      <Card className="relative h-full min-h-60 w-full overflow-hidden group rounded-2xl border-0 p-0 transition-transform duration-200 hover:scale-[1.01]">
        {isLoading && <Skeleton className="absolute inset-0 w-full h-full" />}

        <Image
          src={imgSrc}
          alt={t(title)}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setImgSrc('/images/placeholder.jpg');
            setIsLoading(false);
          }}
        />

        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-4 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          {/* Badge */}
          <Badge className="w-fit rounded-full bg-bg-primary-fade px-4 py-1.5 text-xs font-medium text-text-primary hover:bg-bg-primary-fade">
            {t(badge)}
          </Badge>

          <h3 className="text-start text-2xl font-semibold text-text-inverse tracking-tight">
            {t(title)}
          </h3>
        </div>
      </Card>
    </Link>
  );
}

'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import SecHeader from '../../shared/section-header';
import SecTitle from '../../shared/section-title';
import { columnsData } from '@/features/main/constants/column-data';

export default function GallerySection() {
  const tGallery = useTranslations('home.gallery');

  return (
    <>
      <section className="w-full mx-auto  mb-35 flex flex-col items-center justify-center bg-background">
        {/* Gallery Header */}
        <header className="text-center">
          <SecHeader text={tGallery('label')} className="pb-2" />
          <SecTitle text={tGallery('title')} className="pb-11.5" />
        </header>

        {/* grid system */}
        <div className="w-full  mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 items-start w-full">
            {columnsData.map((column, columnIndex) => (
              <div
                key={column.id}
                className={`flex flex-col gap-4 w-full ${columnIndex === 2 ? 'hidden md:flex' : ''}`}
              >
                {column.items.map((item) => (
                  <div
                    key={item.id}
                    className={`relative w-full h-75 ${item.height} overflow-hidden rounded-xl shadow-md bg-neutral-50`}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 418px"
                      className="object-cover"
                      priority={item.id <= 3}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

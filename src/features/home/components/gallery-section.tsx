'use client';

import React from 'react';
import SecHeader from './section-header';
import SecTitle from './section-title';
import Image from 'next/image';
import Masonry from 'react-masonry-css';

const galleryItems = [
  // الصف العلوي (Top Row)
  {
    id: 1,
    src: '/images/gallery-images1.png',
    alt: 'Wedding gifts (Top Left)',
    aspect: 'aspect-[418/617]',
  }, // الارتفاع: 617px
  {
    id: 2,
    src: '/images/gallery-images2.png',
    alt: 'Red boxes (Top Center)',
    aspect: 'aspect-[418/411]',
  }, // الارتفاع: 411px
  {
    id: 3,
    src: '/images/gallery-images3.png',
    alt: 'Ring box (Top Right)',
    aspect: 'aspect-[418/411]',
  }, // الارتفاع: 411px

  // الصف السفلي (Bottom Row)
  {
    id: 4,
    src: '/images/gallery-images4.png',
    alt: 'Roses and chocolate (Bottom Left)',
    aspect: 'aspect-[418/406]',
  }, // الارتفاع: 406px
  {
    id: 5,
    src: '/images/gallery-images5.png',
    alt: 'Ring in roses (Bottom Center)',
    aspect: 'aspect-[418/611]',
  }, // الارتفاع: 611px
  {
    id: 6,
    src: '/images/gallery-images6.png',
    alt: 'Engagement card (Bottom Right)',
    aspect: 'aspect-[418/611]',
  }, // الارتفاع: 611px
];

export default function GallerySection() {
  const breakpointColumnsObj = {
    default: 3,
    1280: 3, // 3 أعمدة على الشاشات الكبيرة لتطبيق مقاساتك بدقة
    1024: 2, // عمودين على الشاشات المتوسطة
    640: 1, // عمود واحد على الهواتف
  };

  return (
    <section className="w-full flex flex-col items-center justify-center p-6 bg-background">
      {/* Gallery Header */}
      <header className="text-center">
        <SecHeader text="Gallery" className="pb-2" />
        <SecTitle text="Check Out our Wonderful Gallery" className="pb-11.5" />
      </header>

      {/* الحاوية مضبوطة لعرض إجمالي 1286px ليصبح عرض كل صورة 418px تماماً */}
      <div className="w-full max-w-[1286px]">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {galleryItems.map((item) => (
            <div key={item.id} className="mb-4 break-inside-avoid">
              <div
                className={`relative w-full ${item.aspect} overflow-hidden rounded-xl shadow-md border border-muted`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 418px"
                  className="object-cover"
                  priority={item.id <= 3}
                />
              </div>
            </div>
          ))}
        </Masonry>
      </div>
    </section>
  );
}

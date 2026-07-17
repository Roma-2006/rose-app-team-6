'use client';
import React from 'react';
import SecHeader from './section-header';
import SecTitle from './section-title';
import Image from 'next/image';

const galleryItems = [
  {
    id: 1,
    src: '/assets/gallery-images/gallery-image1.png',
    alt: 'Wedding gifts',
    aspect: 'aspect-[418/617]',
  },
  {
    id: 2,
    src: '/assets/gallery-images/gallery-image2.png',
    alt: 'Red boxes',
    aspect: 'aspect-[419/411]',
  },
  {
    id: 3,
    src: '/assets/gallery-images/gallery-image3.png',
    alt: 'Ring box',
    aspect: 'aspect-[418/406]',
  },
  {
    id: 4,
    src: '/assets/gallery-images/gallery-image4.png',
    alt: 'Roses and chocolate',
    aspect: 'aspect-[418/406]',
  },
  {
    id: 5,
    src: '/assets/gallery-images/gallery-image5.png',
    alt: 'Ring in roses',
    aspect: 'aspect-[418/611]',
  },
  {
    id: 6,
    src: '/assets/gallery-images/gallery-image6.png',
    alt: 'Engagement card',
    aspect: 'aspect-[418/611]',
  },
];

export default function GallerySection() {
  return (
    <section className="w-full overflow-x-auto py-12 bg-background flex flex-col items-center justify-center">
      {/* Gallery Header */}
      <header className="text-center mb-11">
        <SecHeader text="Gallery" className="pb-2" />
        <SecTitle text="Check Out our Wonderful Gallery" />
      </header>

      {/* Gallery Grid - تم تقليص العرض الإجمالي إلى 1231px */}
      <div className="w-[1231px] min-w-[1231px] flex gap-[13px] items-start px-4">
        {/* العمود الأول (اليسار) - العرض الجديد 401px */}
        <div className="flex flex-col gap-[15px] w-[401px]">
          {/* صورة 1 */}
          <div
            className={`relative w-full ${galleryItems[0].aspect} overflow-hidden rounded-xl shadow-sm border border-muted`}
          >
            <Image
              src={galleryItems[0].src}
              alt={galleryItems[0].alt}
              fill
              sizes="401px"
              className="object-cover"
              priority
            />
          </div>
          {/* صورة 4 */}
          <div
            className={`relative w-full ${galleryItems[3].aspect} overflow-hidden rounded-xl shadow-sm border border-muted`}
          >
            <Image
              src={galleryItems[3].src}
              alt={galleryItems[3].alt}
              fill
              sizes="401px"
              className="object-cover"
            />
          </div>
        </div>

        {/* العمود الثاني (الوسط) - العرض الجديد 403px */}
        <div className="flex flex-col gap-[15px] w-[403px]">
          {/* صورة 2 */}
          <div
            className={`relative w-full ${galleryItems[1].aspect} overflow-hidden rounded-xl shadow-sm border border-muted`}
          >
            <Image
              src={galleryItems[1].src}
              alt={galleryItems[1].alt}
              fill
              sizes="403px"
              className="object-cover"
              priority
            />
          </div>
          {/* صورة 5 */}
          <div
            className={`relative w-full ${galleryItems[4].aspect} overflow-hidden rounded-xl shadow-sm border border-muted`}
          >
            <Image
              src={galleryItems[4].src}
              alt={galleryItems[4].alt}
              fill
              sizes="403px"
              className="object-cover"
            />
          </div>
        </div>

        {/* العمود الثالث (اليمين) - العرض الجديد 401px */}
        <div className="flex flex-col gap-[15px] w-[401px]">
          {/* صورة 3 */}
          <div
            className={`relative w-full ${galleryItems[2].aspect} overflow-hidden rounded-xl shadow-sm border border-muted`}
          >
            <Image
              src={galleryItems[2].src}
              alt={galleryItems[2].alt}
              fill
              sizes="401px"
              className="object-cover"
              priority
            />
          </div>
          {/* صورة 6 */}
          <div
            className={`relative w-full ${galleryItems[5].aspect} overflow-hidden rounded-xl shadow-sm border border-muted`}
          >
            <Image
              src={galleryItems[5].src}
              alt={galleryItems[5].alt}
              fill
              sizes="401px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

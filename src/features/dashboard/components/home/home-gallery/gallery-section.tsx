'use client';
import React from 'react';
import SecHeader from '../section-header';
import SecTitle from '../section-title';
import Image from 'next/image';

const columnsData = [
  {
    id: 'col-1',
    items: [
      {
        id: 1,
        src: '/assets/gallery-images/gallery-image1.png',
        alt: 'Wedding gifts',
        height: 'md:h-[617px]',
      },
      {
        id: 4,
        src: '/assets/gallery-images/gallery-image4.png',
        alt: 'Roses and chocolate',
        height: 'md:h-[406px]',
      },
    ],
  },
  {
    id: 'col-2',
    items: [
      {
        id: 2,
        src: '/assets/gallery-images/gallery-image2.png',
        alt: 'Red boxes',
        height: 'md:h-[411px]',
      },
      {
        id: 5,
        src: '/assets/gallery-images/gallery-image5.png',
        alt: 'Ring in roses',
        height: 'md:h-[611px]',
      },
    ],
  },
  {
    id: 'col-3',
    items: [
      {
        id: 3,
        src: '/assets/gallery-images/gallery-image3.png',
        alt: 'Ring box',
        height: 'md:h-[411px]',
      },
      {
        id: 6,
        src: '/assets/gallery-images/gallery-image6.png',
        alt: 'Engagement card',
        height: 'md:h-[611px]',
      },
    ],
  },
];

export default function GallerySection() {
  return (
    <section className="w-full px-4 ms-3 mb-35 flex flex-col items-center justify-center bg-background">
      {/* Gallery Header */}
      <header className="text-center">
        <SecHeader text="Gallery" className="pb-2" />
        <SecTitle text="Check Out our Wonderful Gallery" className="pb-11.5" />
      </header>
      {/* grid system */}
      <div className="w-full max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 items-start w-full">
          {columnsData.map((column, columnIndex) => (
            <div
              key={column.id}
              className={`flex flex-col gap-4 w-full ${columnIndex === 2 ? 'hidden md:flex' : ''}`}
            >
              {column.items.map((item) => (
                <div
                  key={item.id}
                  className={`relative w-full h-[300px] ${item.height} overflow-hidden rounded-xl shadow-md border border-muted bg-neutral-50`}
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
  );
}

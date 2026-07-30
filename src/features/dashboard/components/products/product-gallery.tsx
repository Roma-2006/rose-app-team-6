'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] || '');

  return (
    <div className="flex flex-col gap-4 w-full">
      {/*  Image Container */}
      <div className="relative w-full h-96 md:h-101 rounded-2xl overflow-hidden bg-bg-secondary-fade">
        {selectedImage && (
          <Image
            src={selectedImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            loading="eager"
            fetchPriority="high"
          />
        )}
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {images.map((img, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedImage(img)}
            className={cn(
              'relative w-20 h-20 md:w-24 md:h-28 shrink-0 rounded-xl overflow-hidden border-2 transition-all',

              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              selectedImage === img
                ? 'border-bg-primary scale-95'
                : 'border-transparent opacity-70 hover:opacity-100'
            )}
          >
            <Image
              src={img}
              alt={`${title} - ${index + 1}`}
              fill
              sizes="(max-width: 768px) 20vw, 80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import Image from 'next/image';
import SecHeader from './section-header';
import { Button } from '@/shared/components/ui/button';

export default function AboutSection() {
  return (
    <section className="w-full flex  align-center justify-center  gap-20">
      <div className="about-imgs grid grid-cols-1 md:grid-cols-3 gap-6 w-132.5">
        {/* Image 1: Purple Box */}
        <div className="relative w-full aspect-square">
          {/* Border Shape Overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none scale-105 stroke-red-800 fill-none stroke-[2px]"
            viewBox="0 0 100 100"
          >
            <path d="M22,12 C48,7 83,13 88,38 C93,63 87,83 62,88 C37,93 12,83 12,58 C12,33 12,14 22,12 Z" />
          </svg>
          {/* Masked Container */}
          <div
            className="relative w-full h-full"
            style={{ maskImage: 'url(#organic-mask)', WebkitMaskImage: 'url(#organic-mask)' }}
          >
            <Image
              src="/images/about-image1.png"
              alt="purple box"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 418px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Image 2: Orange Box */}
        <div className="relative w-full aspect-square md:translate-y-6">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none scale-105 stroke-orange-600 fill-none stroke-[2px]"
            viewBox="0 0 100 100"
          >
            <path d="M22,12 C48,7 83,13 88,38 C93,63 87,83 62,88 C37,93 12,83 12,58 C12,33 12,14 22,12 Z" />
          </svg>
          <div
            className="relative w-full h-full"
            style={{ maskImage: 'url(#organic-mask)', WebkitMaskImage: 'url(#organic-mask)' }}
          >
            <Image
              src="/images/about-image2.png"
              alt="orange box"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 418px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Image 3: Box with Balloon */}
        <div className="relative w-full aspect-square">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none scale-105 stroke-blue-600 fill-none stroke-[2px]"
            viewBox="0 0 100 100"
          >
            <path d="M22,12 C48,7 83,13 88,38 C93,63 87,83 62,88 C37,93 12,83 12,58 C12,33 12,14 22,12 Z" />
          </svg>
          <div
            className="relative w-full h-full"
            style={{ maskImage: 'url(#organic-mask)', WebkitMaskImage: 'url(#organic-mask)' }}
          >
            <Image
              src="/images/about-image3.png"
              alt="box with pallon"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 418px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
      <div className="about-content flex flex-col gap-6 w-150.5 ">
        <SecHeader text="About" />

        <div className="content-text flex flex-col gap-2">
          <h3 className="text-3xl font-bold  text-text-primary">
            Delivering the <span className="text-text-secondary">Finest</span> Gift Boxes for Your{' '}
            <span className="text-text-secondary">Special</span> Moments
          </h3>
          <p className="font-sm font-normal text-text-soft">
            {
              "Make every moment memorable with our premium gift boxes. Carefully curated and beautifully packaged, each box is filled with handpicked items designed to impress. Whether it's for a birthday, wedding, or a simple \“thank you,\” our gift boxes are crafted to leave a lasting impression — because thoughtful gifting starts here."
            }
          </p>
        </div>
        <Button variant="primary" title="button.save" buttonVariant="text" />
      </div>
    </section>
  );
}

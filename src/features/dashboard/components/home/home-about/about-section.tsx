import React from 'react';
import Image from 'next/image';
import SecHeader from '../section-header';
import { Button } from '@/shared/components/ui/button';

export default function AboutSection() {
  return (
    <section className="max-w-[1280px] w-full mx-auto flex items-center justify-center gap-19 px-4 py-16">
      {/* 1. Asymmetrical Image Layout Container (Scaled to 70%: w-[371px]) */}
      <div className="about-imgs grid grid-cols-12 gap-3 w-[371px] shrink-0 items-center">
        {/* LEFT COLUMN: Large Organic Image with Dark Red Border */}
        <div className="relative col-span-7 aspect-[4/5] w-full">
          {/* Offset Dark Red Border Line (Thinned slightly to 1.5px for proportional balance) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none scale-105 -translate-x-[6px] -translate-y-[3px] stroke-red-800 fill-none stroke-[1.5px]"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M25,5 C55,2 95,10 98,40 C100,70 90,95 60,98 C30,100 5,90 2,60 C-1,30 2,8 25,5 Z" />
          </svg>

          {/* Masked Main Image Container */}
          <div
            className="relative w-full h-full"
            style={{ maskImage: 'url(#organic-mask)', WebkitMaskImage: 'url(#organic-mask)' }}
          >
            <Image
              src="/assets/about-images/about-image1.png"
              alt="purple box"
              fill
              sizes="220px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Two Stacked Images */}
        <div className="col-span-5 flex flex-col gap-3 w-full">
          {/* Top Right: Perfect Circle */}
          <div className="relative w-full aspect-square overflow-hidden rounded-full">
            <Image
              src="/assets/about-images/about-image2.png"
              alt="orange box"
              fill
              sizes="150px"
              className="object-cover"
              priority
            />
          </div>

          {/* Bottom Right: Pill / Capsule Shape (Scaled corner radius down to match 70% bounds) */}
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[24px_24px_24px_24px_/_32px_32px_32px_32px]">
            <Image
              src="/assets/about-images/about-image3.png"
              alt="box with pallon"
              fill
              sizes="150px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="about-content flex flex-col gap-6 w-160">
        <SecHeader text="About" />

        <div className="content-text flex flex-col gap-2">
          <h3 className="text-3xl font-bold text-text-primary">
            Delivering the <span className="text-text-secondary">Finest</span> Gift Boxes for Your{' '}
            <span className="text-text-secondary">Special</span> Moments
          </h3>
          <p className="text-sm font-normal text-text-soft">
            {
              "Make every moment memorable with our premium gift boxes. Carefully curated and beautifully packaged, each box is filled with handpicked items designed to impress. Whether it's for a birthday, wedding, or a simple \“thank you,\” our gift boxes are crafted to leave a lasting impression — because thoughtful gifting starts here."
            }
          </p>
        </div>
        <Button variant="primary" title="button.save" buttonVariant="text" />
      </div>

      {/* SVG Mask Definition Block */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <mask id="organic-mask" maskContentUnits="objectBoundingBox">
            <path
              fill="white"
              d="M0.25,0.05 C0.55,0.02 0.95,0.10 0.98,0.40 C1.00,0.70 0.90,0.95 0.60,0.98 C0.30,1.00 0.05,0.90 0.02,0.60 C-0.01,0.30 0.02,0.08 0.25,0.05 Z"
            />
          </mask>
        </defs>
      </svg>
    </section>
  );
}

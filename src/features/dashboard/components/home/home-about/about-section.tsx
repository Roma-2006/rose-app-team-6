import React from 'react';
import Image from 'next/image';

import { Check } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import SecHeader from '../section-header';
import { Button } from '@/shared/components/ui/button';

export default async function AboutSection() {
  const tAbout = await getTranslations('home.about');

  return (
    <section className="max-w-7xl   h-97.5 w-full mx-auto flex items-center justify-center gap-19 px-4 my-16 mb-33.5">
      {/* About Images */}
      <div className="about-images grid grid-cols-12 gap-3 w-full h-full    items-center">
        <div className="relative col-span-7 aspect-[4/5]  w-full">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none scale-[1.1] -translate-x-[14px] -translate-y-[8px] z-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M25,5 C55,2 95,10 98,40 C100,70 90,95 60,98 C30,100 5,90 2,60 C-1,30 2,8 25,5 Z"
              className="stroke-red-800 fill-none stroke-[1.2px]"
            />
          </svg>

          <div className="relative w-full h-full overflow-hidden rounded-[80px_80px_80px_120px_/_90px_80px_80px_70px] z-10 bg-white">
            <Image
              src="/assets/about-images/about-image1.png"
              alt="purple box"
              fill
              sizes="210px"
              className="object-cover w-82.5 h-94"
              priority
            />
          </div>
        </div>

        <div className="col-span-5 flex flex-col gap-3 w-full">
          <div className="relative w-full aspect-square overflow-hidden rounded-full">
            <Image
              src="/assets/about-images/about-image2.png"
              alt="orange box"
              fill
              sizes="140px"
              className="object-cover"
              priority
            />
          </div>

          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[35px_55px_55px_35px_/_35px_65px_65px_35px]">
            <Image
              src="/assets/about-images/about-image3.png"
              alt="box with balloon"
              fill
              sizes="140px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* About Content  */}
      <div className="about-content flex flex-col  text-start items-start  gap-6 w-130">
        <SecHeader text={tAbout('label')} />

        <div className="content-text items-start flex flex-col   gap-2">
          <h3 className="text-3xl font-bold text-text-primary">
            {tAbout('title.part1')}{' '}
            <span className="text-text-secondary">{tAbout('title.part2')}</span>{' '}
            {tAbout('title.part3')}{' '}
            <span className="text-text-secondary">{tAbout('title.part4')}</span>{' '}
            {tAbout('title.part5')}
          </h3>
          <p className="text-sm font-normal text-text-soft">
            {
              "Make every moment memorable with our premium gift boxes. Carefully curated and beautifully packaged, each box is filled with handpicked items designed to impress. Whether it's for a birthday, wedding, or a simple \“thank you,\” our gift boxes are crafted to leave a lasting impression — because thoughtful gifting starts here."
            }
          </p>
        </div>
        <Button variant="primary" title="home.discover" buttonVariant="text" />
        <ul className="flex flex-row flex-wrap items-center w-140 h-21 gap-4 text-left">
          <li className=" flex gap-2  w-60 ">
            <Check className="text-text-primary w-5 h-5" />
            <p className="text-xs text-text-plain">Competitive Prices & Easy Shopping</p>
          </li>
          <li className=" flex gap-2 w-60  ">
            <Check className="text-text-primary w-5 h-5" />
            <p className="text-xs text-text-plain">Premium Quality & Elegant Packaging</p>
          </li>
          <li className=" flex gap-2 w-60  ">
            <Check className="text-text-primary w-5 h-5" />
            <p className="text-xs text-text-plain">Perfect for Every Occasion</p>
          </li>
          <li className="flex gap-2 w-60  ">
            <Check className="text-text-primary w-5 h-5" />
            <p className="text-xs text-text-plain">Fast & Reliable Delivery</p>
          </li>
        </ul>
      </div>

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

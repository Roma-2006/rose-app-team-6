import React from 'react';
import Image from 'next/image';
import SecHeader from './section-header';
import { Button } from '@/shared/components/ui/button';

export default function AboutSection() {
  return (
    <section className="w-full flex  align-center justify-center  gap-20">
      <div className="about-imgs w-132.5">
        <Image
          src=""
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 418px"
          className="object-cover"
          priority
        />
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

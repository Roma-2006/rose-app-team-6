import React from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

const logos = [
  { name: 'Coconut', src: '/assets/partners-images/partner-image6.png' },
  { name: 'Ginyard', src: '/assets/partners-images/partner-image5.png' },
  { name: 'Ingoude Company', src: '/assets/partners-images/partner-image4.png' },
  { name: 'Velgit vet', src: '/assets/partners-images/partner-image3.png' },
  { name: 'Ingoude', src: '/assets/partners-images/partner-image2.png' },
  { name: 'Habu', src: '/assets/partners-images/partner-image1.png' },
];

export default async function PartnersSection() {
  const tPartners = await getTranslations('home.partners');

  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-10 h-51.5 w-full bg-bg-primary-fade rounded-xl gap-10 flex flex-col items-center justify-center overflow-hidden">
      {/* Partners Header */}
      <header className="Partners-header text-center px-4">
        <h3 className="text-3xl font-bold text-text-primary">
          {tPartners('title.part1')}{' '}
          <span className="text-text-secondary">{tPartners('title.part2')}</span>{' '}
          {tPartners('title.part3')}
        </h3>
      </header>

      {/* Partners Logos Container */}
      <div className="w-full overflow-hidden marquee ">
        <div className="flex w-max gap-12 items-center animate-marquee hover:[animation-play-state:paused]">
          {duplicatedLogos.map((logo, index) => (
            <div key={`${logo.name}-${index}`} className="relative h-12 w-35.5 flex-shrink-0">
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                fill
                sizes="142px"
                className="object-contain"
                priority={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

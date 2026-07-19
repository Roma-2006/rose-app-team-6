import React from 'react';
import Image from 'next/image';
const logos = [
  { name: 'Coconut', src: '/assets/partners-images/partner-image6.png' },
  { name: 'Ginyard', src: '/assets/partners-images/partner-image5.png' },
  { name: 'Ingoude Company', src: '/assets/partners-images/partner-image4.png' },
  { name: 'Velgit vet', src: '/assets/partners-images/partner-image3.png' },
  { name: 'Ingoude', src: '/assets/partners-images/partner-image2.png' },
  { name: 'Habu', src: '/assets/partners-images/partner-image1.png' },
];

export default function PartnersSection() {
  return (
    <section className=" py-10  h-51.5 w-full bg-bg-primary-fade mx-4 gap-10 flex flex-col items-center justify-center  ">
      {/* Parteners Header */}
      <header className=" Parteners-header text-center ">
        <h3 className="text-3xl font-bold text-text-primary">
          Trusted by over <span className="text-text-secondary">4.5k+</span> companies
        </h3>
      </header>

      {/* Partners  Logos*/}

      <div className=" partners-content px-6  w-full h-full max-h-13   flex  justify-between items-center">
        {logos.map((logo) => (
          <div key={logo.name} className="relative h-12 w-35.5">
            <Image
              src={logo.src}
              alt={`${logo.name} logo`}
              fill
              sizes="(max-width: 768px) 142px, 142px"
              className="object-contain"
              priority={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

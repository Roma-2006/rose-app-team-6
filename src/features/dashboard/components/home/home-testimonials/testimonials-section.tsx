import React from 'react';
import Image from 'next/image';
import SecHeader from '../section-header';
import SecTitle from '../section-title';
import { Star } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const testimonials = [
  {
    id: 1,
    name: 'Jake Miller',
    image: '/assets/testimonials-images/testimonial-image-1.png',
    stars: 4,
    text: "I've been ordering from this flower shop for years and they never disappoint. The quality and service are exceptional!",
    date: 'January 12, 2025',
  },
  {
    id: 2,
    name: 'Tyler Brooks',
    image: '/assets/testimonials-images/testimonial-image-2.png',
    stars: 4,
    text: "Customer service is top-notch and the flowers last longer than any others I've bought. Highly recommend!",
    date: 'January 12, 2025',
  },
  {
    id: 3,
    name: 'Max Turner',
    image: '/assets/testimonials-images/testimonial-image-3.png',
    stars: 4,
    text: 'The team truly cares about every order. I always feel confident when I buy flowers from here. The checkout process was sup...',
    date: 'January 12, 2025',
  },
];
export default async function TestimonialsSection() {
  const tTistimonial = await getTranslations('home.testimonials');

  return (
    <section className="-mx-20   h-165  flex flex-col items-center justify-center   mb-35">
      {/* Testimonials Header */}
      <header className=" testimonials-header text-center mb-10">
        <SecHeader text={tTistimonial('label')} className="pb-2" />
        <SecTitle text={tTistimonial('title')} className="pb-11.5" />
      </header>

      <div className=" testimonials-content   w-full h-full max-h-137.5 bg-bg-primary-fade  flex  justify-around items-center">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="card  px-5 h-62.5 mx-7.5 gap-3 relative bg-white rounded-3xl  flex flex-col items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
          >
            {/* Circular image */}

            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100 ">
              <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
            </div>

            {/* Customer Name */}

            <h4 className="font-semibold pt-13.5 text-text-plain font-semibold  ">{item.name}</h4>

            {/* Star Rating */}

            <div className="flex gap-0.5 pt-5">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={14}
                  className={` w-4 h-3.5 ${
                    index < item.stars
                      ? 'fill-[#FBA707] stroke-[#FBBF24]'
                      : 'fill-white stroke-[#FBBF24]'
                  }`}
                />
              ))}
            </div>

            {/* Customer Review  */}
            <p className="text-xs pt-2.5 font-medium  leading-relaxed h-12  flex-1 ">{item.text}</p>

            {/* Date of evaluation */}
            <span className="text-xs text-text-muted pb-5  font-medium">{item.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

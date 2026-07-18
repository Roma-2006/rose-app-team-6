import React from 'react';
import Image from 'next/image';
import SecHeader from '../section-header';
import { Button } from '@/shared/components/ui/button';
import { Check, Star } from 'lucide-react';
import SecTitle from '../section-title';

const testimonials = [
  {
    id: 1,
    name: 'Jake Miller',
    image: '/assets/testimonials/jake.png', // استبدل المسارات بملفاتك الحقيقية
    stars: 4,
    text: "I've been ordering from this flower shop for years and they never disappoint. The quality and service are exceptional!",
    date: 'January 12, 2026',
  },
  {
    id: 2,
    name: 'Tyler Brooks',
    image: '/assets/testimonials/tyler.png',
    stars: 4,
    text: "Customer service is top-notch and the flowers last longer than any others I've bought. Highly recommend!",
    date: 'January 12, 2026',
  },
  {
    id: 3,
    name: 'Max Turner',
    image: '/assets/testimonials/max.png',
    stars: 4,
    text: 'The team truly cares about every order. I always feel confident when I buy flowers from here. The checkout process was sup...',
    date: 'January 12, 2026',
  },
];
export default function TestimonialsSection() {
  return (
    <section className="   h-165 w-full mx-auto flex items-center justify-center gap-19  mb-35">
      {/* Testimonials Header */}
      <header className=" testimonials-header text-center mb-10">
        <SecHeader text="Testimonials" className="pb-2" />
        <SecTitle text="Real Words from Happy Customers" className="pb-11.5" />
      </header>
      <div className=" testimonials-content max-w-7xl w-full h-full max-h-137.5 bg-bg-primary-fade  grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16 mt-10">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="card  relative bg-white rounded-3xl pt-16 pb-6 px-6 flex flex-col items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
          >
            {/* الصورة الدائرية البارزة للأعلى بنصف حجمها */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100">
              <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
            </div>

            {/* اسم العميل */}
            <h4 className="font-bold text-text-plain font-semibold text-xs mb-2">{item.name}</h4>

            {/* تقييم النجوم (الأصفر والرمادي بناءً على تقييم البيانات) */}
            <div className="flex gap-0.5 mb-4">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={14}
                  className={`${
                    index < item.stars
                      ? 'fill-[#FBA707] stroke-[#FBBF24]'
                      : 'fill-gray-200 stroke-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* نص رأي العميل - flex-1 يضمن دفع التاريخ للأسفل في حال تفاوت حجم النصوص */}
            <p className="text-sm ext-text-plain font-normal leading-relaxed mb-6 flex-1 max-w-[240px]">
              {item.text}
            </p>

            {/* تاريخ التقييم الصغير بالأسفل */}
            <span className="text-xs text-text-muted  font-medium">{item.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

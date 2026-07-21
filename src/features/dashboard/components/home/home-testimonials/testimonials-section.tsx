'use client';
import React from 'react';
import SecHeader from '../section-header';
import SecTitle from '../section-title';
import Image from 'next/image';

export default function GallerySection() {
  return (
    <section className="w-full px-4 py-12 flex flex-col items-center justify-center bg-background">
      {/* Testimonials Header */}
      <header className="text-center">
        <SecHeader text="Gallery" className="pb-2" />
        <SecTitle text="Check Out our Wonderful Gallery" className="pb-11.5" />
      </header>
      {/* grid system */}
      <div className="w-full max-w-[1280px] mx-auto"></div>
    </section>
  );
}

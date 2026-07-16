// 'use client';
// import { BaseCheckbox } from '@/shared/components/custom-ui/BaseCheckbox';
// import { Button } from '@/shared/components/ui/button';
// import { Heart } from 'lucide-react';
// import { useState } from 'react';

// export default function Page() {
//   const list = [
//     { id: '1', label: 'hi' },
//     { id: '2', label: 'hello' },
//   ];

//   const handleClick = () => console.log('hello');
//   return (
//     <>
//       <Button
//         variant="primary"
//         title="button.submit"
//         onClick={() => handleClick()}
//         buttonVariant="text"
//       />
//       <Button variant="secondary" title="button.save" buttonVariant="text" />
//       <Button variant="outline" title="button.loading" loading buttonVariant="text" />
//       <Button variant="subtle" title="button.delete" buttonVariant="text" />
//       <Button variant="ghost" title="button.confirm" buttonVariant="text" />
//       <Button variant="destructive" title="button.cancel" buttonVariant="text" />
//       <Button variant="destructive" iconOnly={<Heart />} buttonVariant="icon" />
//       <Button variant="destructive" iconOnly={<Heart />} loading buttonVariant="icon" />
//       <BaseCheckbox list={list} onChange={(selected) => console.log(selected)} />
//     </>
//   );
// }

// src/app/[locale]/page.tsx
import { BestSellingSection } from '@/features/home/components/BestSellingSection';
import { MostPopularSection } from '@/features/home/components/MostPopularSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      {/* قسم الأكثر مبيعاً */}
      <section className="py-8">
        <BestSellingSection />
      </section>

      {/* فاصل بسيط أو مساحة */}
      <div className="h-12" />

      {/* قسم الأكثر شعبية مع الفلتر */}
      <section className="py-8">
        <MostPopularSection />
      </section>
    </main>
  );
}

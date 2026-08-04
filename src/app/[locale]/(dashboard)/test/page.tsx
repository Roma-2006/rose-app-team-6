'use client';
import AboutSection from '@/features/dashboard/components/home/home-about/about-section';
import { ProductCardSkeleton } from '@/features/dashboard/components/home/home-products/product-card-skelton';
<<<<<<< HEAD
import SecHeader from '@/features/dashboard/components/shared/section-header';
import SecTitle from '@/features/dashboard/components/shared/section-title';
=======
import SecHeader from '@/features/dashboard/components/home/section-header';
import SecTitle from '@/features/dashboard/components/home/section-title';
>>>>>>> 67f74cc5b2f63372fd222ce4d502de39038e4758
import { BaseCheckbox } from '@/shared/components/custom-ui/BaseCheckbox';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Heart } from 'lucide-react';

export default function Page() {
  const list = [
    { id: '1', label: 'hi' },
    { id: '2', label: 'hello' },
  ];

  const handleClick = () => console.log('hello');
  return (
    <>
      <Badge>3</Badge>
      <Badge>rowida</Badge>
      <Button
        variant="primary"
        title="button.submit"
        onClick={() => handleClick()}
        buttonVariant="text"
      />
      <Button variant="secondary" title="button.save" buttonVariant="text" />
      <Button variant="outline" title="button.loading" loading buttonVariant="text" />
      <Button variant="subtle" title="button.delete" buttonVariant="text" />
      <Button variant="ghost" title="button.confirm" buttonVariant="text" />
      <Button variant="destructive" title="button.cancel" buttonVariant="text" />
      <Button variant="destructive" iconOnly={<Heart />} buttonVariant="icon" />
      <Button variant="destructive" iconOnly={<Heart />} loading buttonVariant="icon" />
      <BaseCheckbox list={list} onChange={(selected) => console.log(selected)} />
      <SecHeader text="Best Selling" />
      <SecTitle text="Most Popular" className="w-80 ps-5" />
      <SecTitle text="Check Out our Wonderful Gallery" className="w-165 ps-2.5" />
      <SecTitle text="Real Words from Happy Customers" className="ps-5" />
      <AboutSection />
    </>
  );
}

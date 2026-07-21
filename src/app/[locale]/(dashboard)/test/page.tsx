'use client';
import AboutSection from '@/features/dashboard/components/home/home-about/about-section';
import SecHeader from '@/features/dashboard/components/home/section-header';
import SecTitle from '@/features/dashboard/components/home/section-title';
import { BaseCheckbox } from '@/shared/components/custom-ui/BaseCheckbox';
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

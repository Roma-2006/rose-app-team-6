'use client';
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
    </>
  );
}

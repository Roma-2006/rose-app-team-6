'use client';
import { BaseCheckbox } from '@/shared/components/custom-ui/BaseCheckbox';
import { Button } from '@/shared/components/ui/button';
import { Heart } from 'lucide-react';
import { useState } from 'react';

export default function Page() {
  const list = [
    { id: '1', label: 'hi' },
    { id: '2', label: 'hello' },
  ];

  const handleClick = () => console.log('hello');
  return (
    <>
      <Button variant="primary" title="button.submit" onClick={() => handleClick()} />
      <Button variant="secondary" title="button.save" />
      <Button variant="outline" title="button.loading" loading />
      <Button variant="subtle" title="button.delete" />
      <Button variant="ghost" title="button.confirm" />
      <Button variant="destructive" title="button.cancel" />
      <Button variant="destructive" iconOnly={<Heart />} />
      <Button variant="destructive" iconOnly={<Heart />} loading />
      <BaseCheckbox list={list} onChange={(selected) => console.log(selected)} />
    </>
  );
}

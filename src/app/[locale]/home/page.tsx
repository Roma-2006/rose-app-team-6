'use client';
import { BaseCheckbox } from '@/shared/components/custom-ui/BaseCheckbox';
import { useState } from 'react';

export default function Page() {
  const list = [
    { id: '1', label: 'hi' },
    { id: '2', label: 'hello' },
  ];
  return <BaseCheckbox list={list} onChange={(selected) => console.log(selected)} />;
}

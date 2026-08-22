import CustomInput from '@/shared/components/custom-input';
import { Button } from '@/shared/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react';

export default function CategoriesPage() {
  return (
    <section className="flex flex-col gap-4.5">
      <header className="w-full flex justify-between">
        <h2 className="text-2xl font-semibold text-text-plain">All Categories</h2>
        <Button
          buttonVariant="text"
          variant="primary"
          title="Add a new category"
          leftIcon={<Plus />}
        />
      </header>
      <main></main>
    </section>
  );
}

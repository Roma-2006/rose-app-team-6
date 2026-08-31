'use client';

import React, { useState, useRef, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useCategory } from '@/features/dashboard/hooks/use-category';
import { Upload } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { CreateCategoryType } from '@/features/dashboard/types/categories/categories';
import { useTranslations } from 'next-intl';
import CustomInput from '@/shared/components/custom-input';
import { Button } from '@/shared/components/ui/button';

interface SwaggerUploadSuccessPayload {
  status: boolean;
  code: number;
  payload: {
    url: string;
  };
}

// Variables
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AddCategoryPage() {
  //Translation
  const tDashboard = useTranslations('dashboard.categories');
  //States
  const [name, setName] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createCategory, isCreating } = useCategory();
  const [uploading, setUploading] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const isPending = isCreating || uploading;

  //Functions
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setLocalError('Invalid file type. Please choose a JPG, PNG, GIF, or WEBP image.');
      setImageFile(null);
      setImageName('');
      return;
    }

    setLocalError(null);
    setImageFile(file);
    setImageName(file.name);
  };

  const triggerFileSelect = (): void => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerFileSelect();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!name.trim()) {
      setLocalError('Category name cannot be empty.');
      return;
    }

    if (!imageFile) {
      setLocalError('Please choose a category image file first.');
      return;
    }

    if (isPending) return;

    try {
      setLocalError(null);
      setUploading(true);

      const formData = new FormData();
      formData.append('image', imageFile);

      const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: session?.token ? { Authorization: `Bearer ${session.token}` } : {},
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error(
          `Image upload failed with backend HTTP status code: ${uploadResponse.status}`
        );
      }

      const uploadResult = (await uploadResponse.json()) as SwaggerUploadSuccessPayload;
      const temporaryCacheImageUrl = uploadResult?.payload?.url;

      if (!temporaryCacheImageUrl) {
        throw new Error(
          'Could not extract temporary cache image URL from the upload response payload.'
        );
      }

      const payload: CreateCategoryType = {
        title: name.trim(),
        description: `Collection of premium products listed under ${name.trim()} category.`,
        image: temporaryCacheImageUrl,
      };

      await createCategory(payload);
      router.refresh();
      router.push('/dashboard/categories/catergory/[id]');
    } catch (err: unknown) {
      console.error('Category Creation Flow Error:', err);
      setLocalError(err instanceof Error ? err.message : 'An unexpected runtime error occurred.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="p-8 max-w-3xl mx-auto w-full">
      <h1 className="text-xl font-bold text-text-default mb-6">{tDashboard('add-new-category')}</h1>

      <form onSubmit={handleSubmit} className=" p-8    space-y-5">
        {localError && (
          <div className="p-4 text-xs font-semibold text-text-danger bg-bg-red border border-border-danger rounded-xl">
            {localError}
          </div>
        )}

        <div>
          <CustomInput
            variant="default"
            id="category-name"
            placeholder={tDashboard('add-category-placeholder')}
            label={tDashboard('name')}
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          {/* <div
            onClick={triggerFileSelect}
          > */}
          {/* <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg, image/png, image/gif, image/webp" // 🛠️ قفل الاختيار من نظام التشغيل لمنع رفع صيغ معطوبة
              className="hidden"
            /> */}
          <CustomInput
            onClick={triggerFileSelect}
            variant="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg, image/png, image/gif, image/webp"
            label={tDashboard('category-image')}
            className="w-full"
          />
          {/* <span
              className={`text-sm ${imageName ? 'text-text-default font-medium' : 'text-gray-300'}`}
            >
              {imageName || 'No file chosen'}
            </span> */}
          {/* <button
              type="button"
              className="text-xs text-[#A32A38] font-semibold flex items-center gap-1.5 hover:opacity-80 border-0 bg-transparent outline-none cursor-pointer"
            >
              <Upload size={14} className="stroke-[2.5]" />
              Upload file
            </button> */}
        </div>
        {/* </div> */}

        <Button
          type="submit"
          buttonVariant="text"
          variant="primary"
          disabled={isCreating || uploading}
          title="dashboard.categories.add-category"
          className="w-full h-13"
        />
      </form>
    </main>
  );
}

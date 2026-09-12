'use client';

import React, { useState, useRef, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import CustomInput from '@/shared/components/custom-input';
import { Button } from '@/shared/components/ui/button';
import { useOccasion } from '@/features/dashboard/hooks/use-occasion';
import { CreateOccasionType } from '@/features/dashboard/types/occasions/occasions';

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

export default function AddOccasionPage() {
  //Translation
  const tDashboard = useTranslations('dashboard.occasions');
  //States
  const [name, setName] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createOccasion, isCreating } = useOccasion();
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
      setLocalError('Occasion name cannot be empty.');
      return;
    }

    if (!imageFile) {
      setLocalError('Please choose an occasion image file first.');
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

      const payload: CreateOccasionType = {
        title: name.trim(),
        description: `Collection of premium products listed under ${name.trim()} occasion.`,
        image: temporaryCacheImageUrl,
      };

      await createOccasion(payload);
      router.refresh();
      router.push('/dashboard/occasions/occasion/[id]');
    } catch (err: unknown) {
      console.error('Occasion Creation Flow Error:', err);
      setLocalError(err instanceof Error ? err.message : 'An unexpected runtime error occurred.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="p-6 md:p-8 max-w-3xl mx-auto w-full flex flex-col min-h-[calc(100vh-120px)] md:min-h-0">
      <h1 className="md:text-xl  text-lg font-bold text-text-default mb-6">
        {tDashboard('add-new-occasion')}
      </h1>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-4 md:p-8 space-y-5 ">
        {localError && (
          <div className="p-4 md:text-sm text-xs font-semibold text-text-danger bg-bg-danger border border-border-danger  rounded-xl">
            {localError}
          </div>
        )}

        <div>
          <CustomInput
            variant="default"
            id="occasion-name"
            placeholder={tDashboard('add-occasion-placeholder')}
            label={tDashboard('name')}
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            className="w-full placeholder: md:text-lg text-xs"
          />
        </div>

        <div>
          <CustomInput
            onClick={triggerFileSelect}
            variant="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg, image/png, image/gif, image/webp"
            label={tDashboard('occasion-image')}
            className="w-full placeholder: md:text-lg text-xs"
          />
        </div>

        <Button
          type="submit"
          buttonVariant="text"
          variant="primary"
          disabled={isCreating || uploading}
          title="dashboard.occasions.add-occasion"
          className="w-full  md:h-13 h-11 mt-auto md:mt-17 "
        />
      </form>
    </main>
  );
}

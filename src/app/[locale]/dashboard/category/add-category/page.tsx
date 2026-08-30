'use client';

import React, { useState, useRef, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useCategory } from '@/features/dashboard/hooks/use-category';
import { Upload } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { CreateCategoryType } from '@/features/dashboard/types/categories/categories';

interface SwaggerUploadSuccessPayload {
  status: boolean;
  code: number;
  payload: {
    url: string;
  };
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AddCategoryPage() {
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
      formData.append('image', imageFile); // ⚠️ Verify if Swagger expects 'image' or 'file'

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
      router.push('/dashboard/catergory/[id]');
    } catch (err: unknown) {
      console.error('Category Creation Flow Error:', err);
      setLocalError(err instanceof Error ? err.message : 'An unexpected runtime error occurred.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="p-8 max-w-3xl mx-auto w-full">
      <div className="text-xs text-gray-400 mb-6 flex gap-2 items-center">
        <span>Dashboard</span> <span>&gt;</span> <span>Categories</span> <span>&gt;</span>{' '}
        <span className="text-[#A32A38] font-medium">Add Category</span>
      </div>

      <h1 className="text-xl font-bold text-gray-900 mb-6">Add a New Category</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-5"
      >
        {localError && (
          <div className="p-4 text-xs font-semibold text-[#A32A38] bg-red-50 border border-red-100 rounded-xl">
            {localError}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Name *</label>
          <input
            type="text"
            required
            placeholder="Enter category name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#A32A38] bg-white transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Category image *</label>
          <div
            onClick={triggerFileSelect}
            className="w-full flex justify-between items-center px-4 py-2.5 border border-gray-200 rounded-xl bg-white cursor-pointer hover:border-gray-300 transition-colors"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg, image/png, image/gif, image/webp" // 🛠️ قفل الاختيار من نظام التشغيل لمنع رفع صيغ معطوبة
              className="hidden"
            />
            <span
              className={`text-sm ${imageName ? 'text-gray-900 font-medium' : 'text-gray-300'}`}
            >
              {imageName || 'No file chosen'}
            </span>
            <button
              type="button"
              className="text-xs text-[#A32A38] font-semibold flex items-center gap-1.5 hover:opacity-80 border-0 bg-transparent outline-none cursor-pointer"
            >
              <Upload size={14} className="stroke-[2.5]" />
              Upload file
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isCreating || uploading}
          className="w-full bg-[#A32A38] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#8A222E] transition-colors disabled:opacity-40 mt-4 cursor-pointer"
        >
          {isCreating || uploading ? 'Processing & Uploading...' : 'Add Category'}
        </button>
      </form>
    </main>
  );
}

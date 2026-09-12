'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Eye } from 'lucide-react';
import CustomInput from '@/shared/components/custom-input';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';
import { getOccasionByIdAction } from '@/features/dashboard/actions/occasions/get-occasion-by-id.action';
import { useOccasion } from '@/features/dashboard/hooks/use-occasion';

// Strong type structure configuration mapping raw server responses cleanly without any
interface ServerOccasionInfo {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
}

interface ServerPayloadWrapper {
  occasion?: ServerOccasionInfo;
}

export default function UpdateOccasionPage() {
  //Translation
  const tDashboard = useTranslations('dashboard.occasions');

  //Variables
  const params = useParams();
  const id: string = Array.isArray(params?.id) ? params.id[0] || '' : params?.id || '';

  //Navigation
  const router = useRouter();

  // States
  const [name, setName] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [localError, setLocalError] = useState<string | null>(null);

  //Hooks
  const { updateOccasion, isUpdating } = useOccasion();
  useEffect(() => {
    let isMounted = true;

    const loadOccasion = async (): Promise<void> => {
      if (!id) return;
      try {
        setLocalError(null);
        const res = await getOccasionByIdAction(id);

        if (isMounted && res.success && res.data) {
          const wrappedData = res.data as ServerPayloadWrapper;
          const activeOccasion = wrappedData?.occasion;

          const occasionTitle = activeOccasion?.title || '';
          const occasionImage = activeOccasion?.image || '';

          if (occasionTitle) {
            setName(occasionTitle);
            setDisplayName(occasionTitle);
          }
          if (occasionImage) {
            setImageUrl(occasionImage);
          }
        } else if (isMounted && !res.success) {
          setLocalError(res.message || 'Failed to fetch occasion data.');
        }
      } catch (err) {
        console.error('Error rendering fields:', err);
        if (isMounted) {
          setLocalError('An error occurred while loading occasion.');
        }
      }
    };

    loadOccasion();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // View category image handler
  const handleViewImage = (): void => {
    if (imageUrl) {
      window.open(imageUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert('No image path available for this target occasion item.');
    }
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (isUpdating || !id) return;

    try {
      setLocalError(null);
      await updateOccasion({
        id,
        data: { title: name },
      });

      router.refresh();
      router.push(`/dashboard/occasions/occasion/${id}`);
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        setLocalError(error.message);
      } else {
        setLocalError('Failed to update.');
      }
    }
  };

  return (
    <main className="p-6 md:p-8 max-w-3xl mx-auto w-full flex flex-col min-h-[calc(100vh-120px)] md:min-h-0">
      <h1 className="md:text-xl  text-lg font-bold text-text-default mb-6">
        {tDashboard('update-occasion')}
        {displayName ? `: ${displayName}` : ''}
      </h1>

      <form onSubmit={handleUpdate} className="flex-1 flex flex-col p-4 md:p-8 space-y-5 ">
        {localError && (
          <div className="p-4 md:text-sm text-xs font-semibold text-text-danger bg-bg-danger border border-border-danger  rounded-xl">
            {localError}
          </div>
        )}

        <div>
          <CustomInput
            variant="default"
            id="occasion-name"
            placeholder={displayName || 'Loading name...'}
            label={tDashboard('name')}
            value={name}
            disabled={isUpdating}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            className="w-full placeholder: md:text-lg text-xs"
          />
        </div>

        <div className="flex border border-border-muted rounded-lg justify-start p-2  md:border-none  md:justify-end">
          <button
            type="button"
            onClick={handleViewImage}
            disabled={!imageUrl}
            className="text-xs text-text-info  md:p-2 md:border  md:border-border-muted md:rounded-xl font-medium inline-flex items-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Eye size={13} /> {tDashboard('view-occasion-image')}
          </button>
        </div>

        <Button
          type="submit"
          buttonVariant="text"
          variant="primary"
          disabled={isUpdating || !name}
          title="dashboard.occasions.update-occasion"
          className="w-full  md:h-13 h-11 mt-auto md:mt-17 "
        />
      </form>
    </main>
  );
}

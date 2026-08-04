'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { IAddReviewFormData } from '../../types/product-reviews';
import RatingStars from './star-rating';
import CustomInput from '@/shared/components/custom-input';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { FieldGroup } from '@/shared/components/ui/field';
import { Textarea } from '@/shared/components/ui/textarea';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { UseReview } from '../../hooks/use-review';
interface IAddReviewFormProps {
  isAuthenticated: boolean;
  productId: string;
}

export default function AddReviewForm({ isAuthenticated, productId }: IAddReviewFormProps) {
  const tInput = useTranslations('custom-input');
  const router = useRouter();
  const { mutate, isPending } = UseReview(productId);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const form = useForm<IAddReviewFormData>({
    defaultValues: {
      rating: 0,
      title: '',
      review: '',
    },
  });
  // the send function to pass data directly to the hook
  const onFormSubmit = async (data: IAddReviewFormData) => {
    mutate(data, {
      onSuccess: (res) => {
        if (res.success) {
          form.reset();
        }
      },
    });
  };
  const handleGoToLogin = () => {
    router.push('/login');
  };

  const handleAddReviewClick = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    setShowLoginPrompt(false);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onFormSubmit)}
      className="relative w-full max-w-130 max-h-92 flex flex-col  items-start justify-between "
    >
      {/* Content wrapper grouped for unauthenticated blur state */}
      <div
        className={`w-full space-y-4 transition-all duration-200 ${!isAuthenticated && showLoginPrompt ? 'blur-[1px] pointer-events-none select-none opacity-50' : ''}`}
      >
        {/* Field : Star Rating */}

        <FieldGroup>
          <div className="flex items-center w-full gap-2">
            <Label className="text-sm font-medium text-text-plain">Your rating:</Label>
            <Controller
              name="rating"
              control={form.control}
              render={({ field }) => (
                <RatingStars
                  rating={field.value}
                  maxStars={5}
                  onStarClick={(value) => field.onChange(value)}
                />
              )}
            />
          </div>

          {/* Field 2: Review Title Input */}

          <div className="flex w-full flex-col gap-2.5">
            <Controller
              name="title"
              control={form.control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  className="w-full"
                  variant="default"
                  subVariant="review-title"
                  id="title"
                  placeholder={tInput('default.review-title.placeholder')}
                  label={tInput('default.review-title.label')}
                />
              )}
            />
          </div>

          {/* Field  3: Review Text Area */}
          <div className="flex flex-col gap-2.5 relative">
            <label htmlFor="review" className="text-sm font-medium text-text-plain">
              Review
            </label>
            <Controller
              name="review"
              control={form.control}
              rules={{ required: 'Review details are required' }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="review"
                  disabled={!isAuthenticated && showLoginPrompt}
                  rows={4}
                  placeholder="What do you think of this product?"
                  className={`w-full p-2 text-sm border rounded-md  resize-none  outline-none focus:outline-none focus-visible:outline-none  focus-visible:ring-0  ${
                    !isAuthenticated && showLoginPrompt ? 'cursor-not-allowed' : ''
                  }`}
                />
              )}
            />
          </div>
        </FieldGroup>

        {/* Submit Button */}

        <Button
          type="submit"
          buttonVariant="text"
          variant="primary"
          className="mt-9 w-full"
          title={isPending ? 'Adding...' : 'Add Review'}
          disabled={isPending}
          onClick={handleAddReviewClick}
        />
      </div>

      {/* Centered Login Overlay Box */}
      {!isAuthenticated && showLoginPrompt && (
        <div className="absolute inset-0 flex items-center justify-center p-6 z-10">
          <button
            type="button"
            onClick={handleGoToLogin}
            className=" w-full  mt-9   py-3   font-semibold text-xs text-text-plain cursor-pointer hover:scale-[1.02] active:scale-[0.98]  select-none"
          >
            Please login to be able to review the product
          </button>
        </div>
      )}
    </form>
  );
}

'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { IAddReviewFormData } from '../../types/product-reviews';
import RatingStars from './star-rating';
import CustomInput from '@/shared/components/custom-input';
import { Button } from '@base-ui/react';

interface AddReviewFormProps {
  onLoginClick?: () => void;
  isAuthenticated: boolean;
  onSubmit: (data: IAddReviewFormData) => Promise<void> | void;
}

export default function AddReviewForm({
  onSubmit,
  isAuthenticated,
  onLoginClick,
}: AddReviewFormProps) {
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isSubmittingState, setIsSubmittingState] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IAddReviewFormData>({
    defaultValues: {
      rating: 0,
      title: '',
      review: '',
    },
  });

  const onFormSubmit = async (data: IAddReviewFormData) => {
    setIsSubmittingState(true);
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setIsSubmittingState(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="relative max-w-121 max-h-92 flex flex-col  items-start justify-between "
    >
      {/* Content wrapper grouped for unauthenticated blur state */}
      <div
        className={`space-y-4 transition-all duration-200 ${!isAuthenticated ? 'blur-[2px] pointer-events-none select-none opacity-50' : ''}`}
      >
        {/* Field Group 1: Star Rating */}
        <div className="flex flex-col gap-1 ">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-text-plain">Your rating:</span>
            <Controller
              name="rating"
              control={control}
              rules={{
                required: 'Please select a rating score',
                min: { value: 1, message: 'Please select a rating score' },
              }}
              render={({ field }) => (
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <button
                        key={index}
                        type="button"
                        disabled={!isAuthenticated}
                        className="focus:outline-none"
                        onClick={() => field.onChange(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <RatingStars rating={hoverRating || field.value} maxStars={5} />
                      </button>
                    );
                  })}
                </div>
              )}
            />
          </div>
          {errors.rating && (
            <p className="text-xs text-text-danger font-medium">{errors.rating.message}</p>
          )}
        </div>

        {/* Field Group 2: Review Title Input */}
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className=" text-xs font-medium text-text-plain">
            Title
          </label>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Review title is required' }}
            render={({ field }) => (
              <CustomInput
                {...field}
                variant="default"
                id="title"
                disabled={!isAuthenticated}
                placeholder="Enter review title"
              />
            )}
          />
          {errors.title && (
            <p className="text-xs text-text-danger font-medium">{errors.title.message}</p>
          )}
        </div>

        {/* Field Group 3: Review Text Area */}
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="review" className="text-xs font-medium text-text-plain">
            Review
          </label>
          <Controller
            name="review"
            control={control}
            rules={{ required: 'Review details are required' }}
            render={({ field }) => (
              <textarea
                {...field}
                id="review"
                rows={4}
                disabled={!isAuthenticated}
                placeholder="What do you think of this product?"
                className="w-full text-sm border rounded-md focus:outline-none placeholder-text-muted text-text-muted resize-none transition-colors"
              />
            )}
          />
        </div>

        {/* Action Button */}

        <Button
          type="submit"
          className="mt-9 w-full"
          title={isSubmittingState ? 'Adding...' : 'Add Review'}
          disabled={!isAuthenticated || isSubmittingState}
        />
      </div>

      {/* Centered Login Overlay Box */}
      {!isAuthenticated && (
        <div className="absolute inset-0 flex items-center justify-center p-6 z-10">
          <div
            onClick={onLoginClick}
            className="text-center bg-white/95 px-5 py-3 rounded-lg border border-gray-200 shadow-md font-semibold text-sm text-gray-900 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform select-none"
          >
            Please login to be able to review the product
          </div>
        </div>
      )}
    </form>
  );
}

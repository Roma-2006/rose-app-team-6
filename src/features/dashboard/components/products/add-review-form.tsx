'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Star } from 'lucide-react';
import { IAddReviewFormData } from '../../types/product-reviews';

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
      className="relative max-w-xl bg-white p-6 rounded-xl border border-gray-100 shadow-sm font-sans space-y-4"
    >
      {/* Content wrapper grouped for unauthenticated blur state */}
      <div
        className={`space-y-4 transition-all duration-200 ${!isAuthenticated ? 'blur-[2px] pointer-events-none select-none opacity-50' : ''}`}
      >
        {/* Field Group 1: Star Rating */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Your rating:</span>
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
                    const isFilled = starValue <= (hoverRating || field.value);
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
                        <Star
                          size={16}
                          className={`w-4 h-4 ${
                            isFilled
                              ? 'fill-[#FBA707] stroke-[#FBBF24]'
                              : 'fill-white stroke-[#FBBF24]'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            />
          </div>
          {errors.rating && (
            <p className="text-xs text-red-500 font-medium">{errors.rating.message}</p>
          )}
        </div>

        {/* Field Group 2: Review Title Input */}
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="block text-xs font-semibold text-gray-700">
            Title
          </label>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Review title is required' }}
            render={({ field }) => (
              <input
                {...field}
                id="title"
                type="text"
                disabled={!isAuthenticated}
                placeholder="Enter review title"
                className={`w-full px-3 py-2 text-sm bg-white border rounded-md focus:outline-none placeholder-gray-300 text-gray-800 transition-colors ${
                  errors.title
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-200 focus:border-gray-400'
                }`}
              />
            )}
          />
          {errors.title && (
            <p className="text-xs text-red-500 font-medium">{errors.title.message}</p>
          )}
        </div>

        {/* Field Group 3: Review Text Area */}
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="review" className="block text-xs font-semibold text-gray-700">
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
                className={`w-full px-3 py-2 text-sm bg-white border rounded-md focus:outline-none placeholder-gray-300 text-gray-800 resize-none transition-colors ${
                  errors.review
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-200 focus:border-gray-400'
                }`}
              />
            )}
          />
          {errors.review && (
            <p className="text-xs text-red-500 font-medium">{errors.review.message}</p>
          )}
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={!isAuthenticated || isSubmittingState}
          className="w-full bg-[#A32242] hover:bg-[#881b36] transition-colors text-white font-medium py-2 px-4 rounded-md text-sm disabled:bg-gray-300"
        >
          {isSubmittingState ? 'Adding...' : 'Add Review'}
        </button>
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

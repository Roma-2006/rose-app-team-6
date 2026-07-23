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

interface IAddReviewFormProps {
  onLoginClick?: () => void;
  isAuthenticated: boolean;
}

export default function AddReviewForm({ isAuthenticated, onLoginClick }: IAddReviewFormProps) {
  const [isSubmittingState, setIsSubmittingState] = useState<boolean>(false);

  const form = useForm<IAddReviewFormData>({
    defaultValues: {
      rating: 0,
      title: '',
      review: '',
    },
  });
  const onFormSubmit = async (data: IAddReviewFormData) => {
    setIsSubmittingState(true);
    try {
      console.log('Form submitted internally with data:', data);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Successfully reset form values since no error was thrown
      form.reset();
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setIsSubmittingState(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onFormSubmit)}
      className="relative w-full max-w-120 max-h-92 flex flex-col  items-start justify-between "
    >
      {/* Content wrapper grouped for unauthenticated blur state */}
      <div
        className={`w-full space-y-4 transition-all duration-200 ${!isAuthenticated ? 'blur-[2px] pointer-events-none select-none opacity-50' : ''}`}
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
                  disabled={!isAuthenticated}
                  onStarClick={(value) => field.onChange(value)}
                />
              )}
            />
          </div>

          {/* Field 2: Review Title Input */}

          <div className="flex w-full flex-col gap-1">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <CustomInput
                  {...field}
                  className="w-full"
                  variant="default"
                  id="title"
                  label="Title"
                  disabled={!isAuthenticated}
                  placeholder="Enter review title"
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
              render={({ field, fieldState }) => (
                <Textarea
                  {...field}
                  id="review"
                  rows={4}
                  disabled={!isAuthenticated}
                  placeholder="What do you think of this product?"
                  className="w-full p-2 text-sm border rounded-md  resize-none  outline-none focus:outline-none focus-visible:outline-none  focus-visible:ring-0  "
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
          title={isSubmittingState ? 'Adding...' : 'Add Review'}
          disabled={!isAuthenticated || isSubmittingState}
          loading={isSubmittingState}
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

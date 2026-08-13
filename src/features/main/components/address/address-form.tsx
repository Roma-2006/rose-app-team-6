'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations, useLocale } from 'next-intl';

import { addressSchema, AddressFormValues } from '../../schemas/address.schema';

import { Textarea } from '@/shared/components/ui/textarea';
import CustomInput from '@/shared/components/custom-input';
import { Address } from '../../types/address-model';
import { PhoneVariant } from '@/shared/components/ui/phone-variant.';
import { Button } from '@/shared/components/ui/button';
import { AddressProgress } from './address-progress';

interface AddressFormProps {
  mode: 'add' | 'edit';
  initialData: Address | null;
  onBack?: () => void;
  onContinue: (data: AddressFormValues) => void;
}

export function AddressForm({ mode, initialData, onBack, onContinue }: AddressFormProps) {
  const t = useTranslations('address');
  const locale = useLocale();

  const isRtl = locale === 'ar';

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),

    defaultValues: initialData
      ? {
          title: initialData.title,
          city: initialData.city,
          street: initialData.street,
          phone: initialData.phone,
          latitude: Number(initialData.latitude),
          longitude: Number(initialData.longitude),
        }
      : {
          title: '',
          city: '',
          street: '',
          phone: '',
          latitude: null,
          longitude: null,
        },
  });

  const handleFormSubmit = (values: AddressFormValues) => {
    onContinue(values);
  };

  return (
    <div className="flex h-full w-full flex-col">
      {/* Header */}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto  pr-2">
          <h3 className="text-2xl font-medium text-text-primary border-b border-border-muted  pb-4">
            {t('add.step1Title')}
          </h3>

          <div className="space-y-3">
            {/* Title */}
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <CustomInput
                  {...field}
                  variant="default"
                  label={t('title')}
                  placeholder={t('titlePlaceholder')}
                  error={fieldState.invalid}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
            {/* City */}
            <Controller
              name="city"
              control={control}
              render={({ field, fieldState }) => (
                <CustomInput
                  {...field}
                  variant="default"
                  label={t('city')}
                  placeholder="Enter city name"
                  error={fieldState.invalid}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />

            {/* Address */}
            <div>
              <label className="mb-1.5 block text-sm  text-text-plain">{t('details')}</label>

              <Controller
                name="street"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    ref={field.ref}
                    placeholder="Enter your full address"
                    error={errors.street?.message}
                    // maxLength={200}
                    // showCount
                  />
                )}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 block text-sm  text-text-plain">{t('phone')}</label>

              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneVariant
                    value={field.value}
                    onChange={field.onChange}
                    isError={!!errors.phone}
                    isRtl={isRtl}
                  />
                )}
              />

              {errors.phone && (
                <span className="text-sm text-text-danger">{errors.phone.message}</span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-3 pt-6">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            buttonVariant="text"
            title={t('cancel')}
            className="h-14 flex-1 text-lg font-bold"
          />

          <Button
            type="submit"
            variant="primary"
            buttonVariant="text"
            title={t('next')}
            className="h-14 flex-1 text-lg font-bold"
          />
        </div>
      </form>
    </div>
  );
}

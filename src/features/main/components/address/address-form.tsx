'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeft } from 'lucide-react';

import { addressSchema, AddressFormValues } from '../../schemas/address.schema';
import { Textarea } from '@/shared/components/ui/textarea';
import CustomInput from '@/shared/components/custom-input';
import { AddressMap } from './address-map';
import { AddressProgress } from './address-progress';
import { Address, CreateAddressRequest } from '../../types/address-model';
import { useAddresses } from '../../hooks/use-addresses';
import { Value as PhoneValue } from 'react-phone-number-input';
import { PhoneVariant } from '@/shared/components/ui/phone-variant.';
import { Button } from '@/shared/components/ui/button';

interface AddressFormProps {
  mode: 'add' | 'edit';
  initialData: Address | null;
  onBack?: () => void;
}

export function AddressForm({ mode, initialData, onBack }: AddressFormProps) {
  const [step, setStep] = useState<1 | 2>(1);

  const t = useTranslations('address');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const { createAddress, updateAddress, isMutating } = useAddresses();

  const {
    handleSubmit,
    trigger,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData
      ? {
          city: initialData.city,
          street: initialData.street,
          phone: initialData.phone,
          latitude: Number(initialData.latitude),
          longitude: Number(initialData.longitude),
        }
      : {
          city: '',
          street: '',
          phone: '',
          latitude: null,
          longitude: null,
        },
  });

  const latitude = watch('latitude');
  const longitude = watch('longitude');

  const handleNext = async () => {
    const isStep1Valid = await trigger(['city', 'street', 'phone']);

    if (isStep1Valid) {
      setStep(2);
    }
  };

  const handleLocationChange = (location: { lat: number; lng: number }) => {
    setValue('latitude', location.lat, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue('longitude', location.lng, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = async (values: AddressFormValues) => {
    if (values.latitude === null || values.longitude === null) {
      return;
    }

    const payload: CreateAddressRequest = {
      city: values.city,
      street: values.street,
      phone: values.phone as PhoneValue,
      latitude: values.latitude,
      longitude: values.longitude,
      isPrimary: initialData?.isPrimary ?? false,
      title: initialData?.title || values.city,
    };

    try {
      if (mode === 'add') {
        await createAddress(payload);
      } else if (initialData) {
        await updateAddress({
          id: initialData.id,
          data: payload,
        });
      }

      onBack?.();
    } catch {
      // Error handling is handled by the mutation hook.
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        {mode === 'add' ? t('add.title') : t('editTitle')}
      </h2>

      <AddressProgress step={step} />

      <form onSubmit={handleSubmit(onSubmit)} className="flex min-h-0 flex-1 flex-col">
        {step === 1 ? (
          <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto pr-2 animate-in fade-in duration-300">
            <h3 className="text-2xl font-medium text-text-primary">{t('add.step1Title')}</h3>

            <div className="space-y-2">
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

              <label className="mb-1.5 block text-sm font-medium text-text-plain">
                {t('details')}
              </label>

              <Controller
                name="street"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    ref={field.ref}
                    placeholder="Enter your full address"
                    error={errors.street?.message}
                    maxLength={200}
                    showCount
                  />
                )}
              />

              <label className="mb-1.5 block text-sm font-medium text-text-plain">
                {t('phone')}
              </label>

              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneVariant
                    value={field.value as PhoneValue}
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

            <div className="mt-auto flex gap-3">
              <Button
                type="button"
                onClick={() => onBack?.()}
                variant="outline"
                buttonVariant="text"
                title={t('cancel')}
                className="h-14 flex-1 text-lg font-bold"
              />

              <Button
                type="button"
                onClick={handleNext}
                variant="primary"
                buttonVariant="text"
                title={t('next')}
                className="h-14 flex-1 text-lg font-bold"
              />
            </div>
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col gap-4">
            <div className="-mt-2 flex items-center gap-4 border-b border-border-muted pb-1.5">
              <Button
                type="button"
                onClick={() => setStep(1)}
                variant="primary"
                buttonVariant="icon"
                className="h-10 w-10 rounded-full"
                iconOnly={<ChevronLeft className={isRtl ? 'rotate-180' : ''} size={22} />}
              />

              <h3 className="text-lg font-medium text-text-primary">{t('add.step2Title')}</h3>
            </div>

            <div className="min-h-0 flex-1">
              <AddressMap
                location={
                  latitude !== null && longitude !== null
                    ? {
                        lat: latitude,
                        lng: longitude,
                      }
                    : null
                }
                onLocationChange={handleLocationChange}
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => onBack?.()}
                variant="outline"
                buttonVariant="text"
                title={t('cancel')}
                className="h-14 flex-1 rounded-xl text-lg font-bold"
              />

              <Button
                type="button"
                variant="primary"
                buttonVariant="text"
                loading={isMutating}
                disabled={latitude === null || longitude === null}
                onClick={handleSubmit(onSubmit)}
                title={mode === 'add' ? t('save') : t('updateAddress')}
                className="h-14 flex-1 rounded-xl text-lg font-bold"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

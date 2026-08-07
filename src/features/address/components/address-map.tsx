'use client';

import { Button } from '@/shared/components/ui/button';
import { MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

export interface AddressLocation {
  lat: number;
  lng: number;
}

interface AddressMapProps {
  location: AddressLocation | null;
  onLocationChange: (location: AddressLocation) => void;
}

export function AddressMap({ location, onLocationChange }: AddressMapProps) {
  const t = useTranslations('address');
  const handleFindLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        onLocationChange({
          lat: latitude,
          lng: longitude,
        });

        console.log({
          latitude,
          longitude,
        });
      },
      (error) => {
        console.error(error);
        alert('Unable to retrieve your location.');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full overflow-hidden rounded-2xl border border-border-muted">
        <Button
          type="button"
          onClick={handleFindLocation}
          variant="primary"
          buttonVariant="text"
          title={t('findMyLocation')}
          leftIcon={<MapPin className="h-4 w-4 text-text-danger" />}
          className="absolute right-4 top-4 z-10 h-10 w-auto px-4 bg-bg-plain border border-border-primary text-text-primary hover:bg-bg-muted  "
        />

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.336634842475!2d31.29969216459247!3d30.059556316745375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2z2KfZhNmC2KfZh9ix2KnYjCDZhdit2KfZgdi42Kkg2KfZhNmC2KfZh9ix2KnigKw!5e0!3m2!1sar!2seg!4v1785960468826!5m2!1sar!2seg"
          className="h-85 w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          title="Address Location"
        />
      </div>
    </div>
  );
}

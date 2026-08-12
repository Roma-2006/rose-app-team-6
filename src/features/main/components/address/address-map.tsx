'use client';

import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import { Button } from '@/shared/components/ui/button';
import { MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

interface AddressMapProps {
  location: { lat: number; lng: number } | null;
  onLocationChange: (location: { lat: number; lng: number }) => void;
}

const DEFAULT_MAP_CENTER = {
  lat: 30.0444,
  lng: 31.2357,
};

const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '340px',
};

export function AddressMap({ location, onLocationChange }: AddressMapProps) {
  const t = useTranslations('address');

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const handleFindLocation = () => {
    if (!navigator.geolocation) {
      toast.error(t('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationChange({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        toast.error(t('Unable to retrieve your location.'));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  if (!isLoaded) {
    return <div className="h-85 w-full animate-pulse rounded-2xl bg-bg-muted" />;
  }

  const center = location ?? DEFAULT_MAP_CENTER;
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
          className="absolute right-4 top-4 z-10 h-10 w-auto border border-border-primary bg-bg-plain px-4 text-text-primary hover:bg-bg-muted"
        />

        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={center}
          zoom={13}
          onClick={(event) => {
            if (!event.latLng) return;

            onLocationChange({
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            });
          }}
        >
          {location && (
            <Marker
              position={location}
              draggable
              onDragEnd={(event) => {
                if (!event.latLng) return;

                onLocationChange({
                  lat: event.latLng.lat(),
                  lng: event.latLng.lng(),
                });
              }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

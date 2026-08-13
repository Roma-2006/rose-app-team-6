'use client';

import { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { MapPin, ChevronLeft } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { AddressProgress } from './address-progress';

interface AddressMapProps {
  mode: 'add' | 'edit';
  initialPosition?: {
    lat: number;
    lng: number;
  };
  onBack: () => void;
  onConfirm: (position: { lat: number; lng: number }) => void;
}

const DEFAULT_MAP_CENTER = {
  lat: 30.0444,
  lng: 31.2357,
};

const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '100%',
};

export function AddressMap({ mode, initialPosition, onBack, onConfirm }: AddressMapProps) {
  const t = useTranslations('address');
  const locale = useLocale();

  const isRtl = locale === 'ar';

  const [position, setPosition] = useState(initialPosition ?? DEFAULT_MAP_CENTER);

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  });

  useEffect(() => {
    if (!initialPosition || !map) return;

    map.panTo(initialPosition);
    map.setZoom(16);
  }, [initialPosition, map]);

  const handleLocationChange = (location: { lat: number; lng: number }) => {
    setPosition(location);

    map?.panTo(location);
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;

    handleLocationChange({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;

    handleLocationChange({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleFindLocation = () => {
    if (!navigator.geolocation) {
      toast.error(t('geolocationNotSupported'));

      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const newPosition = {
          lat: coords.latitude,
          lng: coords.longitude,
        };

        setPosition(newPosition);

        map?.panTo(newPosition);
        map?.setZoom(17);
      },
      () => {
        toast.error(t('unableToRetrieveLocation'));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  const handleConfirm = () => {
    onConfirm(position);
  };

  if (loadError) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl bg-bg-muted">
        <p className="text-sm text-text-danger">{t('mapLoadError')}</p>
      </div>
    );
  }

  if (!isLoaded) {
    return <div className="h-full min-h-100 w-full animate-pulse rounded-2xl bg-bg-muted" />;
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-border-muted pb-3">
        <Button
          type="button"
          onClick={onBack}
          variant="primary"
          buttonVariant="icon"
          className="h-10 w-10 shrink-0 rounded-full"
          iconOnly={<ChevronLeft className={isRtl ? 'rotate-180' : ''} size={22} />}
        />

        <div>
          <h2 className="text-xl font-bold text-text-primary">{t('add.step2Title')}</h2>
        </div>
      </div>

      {/* Map */}
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-border-muted">
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={position}
          zoom={16}
          onLoad={setMap}
          onUnmount={() => setMap(null)}
          onClick={handleMapClick}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            clickableIcons: false,
            zoomControl: true,
          }}
        >
          <Marker position={position} draggable onDragEnd={handleMarkerDragEnd} />
        </GoogleMap>

        {/* Find My Location */}
        <Button
          type="button"
          onClick={handleFindLocation}
          variant="primary"
          buttonVariant="text"
          title={t('findMyLocation')}
          leftIcon={<MapPin className="h-4 w-4 text-text-danger" />}
          className="
            absolute
            right-4
            top-4
            z-10
            h-10
            border
            border-border-primary
            bg-bg-plain
            px-4
            text-text-primary
            shadow-sm
            hover:bg-bg-muted
          "
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          buttonVariant="text"
          title={t('cancel')}
          className="h-14 flex-1 rounded-xl text-lg font-bold"
        />

        <Button
          type="button"
          onClick={handleConfirm}
          variant="primary"
          buttonVariant="text"
          title={mode === 'edit' ? t('updateLocation') : t('confirmLocation')}
          className="h-14 flex-1 rounded-xl text-lg font-bold"
        />
      </div>
    </div>
  );
}

import Image from 'next/image';

type AvatarProps = {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: number;
};

export default function Avatar({ src, alt = 'Profile photo', fallback, size }: AvatarProps) {
  return (
    <>
      {src ? (
        <Image fill src={src} alt={alt} sizes={`${size}px`} className="object-cover rounded-full" />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-text-inverse">
          {fallback?.charAt(0).toUpperCase()}
        </span>
      )}
    </>
  );
}

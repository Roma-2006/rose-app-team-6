'use client';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSeparator() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  if (!mounted) {
    return;
    <Image
      src="/assets/images/separator-light.png"
      alt="separator"
      width={280}
      height={45}
      priority
      className="mx-auto mt-12 mb-10 "
    />;
  }

  const imgSrc =
    resolvedTheme === 'dark'
      ? '/assets/images/separator-dark.png'
      : '/assets/images/separator-light.png';

  return (
    <Image
      src={imgSrc}
      alt="separator"
      width={280}
      height={45}
      priority
      className="mx-auto mt-12 mb-10 "
    />
  );
}

'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import { Moon, Sun } from 'lucide-react';

const LABELS = {
  ar: { dark: 'داكن', light: 'فاتح' },
  en: { dark: 'Dark', light: 'Light' },
} as const;
type Locale = keyof typeof LABELS;

const subscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}

export function ThemeToggle() {
  const isMounted = useIsMounted();
  const { resolvedTheme, setTheme } = useTheme();
  const locale = useLocale() as Locale;

  const themeHandler = (newTheme: string) => {
    setTheme(newTheme);

    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
  };

  if (!isMounted) return null;

  return (
    <button
      onClick={() => {
        const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
        themeHandler(newTheme);
      }}
      className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors text-primary hover:bg-primary hover hover:text-primary-foreground "
    >
      {resolvedTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      <span>{resolvedTheme === 'dark' ? LABELS[locale].light : LABELS[locale].dark}</span>
    </button>
  );
}

'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import { Moon, Sun, LucideIcon } from 'lucide-react';
import { useSyncExternalStore } from 'react';

type Locale = 'ar' | 'en';
type ThemeOption = 'light' | 'dark';

const LABELS: Record<Locale, Record<ThemeOption, string>> = {
  ar: { light: 'فاتح', dark: 'داكن' },
  en: { light: 'Light', dark: 'Dark' },
};

const ICONS: Record<ThemeOption, LucideIcon> = {
  light: Moon,
  dark: Sun,
};

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
  const { theme, setTheme, resolvedTheme } = useTheme();
  const locale = useLocale() as Locale;

  useEffect(() => {
    if (theme) {
      document.cookie = `theme=${theme}; path=/; max-age=31536000`;
    }
  }, [theme]);

  if (!isMounted) return null;

  const currentTheme = (theme ?? 'system') as ThemeOption;

  const CurrentIcon = ICONS[currentTheme] || Sun;

  const toggleTheme = () => {
    if (currentTheme === 'light') setTheme('dark');
    else setTheme('light');
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={LABELS[locale][currentTheme]}
      title={LABELS[locale][currentTheme]}
      className="flex items-center justify-center rounded-full  bg-bg-plain p-3 text-text-plain transition-colors hover:bg-bg-muted"
    >
      <CurrentIcon size={24} />
    </button>
  );
}

'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { useLocale } from 'use-intl';
import { Moon, Sun } from 'lucide-react';

const LABELS = {
  ar: { dark: 'داكن', light: 'ضوء' },
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
  const locale = useLocale() as Locale;
  const { resolvedTheme, setTheme } = useTheme();

  if (!isMounted) return null;

  const isDark = resolvedTheme === 'dark';
  const labels = LABELS[locale] ?? LABELS.en;

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors"
      aria-label={isDark ? labels.light : labels.dark}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      <span>{isDark ? labels.light : labels.dark}</span>
    </button>
  );
}

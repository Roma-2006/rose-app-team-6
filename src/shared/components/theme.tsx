'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import { Moon, Sun, Monitor, LucideIcon } from 'lucide-react';

type Locale = 'ar' | 'en';
type ThemeOption = 'light' | 'system' | 'dark';

const LABELS: Record<Locale, Record<ThemeOption, string>> = {
  ar: { light: 'فاتح', system: 'تلقائي', dark: 'داكن' },
  en: { light: 'Light', system: 'System', dark: 'Dark' },
};

const ICONS: Record<ThemeOption, LucideIcon> = {
  light: Sun,
  system: Monitor,
  dark: Moon,
};

const THEME_OPTIONS: ThemeOption[] = ['light', 'system', 'dark'];

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
  const { theme, setTheme } = useTheme();
  const locale = useLocale() as Locale;

  useEffect(() => {
    if (theme) {
      document.cookie = `theme=${theme}; path=/; max-age=31536000`;
    }
  }, [theme]);

  if (!isMounted) return null;

  const activeTheme = (theme ?? 'system') as ThemeOption;

  return (
    <div
      role="group"
      aria-label={LABELS[locale].system}
      className="inline-flex items-center gap-1 rounded-full border border-border-soft bg-bg-plain p-1"
    >
      {THEME_OPTIONS.map((option) => {
        const Icon = ICONS[option];
        return (
          <button
            key={option}
            onClick={() => setTheme(option)}
            aria-pressed={activeTheme === option}
            aria-label={LABELS[locale][option]}
            className={[
              'flex items-center rounded-full p-3 text-text-plain transition-colors',
              activeTheme === option ? 'bg-bg-muted' : '',
            ].join(' ')}
          >
            <Icon size={24} />
          </button>
        );
      })}
    </div>
  );
}

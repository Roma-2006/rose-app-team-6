import { useMemo } from 'react';

interface UseTextareaProps {
  value: string | number | readonly string[] | undefined;
  maxLength?: number;
  charCountText: string;
}

export function useTextarea({ value, maxLength, charCountText }: UseTextareaProps) {
  const currentLength = useMemo(() => (value ? String(value).length : 0), [value]);

  const formattedCharCount = useMemo(() => {
    return charCountText
      .replace('{current}', currentLength.toString())
      .replace('{max}', maxLength?.toString() || '0');
  }, [charCountText, currentLength, maxLength]);

  const isLimitReached = !!maxLength && currentLength >= maxLength;

  return {
    formattedCharCount,
    isLimitReached,
  };
}

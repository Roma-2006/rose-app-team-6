import { useState, useMemo, useCallback, useRef } from 'react';

interface UseComboboxProps<T> {
  options: T[];
  onValueChange?: (value: string | null) => void;
}

export function useComboboxLogic<T extends { label: string; value: string }>({
  options,
  onValueChange,
}: UseComboboxProps<T>) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. الفلترة (كما هي)
  const filteredOptions = useMemo(() => {
    if (!query) return options;
    return options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()));
  }, [query, options]);

  // 2. الدالة الجديدة لتحديث البحث والـ Loading معاً (بديل الـ useEffect)
  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);

    // تنظيف التايمر القديم إن وجد
    if (timerRef.current) clearTimeout(timerRef.current);

    if (newQuery) {
      setIsLoading(true);
      // محاكاة انتهاء التحميل بعد 400ms
      timerRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 400);
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleValueChange = useCallback(
    (value: string | null) => {
      onValueChange?.(value);
      setQuery('');
      setIsOpen(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsLoading(false);
    },
    [onValueChange]
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
      setIsLoading(false);
    }
  }, []);

  return {
    query,
    setQuery: handleQueryChange,
    isOpen,
    setIsOpen,
    isLoading,
    filteredOptions,
    handleValueChange,
    handleKeyDown,
    isEmpty: query !== '' && filteredOptions.length === 0 && !isLoading,
  };
}

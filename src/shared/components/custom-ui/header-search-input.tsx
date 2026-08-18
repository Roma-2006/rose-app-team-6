import { useTranslations } from 'next-intl';
import CustomInput from '../custom-input';
import ProductItem from './product-item';
import { useEffect, useRef, useState } from 'react';
import useAllProducts from '@/features/main/hooks/use-all-products';
import ProductItemSkeleton from '../../../features/main/components/skeleton/product-item-skeleton';

export default function HeaderSearchInput() {
  const t = useTranslations();
  // State
  const [openDropdown, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  // DataQueries
  const userSearch = useAllProducts(
    {
      search: debouncedSearch,
    },
    debouncedSearch.length >= 2
  );
  const productsSuggestions = useAllProducts({
    sortBy: 'bestSelling',
  });
  // Refs
  const searchRef = useRef<HTMLDivElement>(null);
  // Effects
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);
  return (
    <div ref={searchRef} className="relative">
      {/* search input */}
      <CustomInput
        variant="search"
        placeholder={t('header.search-placeholder')}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setDropdownOpen(true)}
        value={search}
      />
      {/* dropDown */}
      {openDropdown && (
        <div className="absolute bg-bg-plain right-0 left-0  max-h-96 overflow-y-auto z-5">
          {search.length < 2 ? (
            <>
              <h1 className="p-2.5 font-semibold text-base text-text-primary ">
                {t('header.search-default')}
              </h1>
              {productsSuggestions.isLoading ? (
                <ProductItemSkeleton />
              ) : (
                productsSuggestions.data?.data?.map((item) => (
                  <ProductItem key={item.id} product={item} />
                ))
              )}
            </>
          ) : userSearch.isLoading ? (
            <ProductItemSkeleton />
          ) : userSearch.isError ? (
            <p>{t('header.search-error')}</p>
          ) : userSearch.data?.data?.length ? (
            userSearch.data?.data?.map((item) => (
              <ProductItem key={item.id} product={item} search={debouncedSearch} />
            ))
          ) : (
            <p>{t('header.search-empty')}</p>
          )}
        </div>
      )}
    </div>
  );
}

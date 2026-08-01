import { useTranslations } from 'next-intl';
import CustomInput from '../custom-input';
import ProductItem from './product-item';
import { useEffect, useRef, useState } from 'react';

export default function HeaderSearchInput() {
  const t = useTranslations();
  const [openDropdown, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const productList = [
    {
      image: '/assets/images/flower.png',
      title: 'Dreamy White Roses Bouquet',
      price: '198',
      rate: '4.5/5',
      rating: '8',
    },
  ];
  const userSearch = productList.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
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
    if (search.trim().length < 2) return;
    const searchTimer = setTimeout(() => {
      // Call API
    }, 300);
    return () => clearTimeout(searchTimer);
  }, [search]);
  return (
    <div ref={searchRef} className="relative">
      <CustomInput
        variant="search"
        placeholder={t('header.search-placeholder')}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setDropdownOpen(true)}
        value={search}
      />
      {openDropdown && (
        <div className="absolute bg-bg-plain right-0 left-0 ">
          {search.length < 2 ? (
            <>
              <h1 className="p-2.5 font-semibold text-base text-text-primary ">
                {t('header.search-default')}
              </h1>
              {productList.map((item) => (
                <ProductItem
                  key={item.title}
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  rate={item.rate}
                  rating={item.rating}
                />
              ))}
            </>
          ) : userSearch.length > 0 ? (
            userSearch.map((item) => (
              <ProductItem
                key={item.title}
                image={item.image}
                title={item.title}
                price={item.price}
                rate={item.rate}
                rating={item.rating}
                search={search}
              />
            ))
          ) : (
            <p>{t('header.search-empty')}</p>
          )}
        </div>
      )}
    </div>
  );
}

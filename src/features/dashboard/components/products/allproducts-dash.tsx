'use client';
import ProductPagination from '@/features/main/components/products/product-pagination';
import { calculateDiscountedPrice } from '@/features/main/utils/calculate-discount';
import CustomInput from '@/shared/components/custom-input';
import { Button } from '@/shared/components/ui/button';
import { Plus, Trash, Pencil, EllipsisVertical } from 'lucide-react';
import { useTranslations } from 'next-intl';
import EditDeleteDropdown from '../shared/edit-delete-dropdown';
import { useRouter } from 'next/navigation';
import { deleteProduct } from '../../actions/products.action';
import { Product, TProductsResponse } from '@/features/main/types/products';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import { useState } from 'react';
export default function AllproductsDash({ products }: { products: TProductsResponse }) {
  //Translations
  const t = useTranslations('dashboard.products');
  //Navigation
  const router = useRouter();
  //Variables
  const [search, setSearch] = useState('');
  const tableHeader = ['table.name', 'table.price', 'table.stock', 'table.sales', 'table.ratings'];
  const filteredProducts = search.trim()
    ? products.data.filter((product) =>
        product.subCategory.title.toLowerCase().includes(search.toLowerCase())
      )
    : products.data;
  //Mutation
  const {
    mutate: deleteProductMutation,
    isPending: isDeleting,
    variables: deletingProductId,
  } = useMutation({
    mutationFn: async (productId: string) => {
      await deleteProduct({ productId });
    },
    onSuccess: () => {
      toast.success(t('delete-success'));
    },
    onError: () => {
      toast.error(t('delete-error'));
    },
  });
  //Function
  const handleDelete = (productId: string) => {
    console.log(productId);
    deleteProductMutation(productId);
  };
  const handleEdit = (productId: string) => {
    router.push(`/dashboard/products/update-product?id=${productId}`);
  };
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-4.5 bg-bg-plain p-6 mb-6">
        <header className="flex justify-between items-center">
          <h2 className="text-text-plain font-semibold text-2xl">{t('title')}</h2>
          <Button
            buttonVariant="text"
            variant="primary"
            leftIcon={<Plus />}
            title="dashboard.products.add-product"
            onClick={() => router.push('/dashboard/products/add-product')}
            responsiveIconOnly
          />
        </header>
        <CustomInput variant="search" onChange={(e) => setSearch(e.target.value)} value={search} />
        <table className="table-fixed w-full [&_th]:p-2.5 [&_th]:pl-5  [&_td]:p-2.5 [&_td]:pl-5 ">
          <thead>
            <tr className=" bg-bg-muted">
              {tableHeader.map((e: string, index) => (
                <th key={index} className="font-medium text-start text-sm text-text-plain">
                  {t(e)}
                </th>
              ))}
              <th aria-label="actions" />
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => {
              const discountedPrice = Number(calculateDiscountedPrice(product));
              const sale = product.price - discountedPrice;
              return (
                <tr
                  key={product.id}
                  className="text-sm border-t border-border-muted hover:bg-bg-primary-fade transition-colors duration-300"
                >
                  <td className="font-semibold">
                    {/* {product.category.title} */}
                    {product.subCategory ? product.subCategory.title : product.category.title}
                  </td>
                  <td>
                    {discountedPrice.toFixed(2)} {t('currency.egp')}
                  </td>
                  <td className={cn(product.stock <= 5 && 'text-text-danger')}>{product.stock}</td>
                  <td>{sale.toFixed(0)}</td>
                  <td>
                    {product.ratings}/5 <span>({product.rating.toFixed(0)})</span>
                  </td>
                  <td>
                    <div className="flex flex-col xl:flex-row  justify-between items-center max-sm:hidden">
                      <Button
                        buttonVariant="text"
                        title="button.edit"
                        leftIcon={<Pencil size={14} />}
                        variant="blue"
                        size="xs"
                        onClick={() => handleEdit(product.id)}
                      />
                      <Button
                        buttonVariant="text"
                        title="button.delete"
                        leftIcon={<Trash size={14} />}
                        variant="danger"
                        size="xs"
                        onClick={() => handleDelete(product.id)}
                        loading={isDeleting && deletingProductId === product.id}
                      />
                    </div>
                    <EditDeleteDropdown
                      handleDelete={() => handleDelete(product.id)}
                      handleEdit={() => handleEdit(product.id)}
                      isDeleting={isDeleting && deletingProductId === product.id}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {products?.metadata && <ProductPagination productMetaData={products?.metadata} isDashboard />}
    </section>
  );
}

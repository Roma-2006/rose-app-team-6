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
export default function AllproductsDash({ products }: { products: TProductsResponse }) {
  const t = useTranslations('dashboard.products');
  const router = useRouter();
  const tableHeader = ['table.name', 'table.price', 'table.stock', 'table.sales', 'table.ratings'];
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
  const handleDelete = (productId: string) => {
    console.log(productId);
    deleteProductMutation(productId);
  };
  const handleEdit = (productId: string) => {
    router.push(`/dashboard/product/update-product?id=${productId}`);
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
            onClick={() => router.push('/dashboard/product/add-product')}
            responsiveIconOnly
          />
        </header>
        <CustomInput
          variant="search"
          // onChange={(e) => setSearch(e.target.value)}
          // onFocus={() => setDropdownOpen(true)}
          // value={search}
        />
        <table className="[&_th]:p-2.5 [&_th]:pl-5  [&_td]:p-2.5 [&_td]:pl-5 ">
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
            {products.data.map((product) => {
              const discountedPrice = Number(calculateDiscountedPrice(product));
              const sale = product.price - discountedPrice;
              return (
                <tr
                  key={product.id}
                  className="text-sm border-t border-border-muted hover:bg-bg-primary-fade transition-colors duration-300"
                >
                  <td className="font-semibold">
                    {/* {product.category.title} */}
                    {product.subCategory.title}
                  </td>
                  <td>
                    {discountedPrice.toFixed(2)} {t('currency.egp')}
                  </td>
                  <td>{product.stock}</td>
                  <td>{sale}</td>
                  <td>
                    {product.ratings}/5 <span>({product.rating})</span>
                  </td>
                  <td>
                    <div className="flex gap-2.5 items-center max-sm:hidden">
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
                        leftIcon={<Trash size={16} />}
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

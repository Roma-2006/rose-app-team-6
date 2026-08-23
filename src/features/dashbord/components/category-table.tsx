'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Search, SquarePen, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { CategoryTableProps } from '../types/categories';
import { useCategory } from '../hooks/use-category';
import CustomInput from '@/shared/components/custom-input';
import { Link } from '@/i18n/navigation';

export default function CategoryTable({
  initialCategories,
  initialTotalPages,
  currentPage,
  currentSearch,
}: CategoryTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState(currentSearch);
  const [isPending, startTransition] = useTransition();

  const { deleteCategory, isDeleting } = useCategory();

  const handleParamChange = (newPage: number, newSearch: string) => {
    const params = new URLSearchParams();
    params.set('page', newPage.toString());

    if (newSearch.trim()) {
      params.set('search', newSearch.trim().substring(0, 200));
    }
  };

  // معالجة الحذف التفاعلي والآمن
  const handleDeleteClick = async (id: string) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this category? This action cannot be undone.'
      )
    )
      return;

    try {
      // تنفيذ الحذف عبر الـ Custom Hook لتصفير كاش React Query تلقائياً
      await deleteCategory(id);
      alert('Category deleted successfully!');

      // عمل Refresh خفيف لتحديث خادم الـ Server Component وقراءة القائمة الجديدة
      router.refresh();
    } catch (err: unknown) {}
  };

  return (
    <>
      {/* 1. شريط البحث والتحكم الذكي */}
      <CustomInput
        variant="search"
        value={search}
        label=""
        onChange={(e) => {
          setSearch(e.target.value);
          handleParamChange(1, e.target.value); // عند تغيير النص نعود تلقائياً للصفحة 1
        }}
      />

      {/* 2. جدول البيانات والمحاكاة البصرية */}
      <div className="overflow-x-auto px-5 mt-4.5 mb-6">
        <table className="w-full text-left  border-collapse ">
          <thead>
            <tr className=" text-text-plain  flex justify-start text-sm font-medium   ">
              <th className="  w-[20%]">Name</th>
              <th className=" w-[20%]">Products</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {initialCategories.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-gray-400">
                  No categories found matching filters.
                </td>
              </tr>
            ) : (
              initialCategories.map((category, index) => (
                <tr
                  key={category.id}
                  className={`hover:bg-gray-50/40 transition-colors ${
                    index === 1 ? 'bg-[#FFF0F2]/40' : '' // تمييز الصف الثاني بلون الهوية الفاتح كما في صورتك المرسلة سابقاً
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-gray-900">{category.title}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {category.productsCount ?? 0} products
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {/* زر التعديل الموجه للمسار الديناميكي */}
                    <Link
                      href={`/admin/categories/edit/${category.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md text-xs font-medium transition-colors"
                    >
                      <SquarePen size={12} /> Edit
                    </Link>

                    {/* زر الحذف المرتبط بحالة الـ loading الخاصة بالـ useMutation */}
                    <button
                      onClick={() => handleDeleteClick(category.id)}
                      disabled={isDeleting}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-500 hover:bg-red-100 disabled:opacity-40 rounded-md text-xs font-medium transition-colors"
                    >
                      <Trash2 size={12} />
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 3. الترقيم (Pagination) السيرفري المدعوم بالـ URL Params */}
      {initialTotalPages > 1 && (
        <div className="p-4 border-t border-gray-50 flex justify-center items-center gap-1 text-xs">
          <button
            disabled={currentPage === 1}
            onClick={() => handleParamChange(currentPage - 1, search)}
            className="p-1.5 text-gray-400 disabled:opacity-20 hover:bg-gray-50 rounded transition-colors"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: initialTotalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => handleParamChange(p, search)}
              className={`w-7 h-7 flex items-center justify-center rounded-full font-medium transition-colors ${
                currentPage === p ? 'bg-[#A31D33] text-white' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {p}
            </button>
          ))}

          <button
            disabled={currentPage === initialTotalPages}
            onClick={() => handleParamChange(currentPage + 1, search)}
            className="p-1.5 text-gray-400 disabled:opacity-20 hover:bg-gray-50 rounded transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </>
  );
}

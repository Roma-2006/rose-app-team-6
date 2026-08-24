'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  isPending: boolean;
  onPageChange: (newPage: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  isPending,
  onPageChange,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];

    // 1. إذا كان إجمالي الصفحات 4 أو أقل، اعرض الأرقام كلها متسلسلة بدون نقاط
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // 2. إذا كان إجمالي الصفحات أكبر من 4 (هنا يبدأ تفعيل النقاط الفاصلة بدقة)
    if (currentPage <= 2) {
      pages.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - 1) {
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage, currentPage + 1, '...', totalPages);
    }

    return pages;
  };

  const pageNumbers = renderPageNumbers();

  return (
    <div className="w-full flex justify-center items-center gap-1.5 py-2 bg-white text-[13px] text-gray-600 select-none">
      {/* السهم المزدوج الأيسر » */}
      <button
        disabled={currentPage === 1 || isPending}
        onClick={() => onPageChange(1)}
        className="p-1 text-gray-300 disabled:opacity-30 hover:text-gray-900 transition-colors"
      >
        <ChevronsLeft size={13} strokeWidth={2.5} />
      </button>

      {/* السهم المفرد الأيسر > */}
      <button
        disabled={currentPage === 1 || isPending}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-1 text-gray-300 disabled:opacity-30 hover:text-gray-900 transition-colors mr-2"
      >
        <ChevronLeft size={13} strokeWidth={2.5} />
      </button>

      {/* الأرقام والنقاط المفحوصة والمضمونة من التكرار */}
      {pageNumbers.map((p, idx) => {
        if (p === '...') {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="w-7 h-7 flex items-center justify-center text-gray-400 font-normal px-1"
            >
              ...
            </span>
          );
        }

        const isCurrent = currentPage === p;

        return (
          <button
            key={`page-${p}-${idx}`} // دمج الـ index يضمن فرادة الـ key بالكامل للمتصفح
            disabled={isPending}
            onClick={() => onPageChange(p as number)}
            className={`w-7 h-7 flex items-center justify-center transition-all ${
              isCurrent
                ? 'bg-[#A31D33] text-white font-normal rounded-[8px] shadow-sm'
                : 'text-gray-500 hover:text-gray-900 font-normal'
            }`}
          >
            {p}
          </button>
        );
      })}

      {/* السهم المفرد الأيمن < */}
      <button
        disabled={currentPage === totalPages || isPending}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-1 text-gray-300 disabled:opacity-30 hover:text-gray-900 transition-colors ml-2"
      >
        <ChevronRight size={13} strokeWidth={2.5} />
      </button>

      {/* السهم المزدوج الأيمن « */}
      <button
        disabled={currentPage === totalPages || isPending}
        onClick={() => onPageChange(totalPages)}
        className="p-1 text-gray-300 disabled:opacity-30 hover:text-gray-900 transition-colors"
      >
        <ChevronsRight size={13} strokeWidth={2.5} />
      </button>
    </div>
  );
}

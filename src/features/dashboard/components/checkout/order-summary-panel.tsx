'use client';
import React from 'react';
import CouponForm from './order-summary-form';
import AppliedCouponsBox from './applied-coupons-box';
import TotalPrice from './total-price';
import { IOrderSummaryPanelProps } from '../../types/order-summary';


export default function OrderSummaryPanel({ 
  subtotal,
  variant = 'editable', 
}: IOrderSummaryPanelProps) {

  // التحقق من تفعيل وضع التعديل (يصبح false في صفحة الـ Checkout)
  const isEditable = variant === 'editable';
  
  // استدعاء الحالات المشتركة من الـ Global Context
  const { appliedCoupons, isRecalculating, addCoupon, removeCoupon, setIsRecalculating } = useOrderSummary();

  const handleValidCouponApplied = async (coupon: any) => {
    setIsRecalculating(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    addCoupon(coupon);
    setIsRecalculating(false);
  };

  const handleRemoveCoupon = async (id: string) => {
    setIsRecalculating(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    removeCoupon(id);
    setIsRecalculating(false);
  };

  return (
    <section className="w-full max-w-[458px] max-h-[604px] gap-6 flex flex-col p-6 bg-white border border-[#F2F4F7] rounded-xl shadow-sm font-sans">
      <h5 className="text-black text-3xl font-semibold tracking-tight">Summary</h5>

      {/* 🛠️ حل المشكلة (A): لا يتم ريندر نموذج الإدخال إلا إذا كنا في وضع الـ editable فقط */}
      {isEditable && (
        <CouponForm subtotal={subtotal} onValidCouponApplied={handleValidCouponApplied} />
      )}
      
      {/* صندوق عرض الكوبونات المطبقة مسبقاً (يمكّنك أيضاً تمرير الـ variant لتعطيل زر الحذف ✕ بداخل الصندوق أثناء الدفع) */}
      <AppliedCouponsBox 
        appliedCoupons={appliedCoupons}
        onRemoveCoupon={handleRemoveCoupon}
        currency="EGP"
        variant={variant} // تمرير المتغير لمنع الحذف بالخطأ في خطوات الدفع
      />

      {/* مكون عرض الفاتورة والأسعار التراكمية حياً */}
      <TotalPrice 
        subtotal={subtotal}
        appliedCoupons={appliedCoupons}
        currency="EGP"
        isRecalculating={isRecalculating}
      />
    </section>
  );
}

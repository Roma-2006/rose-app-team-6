'use client';

import { Button } from '@/shared/components/ui/button';
import { Minus, Plus } from 'lucide-react';

interface QuantityStepperProps {
  quantity: number;
  maxStock: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  disabled?: boolean;
}

export default function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  disabled = false,
}: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        buttonVariant="icon"
        iconOnly={<Minus className="h-4 w-4" />}
        className="h-12 w-12  bg-pink-100 text-rose-700 hover:bg-pink-200 border-none rounded-md"
        onClick={onDecrement}
        disabled={disabled}
      />

      <span className="w-25 h-11  text-center pr-17 text-text-muted text-sm font-semibold border border-border-plain rounded-md py-2">
        {quantity}
      </span>

      <Button
        variant="outline"
        buttonVariant="icon"
        iconOnly={<Plus className="h-4 w-4" />}
        className="h-12 w-12  bg-pink-100 text-rose-700 hover:bg-pink-200 border-none rounded-md"
        onClick={onIncrement}
        disabled={disabled}
      />
    </div>
  );
}

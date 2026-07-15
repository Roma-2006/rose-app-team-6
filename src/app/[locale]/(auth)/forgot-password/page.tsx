'use client';
import { useState } from 'react';
import { ForgotPasswordForm } from '@/features/auth/components/forgot-password/forgot-password-form';
import { PasswordResetSent } from '@/features/auth/components/forgot-password/password-reset-sent';

export default function ForgotPasswordPage() {
  // State
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState('');

  // Functions
  const handleSuccess = (email: string) => {
    setUserEmail(email);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {step === 1 ? (
        <ForgotPasswordForm onSuccess={handleSuccess} />
      ) : (
        <PasswordResetSent email={userEmail} onBack={handleBack} />
      )}
    </div>
  );
}

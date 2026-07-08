// import { ForgetPasswordFlow } from '@/features/auth/components/forgot-password/forget-password-flow';

// export default function ForgotPasswordPage() {
//   return <ForgetPasswordFlow />;
// }

'use client';
import { useState } from 'react';
// لاحظ تغيير المسارات هنا لتصبح absolute paths باستخدام @
import { ForgotPasswordForm } from '@/features/auth/components/forgot-password/forgot-password-form';
import { PasswordResetSent } from '@/features/auth/components/forgot-password/password-reset-sent'; // تأكد من المسار

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState('');

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

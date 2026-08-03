import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}

import React, { Suspense } from 'react';
import ForgotPasswordView from '@/components/auth/forgot-password';
import { Metadata } from 'next';
import PageTransition from '@/components/page-transition';
import AuthLayout from '@/components/Layout/AuthLayout';

export const metadata: Metadata = {
  title: 'Forgot Password',
};

export default function ForgotPassword() {
  return (
    <Suspense fallback={<PageTransition />}>
      <AuthLayout>
        <ForgotPasswordView />
      </AuthLayout>
    </Suspense>
  );
}

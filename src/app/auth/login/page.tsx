import React from 'react';
import { Metadata } from 'next';
import AuthLayout from '@/components/Layout/AuthLayout';
import LoginView from './_component/login-form';

export const metadata: Metadata = {
  title: 'Login',
};

export default function Login() {
  return (
    <AuthLayout>
      <LoginView />
    </AuthLayout>
  );
}

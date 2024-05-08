import React from 'react';
import { Metadata } from 'next';
import AuthLayout from '@/components/Layout/AuthLayout';
import CapitalAd from '@/assets/capital-ad.png';
import LoginView from './_component/login-form';
import AdWrapper from '../_components/ad-wrapper';

export const metadata: Metadata = {
  title: 'Login',
};

export default function Login() {
  return (
    <AuthLayout className="sm:max-w-full">
      <AdWrapper image={CapitalAd}>
        <LoginView />
      </AdWrapper>
    </AuthLayout>
  );
}

'use client';

import React from 'react';
import VerifyIdentityModal from '@/components/VerifyBusiness/IdentityDocument';
import VerifyBusinessModal from '@/components/VerifyBusiness/BusinessVerification';
import VerifyBvnModals from '@/components/VerifyBusiness/VerifyBvn';
import VerifyNinModals from '@/components/VerifyBusiness/VerifyNin';
import VerifyPhoneNumberModal from '@/components/VerifyBusiness/VerifyPhoneNumber';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>{children}</div>
      <VerifyPhoneNumberModal />
      <VerifyNinModals />
      <VerifyBvnModals />
      <VerifyBusinessModal />
      <VerifyIdentityModal />
    </div>
  );
}

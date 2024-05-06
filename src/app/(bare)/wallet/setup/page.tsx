import { Metadata } from 'next';
import React from 'react';
import AccountSetup from './_components/setup';

export const metadata: Metadata = {
  title: 'Account Setup',
};

export default function page() {
  return <AccountSetup />;
}

import { Metadata } from 'next';
import { Suspense } from 'react';
import DashboardLayoutShell from '@/shared/DashboardLayoutShell';
import PageTransition from '@/components/page-transition';
import TransferWrapper from './_components/wrapper';

export const metadata: Metadata = {
  title: 'Transfer',
};

export default function Transfer() {
  return (
    <DashboardLayoutShell title="Transfer Money">
      <Suspense fallback={<PageTransition />}>
        <TransferWrapper />
      </Suspense>
    </DashboardLayoutShell>
  );
}

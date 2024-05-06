import { Metadata } from 'next';
import { Suspense } from 'react';
import DashboardLayoutShell from '@/shared/DashboardLayoutShell';
import PageTransition from '@/components/page-transition';
import Wrapper from './_component/wrapper';

export const metadata: Metadata = {
  title: 'Fund Account',
  description: 'Manage users here',
};

function FundAccountPage() {
  return (
    <DashboardLayoutShell title="Fund Account">
      <Suspense fallback={<PageTransition />}>
        <Wrapper />
      </Suspense>
    </DashboardLayoutShell>
  );
}

export default FundAccountPage;
